import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('../src/layouts/BaseLayout.astro',import.meta.url),'utf8');
const receiptCode=source.slice(source.indexOf('      const confirmedLeadKeys = new Set();'),source.indexOf('      window.trackLeadError'));
function harness(consent=true){
 const events=[],storage=new Map(),timers=[];
 const window={sunelysAnalyticsEnabled:consent,dispatchEvent(){},setTimeout(fn){timers.push(fn);return 1;},clearTimeout(){},trackEvent(name,payload){events.push({name,payload});payload.event_callback?.();}};
 const sessionStorage={getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)};
 const context={window,sessionStorage,CustomEvent:class {constructor(type,opts){this.type=type;this.detail=opts.detail;}}};
 vm.runInNewContext(receiptCode,context);
 return {window,events,storage,context,timers};
}
test('refused consent never emits or retains a conversion, even after a later acceptance', async()=>{
 const h=harness(false);await h.window.trackLeadSuccess({lead_id:'one'});assert.equal(h.events.length,0);assert.equal(h.storage.size,0);
 h.window.sunelysAnalyticsEnabled=true;assert.equal(h.events.length,0);
});
test('one server receipt gives one generate_lead across duplicates and page reload',async()=>{
 const h=harness();await h.window.trackLeadSuccess({lead_id:'one'});await h.window.trackLeadSuccess({lead_id:'one'});
 vm.runInNewContext(receiptCode,{...h.context}); // new page scope, same session
 await h.window.trackLeadSuccess({lead_id:'one'});assert.equal(h.events.filter(x=>x.name==='generate_lead').length,1);
 await h.window.trackLeadSuccess({lead_id:'two'});assert.equal(h.events.filter(x=>x.name==='generate_lead').length,2);
});
test('unconfirmed thank-you visits never generate leads; blocked analytics has bounded wait',async()=>{
 const h=harness();await h.window.trackLeadSuccess({form_id:'contact'});assert.equal(h.events.length,0);
 h.window.trackEvent=()=>{};const pending=h.window.trackLeadSuccess({lead_id:'confirmed'});h.timers.at(-1)();await pending;
});

test("identified technical tests never count as marketing leads",async()=>{const h=harness();await h.window.trackLeadSuccess({lead_id:"qa",is_test:true});assert.equal(h.events.length,0);});
