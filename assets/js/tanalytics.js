/* tanalytics.js — S7-I-R1 Master Prep Analytics dashboard */
const SHEET_ID="1GcgjCJEPDAFtqOwONsfN_np5zdZFe3v2qa2lNzqDZd4";
const SHEET_URL=`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
const APPS_SCRIPT="https://script.google.com/macros/s/AKfycbzDJy4ysMJpXiDXI1_nwZYP1BCx0S1bZ7y9NHmDiD6wPhgfyRb4oXwDRO4twW2NfwNr1A/exec";
let allSessions=[];

function v(val){if(typeof val==="object"&&val!==null)return val.f||val.v||"";return val||"";}
function sphereLabel(s){return{s:"🩺 Science",e:"💼 Entrepreneurship",t:"💻 Technology"}[s]||s;}
function accColor(a){return a>=80?"#22c55e":a>=60?"#eab308":"#ef4444";}

/* ── Tabs ── */
document.querySelectorAll("#tabbar button").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll("#tabbar button").forEach(x=>x.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    document.querySelector(`.tab-panel[data-panel="${b.dataset.tab}"]`).classList.add("active");
    // Re-render charts when switching to charts tab (canvas may have been hidden)
    if(b.dataset.tab==="charts")setTimeout(()=>{renderAllCharts();},50);
  });
});

/* ── Load data ── */
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

/* ── Stats ── */
function renderStats(sessions){
  const n=sessions.length;
  const avg=n?Math.round(sessions.reduce((s,x)=>s+(x.accuracy||0),0)/n):0;
  const totQ=sessions.reduce((s,x)=>s+(x.total||0),0);
  const totMin=sessions.reduce((s,x)=>s+(x.minutes||0),0);
  const best=Math.max(...sessions.map(s=>s.accuracy||0),0);
  document.getElementById("aggStats").innerHTML=`
    <div class="stat-card"><div class="stat-value">${n}</div><div class="stat-label">Sessions</div></div>
    <div class="stat-card science"><div class="stat-value">${avg}%</div><div class="stat-label">Avg Accuracy</div></div>
    <div class="stat-card"><div class="stat-value">${totQ}</div><div class="stat-label">Questions</div></div>
    <div class="stat-card"><div class="stat-value">${totMin}</div><div class="stat-label">Minutes</div></div>
    <div class="stat-card technology"><div class="stat-value">${best}%</div><div class="stat-label">Best</div></div>`;
}

/* ── Overview: Goals ── */
function renderGoals(sessions){
  const bySphere={};
  sessions.forEach(s=>{
    const sp=s.sphere||"?";
    if(!bySphere[sp])bySphere[sp]={c:0,t:0,mins:0,n:0};
    bySphere[sp].c+=s.correct||0;bySphere[sp].t+=s.total||0;
    bySphere[sp].mins+=s.minutes||0;bySphere[sp].n++;
  });
  const grid=document.getElementById("goalGrid");
  if(!Object.keys(bySphere).length){
    grid.innerHTML='<p style="color:var(--muted);font-size:14px">No sessions yet. Complete a training session first.</p>';
    return;
  }
  grid.innerHTML=Object.entries(bySphere).map(([sp,d])=>{
    const acc=d.t?Math.round(d.c/d.t*100):0;
    return `<div class="goal-card" style="border-left:4px solid var(--${sp==="S"?"science":sp==="E"?"entrepreneurship":"technology"})">
      <div class="label">${sphereLabel(sp)}</div>
      <div class="value" style="color:${accColor(acc)}">${acc}%</div>
      <div class="sub">${d.c}/${d.t} correct · ${d.n} sessions · ${d.mins} min</div>
    </div>`;
  }).join("");
}

/* ── Overview: Insights ── */
function renderInsights(sessions){
  const grid=document.getElementById("insightsGrid");
  if(!sessions.length){
    grid.innerHTML='<p style="color:var(--muted)">No data yet.</p>';return;
  }
  const avg=sessions.reduce((s,x)=>s+(x.accuracy||0),0)/sessions.length;
  const bestSub=sessions.reduce((best,s)=>(s.accuracy||0)>(best.acc||0)?{name:s.subject||"all",acc:s.accuracy}:best,{name:"—",acc:0});
  const worstSub=sessions.reduce((worst,s)=>(s.accuracy||100)<(worst.acc||100)?{name:s.subject||"all",acc:s.accuracy}:worst,{name:"—",acc:100});
  const totalMin=sessions.reduce((s,x)=>s+(x.minutes||0),0);
  const insights=[
    {icon:"🎯",title:"Average accuracy",text:`${Math.round(avg)}% across ${sessions.length} sessions`},
    {icon:"✅",title:"Strongest subject",text:`${bestSub.name} at ${bestSub.acc}%`},
    {icon:"⚠️",title:"Needs work",text:`${worstSub.name} at ${worstSub.acc}%`},
    {icon:"⏱",title:"Total invested",text:`${totalMin} minutes of practice`},
  ];
  grid.innerHTML=insights.map(i=>`<article class="stack-card"><strong>${i.icon} ${i.title}</strong><span>${i.text}</span></article>`).join("");
}

/* ── Session Log ── */
function renderLog(sessions){
  const grid=document.getElementById("sessionGrid");
  const empty=document.getElementById("emptyMsg");
  if(!sessions.length){grid.innerHTML="";empty.style.display="block";return;}
  empty.style.display="none";
  grid.innerHTML=sessions.map(s=>{
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

function drawAcc(ctx,c){
  const bySub={};
  allSessions.forEach(s=>{const sub=s.subject||"all";if(!bySub[sub])bySub[sub]={c:0,t:0};bySub[sub].t+=s.total||0;bySub[sub].c+=s.correct||0;});
  const labels=Object.keys(bySub),vals=labels.map(l=>bySub[l].t?Math.round(bySub[l].c/bySub[l].t*100):0);
  if(!labels.length){ctx.fillStyle="#888";ctx.font="14px system-ui";ctx.fillText("No data yet",60,100);return;}
  barChart(ctx,c.width,c.height,labels,vals,["#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#ef4444","#22c55e","#ec4899","#14b8a6"],"Accuracy by Subject");
}

function drawWeak(ctx,c){
  const bySub={};
  allSessions.forEach(s=>{const sub=s.subject||"all";if(!bySub[sub])bySub[sub]={c:0,t:0};bySub[sub].t+=s.total||0;bySub[sub].c+=s.correct||0;});
  const labels=Object.keys(bySub),vals=labels.map(l=>{const t=bySub[l].t,c=bySub[l].c;return t?Math.round(((t-c)/t)*100):0;});
  if(!labels.length){ctx.fillStyle="#888";ctx.font="14px system-ui";ctx.fillText("No data yet",60,100);return;}
  barChart(ctx,c.width,c.height,labels,vals,["#ef4444","#f97316","#eab308","#f43f5e","#dc2626","#b91c1c","#c2410c","#a16207"],"Weak Zones (Error %)");
}

function drawTrend(ctx,c){
  const sorted=[...allSessions].reverse().slice(-20);
  if(sorted.length<2){ctx.fillStyle="#888";ctx.font="14px system-ui";ctx.fillText("Need at least 2 sessions",60,100);return;}
  const a=sorted.map(s=>s.accuracy||0),n=a.length;
  const w=c.width,h=c.height,pad=60,cw=w-pad*2,ch=h-pad*2;
  const ink=getComputedStyle(document.documentElement).getPropertyValue("--ink")||"#333";
  const sx=a.reduce((s,_,i)=>s+i,0),sy=a.reduce((s,v)=>s+v,0);
  const sxy=a.reduce((s,v,i)=>s+i*v,0),sxx=a.reduce((s,_,i)=>s+i*i,0);
  const slope=(n*sxy-sx*sy)/(n*sxx-sx*sx),intercept=(sy-slope*sx)/n;
  const pred=Math.min(100,Math.max(0,Math.round(intercept+slope*n)));
  ctx.fillStyle=ink;ctx.font="bold 14px system-ui";ctx.fillText("Forecast: "+pred+"%",pad,30);
  a.forEach((v,i)=>{const x=pad+i*(cw/(n-1||1)),y=h-pad-(v/100)*ch;ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle="#3b82f6";ctx.fill();});
  ctx.strokeStyle="#3b82f6";ctx.lineWidth=2;ctx.beginPath();
  ctx.moveTo(pad,h-pad-(a[0]/100)*ch);ctx.lineTo(pad+(n-1)*(cw/(n-1||1)),h-pad-(a[n-1]/100)*ch);ctx.stroke();
  const px=pad+n*(cw/(n-1||1)),py=h-pad-(pred/100)*ch;
  ctx.beginPath();ctx.arc(px,py,8,0,Math.PI*2);ctx.fillStyle="#22c55e";ctx.fill();
  ctx.fillStyle=ink;ctx.font="12px system-ui";ctx.fillText(pred+"%",px+12,py+4);
}

function drawEffort(ctx,c){
  const sorted=[...allSessions].reverse().slice(-20);
  if(sorted.length<2){ctx.fillStyle="#888";ctx.font="14px system-ui";ctx.fillText("Need at least 2 sessions",60,100);return;}
  const w=c.width,h=c.height,pad=60,cw=w-pad*2,ch=h-pad*2;
  const ink=getComputedStyle(document.documentElement).getPropertyValue("--ink")||"#333";
  ctx.fillStyle=ink;ctx.font="bold 14px system-ui";ctx.fillText("Minutes vs Accuracy",pad,30);
  const mxMin=Math.max(...sorted.map(s=>s.minutes||1),1);
  sorted.forEach((s,i)=>{
    const x=pad+i*(cw/(sorted.length-1||1));
    const yMin=h-pad-((s.minutes||1)/mxMin)*ch;
    const yAcc=h-pad-((s.accuracy||0)/100)*ch;
    // Minutes bar
    ctx.fillStyle="rgba(59,130,246,0.3)";
    const bh=h-pad-yMin;
    ctx.beginPath();ctx.roundRect(x-8,yMin,16,bh,4);ctx.fill();
    // Accuracy dot
    ctx.beginPath();ctx.arc(x,yAcc,5,0,Math.PI*2);ctx.fillStyle=accColor(s.accuracy||0);ctx.fill();
  });
  // Legend
  ctx.font="11px system-ui";ctx.fillStyle="rgba(59,130,246,0.5)";ctx.fillRect(pad,h-pad+20,12,8);
  ctx.fillStyle=ink;ctx.fillText("Minutes (bar)",pad+16,h-pad+28);
  ctx.beginPath();ctx.arc(pad+80,h-pad+24,4,0,Math.PI*2);ctx.fillStyle="#22c55e";ctx.fill();
  ctx.fillStyle=ink;ctx.fillText("Accuracy (dot)",pad+88,h-pad+28);
}

function renderAllCharts(){
  [["accChart",drawAcc],["weakChart",drawWeak],["forecastChart",drawTrend],["effortChart",drawEffort]].forEach(([id,fn])=>{
    const c=document.getElementById(id);
    if(!c)return;
    const ctx=c.getContext("2d");
    c.width=c.offsetWidth*2;c.height=400;ctx.clearRect(0,0,c.width,c.height);
    fn(ctx,c);
  });
  // Overview trend chart
  const tc=document.getElementById("trendChart");
  if(tc){const ctx=tc.getContext("2d");tc.width=tc.offsetWidth*2;tc.height=400;ctx.clearRect(0,0,tc.width,tc.height);drawTrend(ctx,tc);}
}

/* ── Init ── */
(async()=>{
  allSessions=await loadSessions();
  renderStats(allSessions);
  renderGoals(allSessions);
  renderInsights(allSessions);
  renderLog(allSessions);
  renderAllCharts();
})();
