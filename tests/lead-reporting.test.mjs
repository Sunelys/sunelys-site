import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyLead, inclusiveDateRange, leadDisposition, summarizeLeadDispositions } from '../src/lib/lead-reporting.mjs';
test('reporting periods contain exactly N calendar dates, including month boundary',()=>{
 assert.deepEqual(inclusiveDateRange(28,3,new Date('2026-10-02T12:00:00Z')), {startDate:'2026-09-02',endDate:'2026-09-29'});
 assert.deepEqual(inclusiveDateRange(1,0,new Date('2026-10-02T12:00:00Z')), {startDate:'2026-10-02',endDate:'2026-10-02'});
});
test('human qualification never comes from a score and negative statuses take precedence',()=>{
 assert.equal(leadDisposition({status:'Nouveau lead',qualityScore:95}),'unreviewed');
 assert.equal(leadDisposition({status:'Non qualifié'}),'non_commercial');
 assert.equal(leadDisposition({status:'Qualifié'}),'qualified');
 assert.equal(leadDisposition({status:'À qualifier'}),'unreviewed');
 assert.equal(leadDisposition({recordId:'a'}, {a:{disposition:'non_commercial'}}),'non_commercial');
 assert.equal(leadDisposition({recordId:'a',status:'Client'}, {a:{disposition:'candidate'}}),'qualified');
 assert.deepEqual(summarizeLeadDispositions([{isTest:true},{disposition:'non_commercial'},{disposition:'candidate'},{disposition:'qualified'},{}]),{submissions:5,tests:1,nonCommercial:1,candidates:1,qualified:1,unreviewed:1});
});
test('explicit tests excluded without rejecting real prospects discussing a test installation',()=>{
 assert.equal(classifyLead({email:'qa@example.test'}),'test');
 assert.equal(classifyLead({message:'[SUNELYS_TEST] recette consentement'}),'test');
 assert.equal(classifyLead({message:'Je souhaite tester vos services'}),'unverified');
 assert.equal(classifyLead({message:'Un test sur une première installation'}),'review');
 assert.equal(classifyLead({email:'installateur@entreprise.fr'}),'unverified');
});
