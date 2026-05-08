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
  // Legacy keys from earlier sessions → Foundation
  tznk:{sphere:"F",label:"\u{1F4DA} Foundation",cls:"science"},
  english:{sphere:"F",label:"\u{1F1EC}\u{1F1E7} English",cls:"entrepreneurship"},
  it:{sphere:"T",label:"\u{1F4BB} IT / Computer Science",cls:"technology"},
  all:{sphere:"F",label:"\u{1F4DA} Foundation",cls:"science"}
};
function subjectInfo(s){return SUBJECT_MAP[(s||"").toLowerCase()]||SUBJECT_MAP[s]||{sphere:"?",label:s||"Unknown",cls:"technology"};}

// Sphere display labels (used for grouping)
const SPHERE_LABELS={
  F:{label:"\u{1F4DA} Foundation",cls:"science"},
  S:{label:"\u{1FA7A} Science",cls:"science"},
  E:{label:"\u{1F4BC} Entrepreneurship",cls:"entrepreneurship"},
  T:{label:"\u{1F4BB} Technology",cls:"technology"},
  ST:{label:"\u{1FA7A}\u{1F4BB} Science+Tech",cls:"science"},
  ET:{label:"\u{1F4BC}\u{1F4BB} Ent+Tech",cls:"entrepreneurship"},
  SE:{label:"\u{1FA7A}\u{1F4BC} Sci+Ent",cls:"science"}
};
function accColor(a){return a>=80?"#22c55e":a>=60?"#eab308":"#ef4444";}
function modeLabel(m){const c=(m||"").toLowerCase();return c.includes("sim")?"Simulation":"Practice";}

// Subject display names
const SUBJECT_NAMES={
  all:"All Foundation",english:"English",it:"IT / Computer Science",
  biology:"Biology",chemistry:"Chemistry",physics:"Physics",math:"Mathematics",logic:"Logic",
  anatomy:"Anatomy",pharmacology:"Pharmacology",pathology:"Pathology",physiology:"Physiology",
  management:"Management",economics:"Economics",marketing:"Marketing",finance:"Finance",
  law:"Law",psychology:"Psychology",sociology:"Sociology",
  ai_ml:"AI / ML",data_science:"Data Science",cybersec:"Cybersecurity",devops:"DevOps",
  programming:"Programming",databases:"Databases",networks:"Networks",
  biotech_eng:"Biotech Engineering",it_mgmt:"IT Management",pharma_mgmt:"Pharma Management",
  health_econ:"Health Economics",biotech_biz:"Biotech Business",clinical_trials:"Clinical Trials"
};

// Populate subject dropdown based on sessions & sphere filter
function updateSubjectFilter(sessions){
  const sf=document.getElementById("sphereFilter")?.value||"all";
  const subF=document.getElementById("subjectFilter");
  if(!subF)return;
  const filtered=sf==="all"?sessions:sessions.filter(s=>(s.sphere||subjectInfo(s.subject).sphere)===sf);
  const subjects=[...new Set(filtered.map(s=>s.subject||"unknown"))].sort();
  const prev=subF.value;
  subF.innerHTML='<option value="">All subjects</option>'+
    subjects.map(s=>`<option value="${s}">${SUBJECT_NAMES[s]||s}</option>`).join("");
  if(subjects.includes(prev))subF.value=prev;else subF.value="";
}

// Apply both sphere + subject filters
function filteredSessions(sessions){
  const sf=document.getElementById("sphereFilter")?.value||"all";
  const subF=document.getElementById("subjectFilter")?.value||"";
  let f=sessions;
  if(sf!=="all")f=f.filter(s=>(s.sphere||subjectInfo(s.subject).sphere)===sf);
  if(subF)f=f.filter(s=>(s.subject||"")==subF);  // empty = show all, "all" = Foundation only
  return f;
}

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
        // Columns: session_id(0), date(1), subject(2), sphere(3), platform(4), mode(5),
        // source_group(6), is_internal(7), questions_total(8), correct(9),
        // accuracy_pct(10), minutes(11), session_label(12), predicted_score(13), actual_score(14), notes(15)
        const sphere=v(c[3])||subjectInfo(v(c[2])).sphere; // use sphere col or derive from subject
        return{
          id:v(c[0]),date:v(c[1]),subject:v(c[2]),sphere:sphere,platform:v(c[4]),mode:v(c[5]),
          sourceGroup:v(c[6]),isInternal:v(c[7]),
          total:parseInt(v(c[8]))||0,correct:parseInt(v(c[9]))||0,
          accuracy:parseInt(v(c[10]))||0,minutes:parseInt(v(c[11]))||0,
          label:v(c[12]),predicted:parseInt(v(c[13]))||0,log:[]
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
        if(Array.isArray(r))return{date:r[0],subject:r[2],sphere:r[3]||subjectInfo(r[2]).sphere,mode:r[4]||r[5],total:parseInt(r[7]||r[8])||0,correct:parseInt(r[8]||r[9])||0,accuracy:parseInt(r[9]||r[10])||0,minutes:parseInt(r[5]||r[11])||0,log:[]};
        return{date:r.date||r.timestamp,subject:r.subject,sphere:r.sphere||subjectInfo(r.subject).sphere,mode:r.mode,total:parseInt(r.questions_total||r.total)||0,correct:parseInt(r.correct)||0,accuracy:parseInt(r.accuracy_pct||r.accuracy)||0,minutes:parseInt(r.minutes)||0,log:[]};
      }).filter(s=>s.date&&s.total>0);
      sessions=fromScript;
    }catch(e){console.log("Apps Script:",e.message);}
  }

  // 3. Merge localStorage (only entries NOT already in Sheet data)
  try{
    const local=JSON.parse(localStorage.getItem("mt_sessions")||"[]");
    // Build dedup set from Sheet data using session_id
    const sheetIds=new Set();
    const sheetComps=new Set();
    sessions.forEach(s=>{
      if(s.id)sheetIds.add(String(s.id));
      sheetComps.add((s.subject||"")+"|"+s.date+"|"+(s.total||0));
    });
    let added=0;
    local.forEach(s=>{
      const sId=s.id||s.session_id||"";
      const compKey=(s.subject||"")+"|"+s.date+"|"+(s.total||0);
      // Skip if session_id or composite key already in Sheet data
      if(sId&&sheetIds.has(String(sId)))return;
      if(sheetComps.has(compKey))return;
      sessions.push(s);
      added++;
    });
    // If Sheet loaded successfully, localStorage is redundant — clear it
    if(sessions.length>0&&added===0){
      localStorage.removeItem("mt_sessions");
    }
  }catch(e){}

  // Normalize: sphere keys → single-letter, subject "foundation"→"all"
  const sphereNorm={foundation:"F",tznk:"F",english:"F",it:"T",all:"F",S:"S",E:"E",T:"T",ST:"ST",ET:"ET",SE:"SE"};
  sessions.forEach(s=>{
    s.sphere=sphereNorm[(s.sphere||"").toLowerCase()]||sphereNorm[s.sphere]||s.sphere;
    if((s.subject||"").toLowerCase()==="foundation")s.subject="all";
  });

  return sessions.sort((a,b)=>new Date(b.date)-new Date(a.date));
}

/* ── Stats ── */
function renderStats(sessions){
  const filtered=filteredSessions(sessions);
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
  // Group by subject key (separates Foundation, English, IT, etc.)
  const bySubject={};
  filteredSessions(sessions).forEach(s=>{
    const subKey=s.subject||"unknown";
    const info=subjectInfo(subKey);
    if(!bySubject[subKey])bySubject[subKey]={c:0,t:0,mins:0,n:0,label:info.label,cls:info.cls};
    bySubject[subKey].c+=s.correct||0;bySubject[subKey].t+=s.total||0;
    bySubject[subKey].mins+=s.minutes||0;bySubject[subKey].n++;
  });
  const entries=Object.entries(bySubject);
  const grid=document.getElementById("goalGrid");
  if(!entries.length){
    grid.innerHTML='<p style="color:var(--muted);font-size:14px">No sessions yet.</p>';return;
  }
  grid.innerHTML=entries.map(([sub,d])=>{
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
  const filtered=filteredSessions(sessions);
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
  updateSubjectFilter(allSessions);
  renderStats(allSessions);
  renderGoals(allSessions);
  renderInsights(allSessions);
  renderLog(allSessions);
  renderAllCharts();
  // Sphere filter → update subject dropdown + re-render
  const sf=document.getElementById("sphereFilter");
  if(sf)sf.addEventListener("change",()=>{
    updateSubjectFilter(allSessions);
    renderStats(allSessions);
    renderGoals(allSessions);
    renderInsights(allSessions);
    renderLog(allSessions);
    renderAllCharts();
  });
  // Subject filter → re-render
  const subF=document.getElementById("subjectFilter");
  if(subF)subF.addEventListener("change",()=>{
    renderStats(allSessions);
    renderGoals(allSessions);
    renderInsights(allSessions);
    renderLog(allSessions);
    renderAllCharts();
  });
  // Record Real Exam Score
  const actualSubSel=document.getElementById("actualSubject");
  if(actualSubSel){
    // Populate with unique subjects from sessions
    const subjects=[...new Set(allSessions.map(s=>s.subject||"unknown"))].sort();
    actualSubSel.innerHTML='<option value="">Select subject</option>'+
      subjects.map(s=>`<option value="${s}">${SUBJECT_NAMES[s]||s}</option>`).join("");
  }
  document.getElementById("saveActualBtn")?.addEventListener("click",async()=>{
    const sub=document.getElementById("actualSubject")?.value;
    const score=parseInt(document.getElementById("actualScore")?.value);
    const msg=document.getElementById("actualMsg");
    if(!sub||isNaN(score)){msg.textContent="Pick subject & score";msg.style.color="#ef4444";return;}
    // Find latest simulation for this subject
    const sim=allSessions.filter(s=>(s.subject||"")===sub&&/sim/i.test(s.mode||""));
    const target=sim.length?sim[0]:allSessions.filter(s=>(s.subject||"")===sub).pop();
    if(!target||!target.id){msg.textContent="No session found for "+sub;msg.style.color="#ef4444";return;}
    // Update actual_score in Sheet via Apps Script
    try{
      await fetch(APPS_SCRIPT,{
        method:"POST",mode:"no-cors",
        headers:{"Content-Type":"text/plain"},
        body:JSON.stringify({type:"update",session_id:target.id,field:"actual_score",value:score})
      });
      msg.textContent="Saved "+score+" for "+(SUBJECT_NAMES[sub]||sub)+" ✓";
      msg.style.color="#22c55e";
      target.actualScore=score;
    }catch(e){msg.textContent="Save failed";msg.style.color="#ef4444";}
  });
})();
