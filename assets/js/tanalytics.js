/* tanalytics.js — S7-I-R1 Master Prep Analytics dashboard
   Reads from Google Sheets gviz (public) + Apps Script (private fallback) + localStorage */
const SHEET_ID="1GcgjCJEPDAFtqOwONsfN_np5zdZFe3v2qa2lNzqDZd4";
const SESSIONS_GID="1089917585";
const GVIZ_URL=`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${SESSIONS_GID}`;
const APPS_SCRIPT="https://script.google.com/macros/s/AKfycbzDJy4ysMJpXiDXI1_nwZYP1BCx0S1bZ7y9NHmDiD6wPhgfyRb4oXwDRO4twW2NfwNr1A/exec";
let allSessions=[];

function v(val){if(typeof val==="object"&&val!==null)return val.f||val.v||"";return val||"";}

// Subject → sphere + display label (supports new + legacy keys)
const SUBJECT_MAP={
  foundation:{sphere:"F",label:"\u{1F4DA} Foundation",cls:"science"},
  S:{sphere:"S",label:"\u{1FA7A} Science",cls:"science"},
  E:{sphere:"E",label:"\u{1F4BC} Entrepreneurship",cls:"entrepreneurship"},
  T:{sphere:"T",label:"\u{1F4BB} Technology",cls:"technology"},
  ST:{sphere:"ST",label:"\u{1FA7A}\u{1F4BB} Science+Tech",cls:"science"},
  ET:{sphere:"ET",label:"\u{1F4BC}\u{1F4BB} Ent+Tech",cls:"entrepreneurship"},
  SE:{sphere:"SE",label:"\u{1FA7A}\u{1F4BC} Sci+Ent",cls:"science"},
  // Legacy keys from earlier sessions
  tznk:{sphere:"S",label:"\u{1FA7A} Science (TZNK)",cls:"science"},
  english:{sphere:"E",label:"\u{1F1EC}\u{1F1E7} English",cls:"entrepreneurship"},
  it:{sphere:"T",label:"\u{1F4BB} Technology (IT)",cls:"technology"},
  all:{sphere:"F",label:"\u{1F4DA} Foundation",cls:"science"}
};
function subjectInfo(s){return SUBJECT_MAP[(s||"").toLowerCase()]||SUBJECT_MAP[s]||{sphere:"?",label:s||"Unknown",cls:"technology"};}
function accColor(a){return a>=80?"#22c55e":a>=60?"#eab308":"#ef4444";}
function modeLabel(m){const c=(m||"").toLowerCase();return c.includes("sim")?"Simulation":"Practice";}

/* ── Tabs ── */
document.querySelectorAll("#tabbar button").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll("#tabbar button").forEach(x=>x.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
    document.querySelector(`.tab-panel[data-panel="${b.dataset.tab}"]`).classList.add("active");
    if(b.dataset.tab==="charts")setTimeout(()=>{renderAllCharts();},50);
  });
});

/* ── Load data: gviz (public) → Apps Script (private) → localStorage ── */
async function loadSessions(){
  let sessions=[];

  // 1. Try gviz (works when Sheet is "Anyone with link can view")
  try{
    const r=await fetch(GVIZ_URL);
    const txt=await r.text();
    const json=JSON.parse(txt.replace(/^\)\]\}'\n/,""));
    if(json.status==="ok"&&json.table&&json.table.rows){
      const rows=json.table.rows;
      const fromGviz=rows.map(r=>{
        const c=r.c;
        return{
          id:v(c[0]),date:v(c[1]),subject:v(c[2]),platform:v(c[3]),mode:v(c[4]),
          sourceGroup:v(c[5]),isInternal:v(c[6]),
          total:parseInt(v(c[7]))||0,correct:parseInt(v(c[8]))||0,
          accuracy:parseInt(v(c[9]))||0,minutes:parseInt(v(c[10]))||0,
          label:v(c[11]),predicted:parseInt(v(c[12]))||0,log:[]
        };
      }).filter(s=>s.date&&s.total>0);
      sessions=fromGviz;
    }
  }catch(e){console.log("gviz:",e.message);}

  // 2. Fallback: Apps Script (works when Sheet is private)
  if(!sessions.length){
    try{
      const r=await fetch(APPS_SCRIPT);
      const data=await r.json();
      const rows=data.sessions||data||[];
      const fromScript=rows.map(r=>{
        if(Array.isArray(r))return{date:r[0],subject:r[3],mode:r[4],total:parseInt(r[6])||0,correct:parseInt(r[7])||0,accuracy:parseInt(r[8])||0,minutes:parseInt(r[5])||0,log:[]};
        return{date:r.date||r.timestamp,subject:r.subject,mode:r.mode,total:parseInt(r.questions_total||r.total)||0,correct:parseInt(r.correct)||0,accuracy:parseInt(r.accuracy_pct||r.accuracy)||0,minutes:parseInt(r.minutes)||0,log:[]};
      }).filter(s=>s.date&&s.total>0);
      sessions=fromScript;
    }catch(e){console.log("Apps Script:",e.message);}
  }

  // 3. Merge localStorage
  try{
    const local=JSON.parse(localStorage.getItem("mt_sessions")||"[]");
    const existing=new Set(sessions.map(s=>s.id||s.date));
    local.forEach(s=>{
      const key=s.id||s.date;
      if(!existing.has(key))sessions.push(s);
    });
  }catch(e){}

  return sessions.sort((a,b)=>new Date(b.date)-new Date(a.date));
}

/* ── Stats ── */
function renderStats(sessions){
  const filterKey=document.getElementById("sphereFilter")?.value||"all";
  const filtered=filterKey==="all"?sessions:sessions.filter(s=>subjectInfo(s.subject||"").sphere===filterKey);
  const n=filtered.length;
  const avg=n?Math.round(filtered.reduce((s,x)=>s+(x.accuracy||0),0)/n):0;
  const totQ=filtered.reduce((s,x)=>s+(x.total||0),0);
  const totMin=filtered.reduce((s,x)=>s+(x.minutes||0),0);
  const best=n?Math.max(...filtered.map(s=>s.accuracy||0)):0;
  document.getElementById("aggStats").innerHTML=`
    <div class="stat-card"><div class="stat-value">${n}</div><div class="stat-label">Sessions</div></div>
    <div class="stat-card science"><div class="stat-value">${avg}%</div><div class="stat-label">Avg Accuracy</div></div>
    <div class="stat-card"><div class="stat-value">${totQ}</div><div class="stat-label">Questions</div></div>
    <div class="stat-card"><div class="stat-value">${totMin}</div><div class="stat-label">Minutes</div></div>
    <div class="stat-card technology"><div class="stat-value">${best}%</div><div class="stat-label">Best</div></div>`;
}

/* ── Overview: Goals ── */
function renderGoals(sessions){
  const filterKey=document.getElementById("sphereFilter")?.value||"all";
  // Map each session's subject to a sphere key
  const bySphere={};
  sessions.forEach(s=>{
    const info=subjectInfo(s.subject||"unknown");
    const spKey=info.sphere; // F, S, E, T, ST, ET, SE
    if(!bySphere[spKey])bySphere[spKey]={c:0,t:0,mins:0,n:0,label:info.label,cls:info.cls};
    bySphere[spKey].c+=s.correct||0;bySphere[spKey].t+=s.total||0;
    bySphere[spKey].mins+=s.minutes||0;bySphere[spKey].n++;
  });
  // Filter by selected sphere
  const entries=filterKey==="all"?Object.entries(bySphere):Object.entries(bySphere).filter(([k])=>k===filterKey);
  const grid=document.getElementById("goalGrid");
  if(!entries.length){
    grid.innerHTML='<p style="color:var(--muted);font-size:14px">No sessions yet.</p>';return;
  }
  grid.innerHTML=entries.map(([sp,d])=>{
    const acc=d.t?Math.round(d.c/d.t*100):0;
    return `<div class="goal-card" style="border-left:4px solid var(--${d.cls})">
      <div class="label">${d.label}</div>
      <div class="value" style="color:${accColor(acc)}">${acc}%</div>
      <div class="sub">${d.c}/${d.t} correct · ${d.n} sessions · ${d.mins} min</div>
    </div>`;
  }).join("");
}

/* ── Overview: Insights ── */
function renderInsights(sessions){
  const grid=document.getElementById("insightsGrid");
  if(!sessions.length){grid.innerHTML='<p style="color:var(--muted)">No data yet.</p>';return;}
  const avg=sessions.reduce((s,x)=>s+(x.accuracy||0),0)/sessions.length;
  const bestSub=sessions.reduce((best,s)=>(s.accuracy||0)>(best.acc||0)?{name:s.subject||"all",acc:s.accuracy}:best,{name:"—",acc:0});
  const worstSub=sessions.reduce((worst,s)=>(s.accuracy||100)<(worst.acc||100)?{name:s.subject||"all",acc:s.accuracy}:worst,{name:"—",acc:100});
  const totalMin=sessions.reduce((s,x)=>s+(x.minutes||0),0);
  const simCount=sessions.filter(s=>(s.mode||"").includes("sim")).length;
  const insights=[
    {icon:"🎯",title:"Average accuracy",text:`${Math.round(avg)}% across ${sessions.length} sessions`},
    {icon:"✅",title:"Strongest subject",text:`${subjectInfo(bestSub.name).label} at ${bestSub.acc}%`},
    {icon:"⚠️",title:"Needs work",text:`${subjectInfo(worstSub.name).label} at ${worstSub.acc}%`},
    {icon:"⏱",title:"Total invested",text:`${totalMin} minutes (${simCount} simulations)`},
  ];
  grid.innerHTML=insights.map(i=>`<article class="stack-card"><strong>${i.icon} ${i.title}</strong><span>${i.text}</span></article>`).join("");
}

/* ── Session Log ── */
function renderLog(sessions){
  const filterKey=document.getElementById("sphereFilter")?.value||"all";
  const filtered=filterKey==="all"?sessions:sessions.filter(s=>subjectInfo(s.subject||"").sphere===filterKey);
  const grid=document.getElementById("sessionGrid");
  const empty=document.getElementById("emptyMsg");
  if(!filtered.length){grid.innerHTML="";empty.style.display="block";return;}
  empty.style.display="none";
  grid.innerHTML=filtered.map(s=>{
    const d=new Date(s.date);
    const hasTime=d.getHours()!==0||d.getMinutes()!==0;
    const ds=hasTime?d.toLocaleDateString("en-GB",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}):d.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
    const acc=s.accuracy||0;
    const info=subjectInfo(s.subject);
    const mode=modeLabel(s.mode);
    return `<article class="session-card">
      <div class="session-topline">
        <span class="chip" style="color:var(--${info.cls})">${info.label}</span>
        <span class="chip subtle">${mode}</span>
        ${s.label?`<span class="chip subtle">${s.label}</span>`:""}
      </div>
      <div class="session-meta"><strong style="color:${accColor(acc)}">${acc}%</strong> · ${s.correct}/${s.total} · ${s.minutes} min<br><span style="font-size:11px">${ds}</span></div>
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
  barChart(ctx,c.width,c.height,labels.map(l=>subjectInfo(l).label),vals,["#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#ef4444","#22c55e","#ec4899","#14b8a6"],"Accuracy by Subject");
}

function drawWeak(ctx,c){
  const bySub={};
  allSessions.forEach(s=>{const sub=s.subject||"all";if(!bySub[sub])bySub[sub]={c:0,t:0};bySub[sub].t+=s.total||0;bySub[sub].c+=s.correct||0;});
  const labels=Object.keys(bySub),vals=labels.map(l=>{const t=bySub[l].t,c=bySub[l].c;return t?Math.round(((t-c)/t)*100):0;});
  if(!labels.length){ctx.fillStyle="#888";ctx.font="14px system-ui";ctx.fillText("No data yet",60,100);return;}
  barChart(ctx,c.width,c.height,labels.map(l=>subjectInfo(l).label),vals,["#ef4444","#f97316","#eab308","#f43f5e","#dc2626","#b91c1c","#c2410c","#a16207"],"Weak Zones (Error %)");
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
    ctx.fillStyle="rgba(59,130,246,0.3)";
    const bh=h-pad-yMin;
    ctx.beginPath();ctx.roundRect(x-8,yMin,16,bh,4);ctx.fill();
    ctx.beginPath();ctx.arc(x,yAcc,5,0,Math.PI*2);ctx.fillStyle=accColor(s.accuracy||0);ctx.fill();
  });
  ctx.font="11px system-ui";ctx.fillStyle="rgba(59,130,246,0.5)";ctx.fillRect(pad,h-pad+20,12,8);
  ctx.fillStyle=ink;ctx.fillText("Minutes (bar)",pad+16,h-pad+28);
  ctx.beginPath();ctx.arc(pad+80,h-pad+24,4,0,Math.PI*2);ctx.fillStyle="#22c55e";ctx.fill();
  ctx.fillStyle=ink;ctx.fillText("Accuracy (dot)",pad+88,h-pad+28);
}

function renderAllCharts(){
  [["accChart",drawAcc],["weakChart",drawWeak],["forecastChart",drawTrend],["effortChart",drawEffort]].forEach(([id,fn])=>{
    const c=document.getElementById(id);if(!c)return;
    const ctx=c.getContext("2d");c.width=c.offsetWidth*2;c.height=400;ctx.clearRect(0,0,c.width,c.height);fn(ctx,c);
  });
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
  // Sphere filter dropdown
  const sf=document.getElementById("sphereFilter");
  if(sf)sf.addEventListener("change",()=>{
    renderGoals(allSessions);
    renderStats(allSessions);
    renderInsights(allSessions);
    renderLog(allSessions);
    renderAllCharts();
  });
})();
