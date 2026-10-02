import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyLead, inclusiveDateRange } from '../src/lib/lead-reporting.mjs';
test('reporting periods contain exactly N calendar dates, including month boundary',()=>{
 assert.deepEqual(inclusiveDateRange(28,3,new Date('2026-10-02T12:00:00Z')), {startDate:'2026-09-02',endDate:'2026-09-29'});
 assert.deepEqual(inclusiveDateRange(1,0,new Date('2026-10-02T12:00:00Z')), {startDate:'2026-10-02',endDate:'2026-10-02'});
});
test('explicit tests excluded without rejecting real prospects discussing a test installation',()=>{
 assert.equal(classifyLead({email:'qa@example.test'}),'test');
 assert.equal(classifyLead({message:'[SUNELYS_TEST] recette consentement'}),'test');
 assert.equal(classifyLead({message:'Je souhaite tester vos services'}),'unverified');
 assert.equal(classifyLead({message:'Un test sur une première installation'}),'review');
 assert.equal(classifyLead({email:'installateur@entreprise.fr'}),'unverified');
});
