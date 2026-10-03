import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const [start,end,file] of [['/* BATCH_WORKSPACE_CSS_START */','/* BATCH_WORKSPACE_CSS_END */','ui/batch-workspace.css'],['// BATCH_WORKSPACE_JS_START','// BATCH_WORKSPACE_JS_END','ui/batch-workspace.js'],['/* API_BATCH_REVIEW_CSS_START */','/* API_BATCH_REVIEW_CSS_END */','ui/api-batch-review.css'],['// API_BATCH_REVIEW_JS_START','// API_BATCH_REVIEW_JS_END','app/api-batch-review.js']]){
  const first=html.indexOf(start),last=html.indexOf(end,first);
  if(first<0||last<first||html.indexOf(start,first+start.length)>=0)throw new Error('Missing or duplicated presentation block');
  if(html.slice(first+start.length,last)!=='\n'+fs.readFileSync(path.join(root,file),'utf8')+'\n')throw new Error('Embedded presentation differs from its source');
  html=html.slice(0,first)+html.slice(last+end.length).replace(/^\n/,'');
}
html=html.replaceAll('4.1.5.51.58','4.1.5.51.50').replaceAll('EXP3.0.2.4.3.45','EXP3.0.2.4.3.37');
// The only additions to the preexisting engines are explicit detached-record
// options. Reversing these exact adapters must recover the protected app.
html=html.replaceAll('persist = true, staged = false, source =','persist = true, source =')
 .replaceAll('const transientQuestion = staged || !state.questions.some','const transientQuestion = !state.questions.some')
 .replace('{ persist = true, staged = false } = {})','{ persist = true } = {})')
 .replace('const currentSnapshot = staged ? { question, ...immutableAIQuestionPackage(question, canonicalSavedAIProblemContext(question), "answer-check-response") } : await prepareCurrentQuestionSnapshotForAI(question.id, "answer-check-response");','const currentSnapshot = await prepareCurrentQuestionSnapshotForAI(question.id, "answer-check-response");');
const hash=crypto.createHash('sha256').update(html).digest('hex');
if(hash!=='f7d917cdf040eae79293c0cfdc6ce4c402ab8a5e9db19433bbf6ef45bb6d612d')throw new Error('Protected app code changed outside the presentation blocks and release labels: '+hash);
console.log('PASS: Protected app, prompts, schemas and provider routes match the previous release after reversing the three explicit detached-record adapters. Embedded modules match their sources.');
