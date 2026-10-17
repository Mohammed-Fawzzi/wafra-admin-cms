const fs = require('fs');
const indexPath = __dirname + '/index.html';
const src36 = fs.readFileSync(__dirname + '/src/p36.html', 'utf8');
const src40 = fs.readFileSync(__dirname + '/src/p40.html', 'utf8');
let html = fs.readFileSync(indexPath, 'utf8');

const from36 = src36.indexOf("  const COLORS=['#293B85'");
const to36 = src36.indexOf("    return phead(");
if (from36 < 0 || to36 < 0) throw new Error('p36 markers ' + from36 + ' ' + to36);
const insert = src36.slice(from36, to36);

const start = html.indexOf("  const defaultState=()=>({type:'cartype',a:");
const end = html.indexOf("    return phead('المقارنات'");
if (start < 0 || end < 0) throw new Error('index markers ' + start + ' ' + end);
html = html.slice(0, start) + insert + html.slice(end);

const oldSched = "    schedNew:()=>toast('تم فتح نموذج تقرير مجدول جديد.')";
const from40 = src40.indexOf('    schedNew:()=>{');
const to40 = src40.indexOf('  const kpi=');
if (from40 < 0 || to40 < 0) throw new Error('p40 markers');
const sched = src40.slice(from40, to40).replace(/\s+$/, '');
if (!html.includes(oldSched)) throw new Error('old sched not found');
html = html.replace(oldSched, sched);

fs.writeFileSync(indexPath, html);
fs.writeFileSync(__dirname + '/wafra-admin-cms.html', html);
console.log({
  cmpConfirmAddItem: html.includes('cmpConfirmAddItem'),
  confirmSchedNew: html.includes('confirmSchedNew'),
  saConfirmAddFilter: html.includes('saConfirmAddFilter'),
  openNewScheduledReport: html.includes('openNewScheduledReport'),
  cmpRemoveItem: html.includes('cmpRemoveItem')
});
