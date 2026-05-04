/* training-analytics.js — S7-I-R1 Master Prep Analytics dashboard */
const SHEET_ID="1GcgjCJEPDAFtqOwONsfN_np5zdZFe3v2qa2lNzqDZd4";
const SHEET_URL=`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
let allSessions=[], chartType="acc";

function v(val){if(typeof val==="object"&&val!==null)return val.f||val.v||"";return val||"";}
function sphereLabel(s){return{s:"🩺 Science",e:"🚀 Entrepreneurship",t:"💻 Technology"}[s]||s;}
function accColor(a){return a>=80?"#22c55e":a>=60?"#eab308":"#ef4444";}

async function loadSessions(){
  let sessions=[];
  try{sessions=JSON.parse(localStorage.getItem("mt_sessions")||"[]");}catch(e){}
  try{
    const r=await fetch(SHEET_URL);
    const txt=await r.text();
    const json=JSON.parse(txt.replace(/^\)\]\}'\n/,""));
    const rows=json.table.rows;
    const fromSheet=rows.map(r=>r.c.map(c=>c?v(c.v):"")).filter(r=>r[0]).map(r=>({
      date:r[0],sphere:r[1],level:r[2],subject:r[3],mode:r[4],
      minutes:parseInt(r[5])||1,total:parseInt(r[6])||0,correct:parseInt(r[7])||0,
      accuracy:parseInt(r[8])||0,log:[]
    }));
    const existing=new Set(sessions.map(s=>s.date));
    fromSheet.forEach(s=>{if(!existing.has(s.date))sessions.push(s);});
  }catch(e){console.log("Sheets:",e.message);}
  return sessions.sort((a,b)=>new Date(b.date)-new Date(a.date));
}

function renderStats(sessions){
  const n=sessions.length;
  const avg=n?Math.round(sessions.reduce((s,x)=>s+(x.accuracy||0),0)/n):0;
  const totQ=sessions.reduce((s,x)=>s+(x.total||0),0);
  const totMin=sessions.reduce((s,x)=>s+(x.minutes||0),0);
  document.getElementById("aggStats").innerHTML=`
    <div class="stat-card"><div class="stat-value">${n}</div><div class="stat-label">Sessions</div></div>
    <div class="stat-card science"><div class="stat-value">${avg}%</div><div class="stat-label">Avg Accuracy</div></div>
    <div class="stat-card"><div class="stat-value">${totQ}</div><div class="stat-label">Questions</div></div>
    <div class="stat-card"><div class="stat-value">${totMin}</div><div class="stat-label">Minutes</div></div>`;
}

function renderLog(sessions){
  document.getElementById("sessionGrid").innerHTML=sessions.map(s=>{
    const d=new Date(s.date);
    const ds=d.toLocaleDateString("en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});
    const acc=s.accuracy||0;
    return `<article class="session-card">
      <div class="session-topline"><span class="chip chip-s">${sphereLabel(s.sphere)}</span><span class="chip subtle">${s.level||"bachelor"}</span><span class="chip subtle">${s.mode||"practice"}</span></div>
      <h3>${s.subject||"All subjects"}</h3>
      <div class="session-meta"><strong>${acc}%</strong> · ${s.correct||0}/${s.total||0} · ${s.minutes||1} min<br><span style="font-size:11px">${ds}</span></div>
      <div class="acc-bar"><div class="acc-fill" style="width:${acc}%;background:${accColor(acc)}"></div></div>
    </article>`;
  }).join("");
}

/* ── Charts ── */
function barChart(ctx,w,h,labels,values,colors,title){
  const pad=60,bw=Math.min(60,(w-pad*2)/labels.length-10),mx=Math.max(...values,1),ch=h-pad*2;
  const ink=getComputedStyle(document.documentElement).getPropertyValue("--ink")||"#333";
  ctx.fillStyle=ink;ctx.font="bold 14px system-ui";ctx.fillText(title,pad,30);
  labels.forEach((l,i)=>{
    const x=pad+i*(bw+10)+10,bh=Math.max(2,(values[i]/mx)*ch),y=h-pad-bh;
    ctx.fillStyle=colors[i%colors.length];ctx.beginPath();ctx.roundRect(x,y,bw,bh,6);ctx.fill();
    ctx.fillStyle=ink;ctx.font="11px system-ui";ctx.textAlign="center";
    ctx.fillText(l.length>12?l.substring(0,11)+"…":l,x+bw/2,h-pad+16);
    ctx.fillText(values[i]+"%",x+bw/2,y-6);
  });ctx.textAlign="start";
}

function drawAcc(ctx,c,sessions){
  const bySub={};
  sessions.forEach(s=>{
    const sub=s.subject||"all";
    if(!bySub[sub])bySub[sub]={c:0,t:0};
    bySub[sub].t+=s.total||0;bySub[sub].c+=s.correct||0;
  });
  const labels=Object.keys(bySub),vals=labels.map(l=>bySub[l].t?Math.round(bySub[l].c/bySub[l].t*100):0);
  if(!labels.length){ctx.fillStyle="#888";ctx.font="14px system-ui";ctx.fillText("No data yet — complete a training session first",60,100);return;}
  barChart(ctx,c.width,c.height,labels,vals,["#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#ef4444","#22c55e","#ec4899","#14b8a6"],"Accuracy by Subject");
}

function drawWeak(ctx,c,sessions){
  const bySub={};
  sessions.forEach(s=>{
    const sub=s.subject||"all";
    if(!bySub[sub])bySub[sub]={c:0,t:0};
    bySub[sub].t+=s.total||0;bySub[sub].c+=s.correct||0;
  });
  const labels=Object.keys(bySub),vals=labels.map(l=>{const tot=bySub[l].t,cor=bySub[l].c;return tot?Math.round(((tot-cor)/tot)*100):0;});
  if(!labels.length){ctx.fillStyle="#888";ctx.font="14px system-ui";ctx.fillText("No data yet",60,100);return;}
  barChart(ctx,c.width,c.height,labels,vals,["#ef4444","#f97316","#eab308","#f43f5e","#dc2626","#b91c1c","#c2410c","#a16207"],"Weak Zones (Error %)");
}

function drawTrend(ctx,c,sessions){
  const sorted=[...sessions].reverse().slice(-20);
  if(sorted.length<2){ctx.fillStyle="#888";ctx.font="14px system-ui";ctx.fillText("Need at least 2 sessions for trend",60,100);return;}
  const a=sorted.map(s=>s.accuracy||0),n=a.length;
  const w=c.width,h=c.height,pad=60,cw=w-pad*2,ch=h-pad*2;
  const ink=getComputedStyle(document.documentElement).getPropertyValue("--ink")||"#333";
  // Linear regression
  const sx=a.reduce((s,_,i)=>s+i,0),sy=a.reduce((s,v)=>s+v,0);
  const sxy=a.reduce((s,v,i)=>s+i*v,0),sxx=a.reduce((s,_,i)=>s+i*i,0);
  const slope=(n*sxy-sx*sy)/(n*sxx-sx*sx),intercept=(sy-slope*sx)/n;
  const pred=Math.min(100,Math.max(0,Math.round(intercept+slope*n)));
  ctx.fillStyle=ink;ctx.font="bold 14px system-ui";ctx.fillText("Next session forecast: "+pred+"%",pad,30);
  // Dots
  a.forEach((v,i)=>{const x=pad+i*(cw/(n-1||1)),y=h-pad-(v/100)*ch;ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle="#3b82f6";ctx.fill();});
  // Line
  ctx.strokeStyle="#3b82f6";ctx.lineWidth=2;ctx.beginPath();
  ctx.moveTo(pad,h-pad-(a[0]/100)*ch);ctx.lineTo(pad+(n-1)*(cw/(n-1||1)),h-pad-(a[n-1]/100)*ch);ctx.stroke();
  // Prediction dot
  const px=pad+n*(cw/(n-1||1)),py=h-pad-(pred/100)*ch;
  ctx.beginPath();ctx.arc(px,py,8,0,Math.PI*2);ctx.fillStyle="#22c55e";ctx.fill();
  ctx.fillStyle=ink;ctx.font="12px system-ui";ctx.fillText(pred+"%",px+12,py+4);
}

function renderChart(){
  const c=document.getElementById("mainChart"),ctx=c.getContext("2d");
  c.width=c.offsetWidth*2;c.height=400;ctx.clearRect(0,0,c.width,c.height);
  const titles={acc:"Accuracy by Subject",weak:"Weak Zones (Error %)",trend:"Session Trend & Forecast"};
  document.getElementById("chartTitle").textContent=titles[chartType]||"";
  if(!allSessions.length){
    document.getElementById("chartBox").style.display="none";
    document.getElementById("noDataMsg").style.display="block";
    return;
  }
  document.getElementById("chartBox").style.display="block";
  document.getElementById("noDataMsg").style.display="none";
  if(chartType==="acc")drawAcc(ctx,c,allSessions);
  else if(chartType==="weak")drawWeak(ctx,c,allSessions);
  else if(chartType==="trend")drawTrend(ctx,c,allSessions);
}

/* ── Tab switching ── */
document.querySelectorAll("#chartTabs .tab-btn").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll("#chartTabs .tab-btn").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    chartType=b.dataset.type;
    renderChart();
  });
});

/* ── Init ── */
(async()=>{
  allSessions=await loadSessions();
  renderStats(allSessions);
  renderLog(allSessions);
  renderChart();
})();
