// Google Sheets config — change SHEET_ID to your sheet
const SHEET_ID="1GcgjCJEPDAFtqOwONsfN_np5zdZFe3v2qa2lNzqDZd4";
const SHEET_URL=`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
// Apps Script web app URL for writing — deploy from Extensions > Apps Script
let APPS_SCRIPT_URL="https://script.google.com/macros/s/AKfycbzDJy4ysMJpXiDXI1_nwZYP1BCx0S1bZ7y9NHmDiD6wPhgfyRb4oXwDRO4twW2NfwNr1A/exec";

// i18n
const I18N={
  ua:{
    eyebrow:"K Mentorship Hub / 🧭 REAL-PREP-EDUCATION",
    title:"Master Training",
    lede:"🤝 Ми з тобою, ти впораєшся. Обери сферу — 🩺 Science, � Entrepreneurship, 💻 Technology — і тренуйся поруч із спільнотою.",
    frontDoor:"Головна",
    uiLang:"Мова інтерфейсу",qLang:"Мова питань",
    subS:"🔬 Біологія, хімія, фізика, медицина, екологія",
    subE:"📈 Менеджмент, маркетинг, фінанси, венчур, інновації",
    subT:"🛠️ Програмування, AI, системи, безпека, DevOps",
    msgTitle:"Твій тренер поруч.",msgBody:"Обери сферу та рівень — і почнемо разом. Ти впораєшся!",
    practice:"Практика",simulation:"Симуляція",
    resources:"Ресурси",back:"Назад",next:"Далі",
    desc:"Описова",diag:"Діагностична",presc:"Прескриптивна",pred:"Предиктивна",
    descTitle:"Описова аналітика — що сталося?",
    diagTitle:"Діагностична — чому?",
    prescTitle:"Прескриптивна — що робити?",
    predTitle:"Предиктивна — що буде?",
    readiness:"Сигнал готовності",sharedTitle:"Загальний прогрес по предметах",
    endTitle:"Сесію завершено!",endGreat:"Ти молодець!",
    endMsg:"Кожна сесія — крок уперед. Продовжуй, ти впораєшся!",
    newSession:"Нова сесія",
    allSubjects:"Усі предмети",correct:"Правильно!",wrong:"Неправильно. Відповідь: ",
    finish:"Завершити 🏁",min:"хв",sessions:"сесій",
    accBySub:"Точність по предметах",weakZones:"Слабкі зони (помилки)",
    priority:"Пріоритет вивчення (до 80%)",needMin2:"Потрібно мінімум 2 сесії",
    forecast:"Прогноз наступної сесії: ",totalAcc:"Загальна точність (всі сесії)"
  },
  en:{
    eyebrow:"K Mentorship Hub / 🧭 REAL-PREP-EDUCATION",
    title:"Master Training",
    lede:"🤝 You've got this. Pick your sphere — 🩺 Science, � Entrepreneurship, 💻 Technology — and train alongside the community.",
    frontDoor:"Front Door",
    uiLang:"Interface language",qLang:"Question language",
    subS:"🔬 Biology, chemistry, physics, medicine, ecology",
    subE:"📈 Management, marketing, finance, venture, innovation",
    subT:"🛠️ Programming, AI, systems, security, DevOps",
    msgTitle:"Your trainer is right here.",msgBody:"Pick a sphere and level — let's start together. You've got this!",
    practice:"Practice",simulation:"Simulation",
    resources:"Resources",back:"Back",next:"Next",
    desc:"Descriptive",diag:"Diagnostic",presc:"Prescriptive",pred:"Predictive",
    descTitle:"Descriptive analytics — what happened?",
    diagTitle:"Diagnostic — why?",
    prescTitle:"Prescriptive — what to do?",
    predTitle:"Predictive — what's next?",
    readiness:"Readiness signal",sharedTitle:"Overall progress by subject",
    endTitle:"Session complete!",endGreat:"Well done!",
    endMsg:"Every session is a step forward. Keep going, you've got this!",
    newSession:"New session",
    allSubjects:"All subjects",correct:"Correct!",wrong:"Wrong. Answer: ",
    finish:"Finish 🏁",min:"min",sessions:"sessions",
    accBySub:"Accuracy by subject",weakZones:"Weak zones (errors)",
    priority:"Study priority (to 80%)",needMin2:"Need at least 2 sessions",
    forecast:"Next session forecast: ",totalAcc:"Overall accuracy (all sessions)"
  }
};
let lang=localStorage.getItem("mt_lang")||"ua";
function t(k){return(I18N[lang]||I18N.ua)[k]||k;}
function applyI18N(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k=el.dataset.i18n;
    if(t(k)!==k)el.textContent=t(k);
  });
  // Update analytics titles
  const at={descriptive:"descTitle",diagnostic:"diagTitle",prescriptive:"prescTitle",predictive:"predTitle"};
  const ct=document.getElementById("chartTitle");
  if(ct&&at[state.analyticsType])ct.textContent=t(at[state.analyticsType]);
}

let state={sphere:null,level:"bachelor",subject:"all",mode:"practice",analyticsType:"descriptive",questions:[],currentIdx:0,answers:{},sessionStart:null,sessions:JSON.parse(localStorage.getItem("mt_sessions")||"[]"),sessionLog:[],sheetsData:[]};

// Load from Google Sheets on init
async function loadSheetsData(){
  try{
    const r=await fetch(SHEET_URL);
    const txt=await r.text();
    // gviz returns jsonp-like: )]}',{table:...}
    const json=JSON.parse(txt.replace(/^\)\]\}'\n/,""));
    const rows=json.table.rows;
    state.sheetsData=rows.map(r=>r.c.map(c=>c?v(c.v):""));
    // Merge sheets data into sessions if not already present
    if(state.sheetsData.length>0){
      const existing=JSON.parse(localStorage.getItem("mt_sessions")||"[]");
      const existingDates=new Set(existing.map(s=>s.date));
      const fromSheet=state.sheetsData.filter(r=>r[0]&&!existingDates.has(r[0])).map(r=>({
        date:r[0],sphere:r[1],level:r[2],subject:r[3],mode:r[4],
        minutes:parseInt(r[5])||1,total:parseInt(r[6])||0,correct:parseInt(r[7])||0,
        accuracy:parseInt(r[8])||0,log:[]
      }));
      if(fromSheet.length){
        state.sessions=[...existing,...fromSheet];
        localStorage.setItem("mt_sessions",JSON.stringify(state.sessions));
      }
    }
  }catch(e){console.log("Sheets load skipped:",e.message);}
}

// Save session to Google Sheets via Apps Script
async function saveToSheet(session){
  if(!APPS_SCRIPT_URL)return;
  try{
    await fetch(APPS_SCRIPT_URL,{
      method:"POST",mode:"no-cors",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({date:session.date,sphere:session.sphere,level:session.level,subject:session.subject,mode:session.mode,minutes:session.minutes,total:session.total,correct:session.correct,accuracy:session.accuracy})
    });
  }catch(e){console.log("Sheets save skipped:",e.message);}
}

// Init: load sheets data
loadSheetsData();

// Language controls
document.getElementById("uiLang").value=lang;
applyI18N();
document.getElementById("uiLang").addEventListener("change",e=>{
  lang=e.target.value;
  localStorage.setItem("mt_lang",lang);
  applyI18N();
  if(state.sphere){initSubjects();renderQ();renderStats();renderAnalytics();}
});
// Question language is locked to EN (questions are in English)
// qLang select stays disabled

// Sphere cards
document.querySelectorAll(".sphere-card").forEach(c=>{
  c.addEventListener("click",()=>{
    document.querySelectorAll(".sphere-card").forEach(x=>x.classList.remove("active"));
    c.classList.add("active");
    state.sphere=c.dataset.sphere;
    document.getElementById("sphereSection").style.display="none";
    document.getElementById("msgBox").style.display="none";
    document.getElementById("trainerMain").style.display="grid";
    initSubjects();startSession();
  });
});

// Level tabs
document.querySelectorAll("#levelTabs button").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll("#levelTabs button").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");state.level=b.dataset.level;
    if(state.sphere){initSubjects();startSession();}
  });
});

// Mode tabs
document.querySelectorAll(".mode-tabs button").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll(".mode-tabs button").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");state.mode=b.dataset.mode;startSession();
  });
});

// Analytics tabs
document.querySelectorAll(".analytics-tabs button").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll(".analytics-tabs button").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");state.analyticsType=b.dataset.type;renderAnalytics();
  });
});

document.getElementById("subjectFilter").addEventListener("change",e=>{state.subject=e.target.value;startSession();});
document.getElementById("prevBtn").addEventListener("click",()=>{if(state.currentIdx>0){state.currentIdx--;renderQ();}});
document.getElementById("nextBtn").addEventListener("click",()=>{if(state.currentIdx<state.questions.length-1){state.currentIdx++;renderQ();}else endSession();});

function initSubjects(){
  const sel=document.getElementById("subjectFilter");
  const subs=SPHERES[state.sphere][state.level];
  sel.innerHTML=`<option value="all">${t('allSubjects')}</option>`;
  subs.forEach(s=>{const o=document.createElement("option");o.value=s;o.textContent=s;sel.appendChild(o);});
}

function startSession(){
  const subs=state.subject==="all"?SPHERES[state.sphere][state.level]:[state.subject];
  let pool=[];
  subs.forEach(sub=>{if(Q[sub])Q[sub].forEach((q,i)=>pool.push({...q,subject:sub,idx:i}));});
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  const n=state.mode==="simulation"?Math.min(pool.length,30):Math.min(pool.length,10);
  state.questions=pool.slice(0,n);state.currentIdx=0;state.answers={};state.sessionStart=Date.now();state.sessionLog=[];
  document.getElementById("sessionEnd").style.display="none";
  document.getElementById("trainerMain").style.display="grid";
  renderQ();renderResources();renderStats();renderAnalytics();
}

function renderQ(){
  const q=state.questions[state.currentIdx];
  const area=document.getElementById("questionArea");
  document.getElementById("qNav").style.display="flex";
  document.getElementById("qCounter").textContent=`${state.currentIdx+1} / ${state.questions.length}`;
  const answered=state.answers[state.currentIdx]!==undefined;
  const ua=state.answers[state.currentIdx];
  let oh=q.opts.map((o,i)=>{
    let c="q-opt";
    if(answered){if(i===q.ans)c+=" correct";else if(i===ua&&i!==q.ans)c+=" wrong";else c+=" reveal";}
    else if(ua===i)c+=" selected";
    return `<div class="${c}" data-i="${i}">${o}</div>`;
  }).join("");
  area.innerHTML=`<div class="q-card"><div style="font-size:12px;color:var(--muted);margin-bottom:8px">${q.subject}</div><h3>${q.q}</h3><div class="q-options">${oh}</div>${answered?`<div style="margin-top:12px;font-size:13px;color:${ua===q.ans?'#22c55e':'#ef4444'}">${ua===q.ans?'✅ '+t('correct'):'❌ '+t('wrong')+q.opts[q.ans]}</div>`:''}</div>`;
  area.querySelectorAll(".q-opt:not(.correct):not(.wrong):not(.reveal)").forEach(el=>{
    el.addEventListener("click",()=>{
      const idx=parseInt(el.dataset.i);state.answers[state.currentIdx]=idx;
      state.sessionLog.push({subject:q.subject,correct:idx===q.ans,time:Date.now()});
      renderQ();renderStats();renderAnalytics();
    });
  });
  document.getElementById("prevBtn").disabled=state.currentIdx===0;
  document.getElementById("nextBtn").innerHTML=state.currentIdx===state.questions.length-1?t('finish'):t('next')+" →";
}

function endSession(){
  const el=Math.max(1,Math.round((Date.now()-state.sessionStart)/60000));
  const tot=state.sessionLog.length,cor=state.sessionLog.filter(l=>l.correct).length;
  const acc=tot?Math.round(cor/tot*100):0;
  state.sessions.push({sphere:state.sphere,level:state.level,subject:state.subject,mode:state.mode,date:new Date().toISOString(),minutes:el,total:tot,correct:cor,accuracy:acc,log:state.sessionLog});
  localStorage.setItem("mt_sessions",JSON.stringify(state.sessions));
  saveToSheet(state.sessions[state.sessions.length-1]);
  document.getElementById("trainerMain").style.display="none";
  document.getElementById("sessionEnd").style.display="block";
  document.getElementById("finalScore").textContent=acc+"%";
  document.getElementById("finalScore").style.color=acc>=80?"#22c55e":acc>=60?"#eab308":"#ef4444";
  const r=getReadiness();
  document.getElementById("finalStats").innerHTML=`<span class="stat-pill">⏱ ${el} ${t('min')}</span><span class="stat-pill">✅ ${cor}/${tot}</span><span class="stat-pill">🎯 ${acc}%</span><span class="stat-pill">🟢 ${r.label}</span>`;
}

function renderStats(){
  const log=state.sessionLog,tot=log.length,cor=log.filter(l=>l.correct).length;
  const acc=tot?Math.round(cor/tot*100):0;
  const el=state.sessionStart?Math.max(0,Math.round((Date.now()-state.sessionStart)/60000)):0;
  const r=getReadiness();
  document.getElementById("sessionStats").innerHTML=`<span class="stat-pill">⏱ <span class="val">${el} ${t('min')}</span></span><span class="stat-pill">✅ <span class="val">${cor}/${tot}</span></span><span class="stat-pill">🎯 <span class="val">${acc}%</span></span><span class="stat-pill">📋 <span class="val">${state.sessions.length} ${t('sessions')}</span></span><span class="stat-pill">🟢 <span class="val">${r.label}</span></span>`;
  const rv=document.getElementById("readinessValue");rv.textContent=r.label;rv.className="readiness "+r.cls;
  const bar=document.getElementById("readinessBar");bar.style.width=r.pct+"%";bar.style.background=r.cls==="high"?"#22c55e":r.cls==="medium"?"#eab308":"#ef4444";
}

function getReadiness(){
  const r=state.sessions.slice(-5);
  if(!r.length)return{label:"New",cls:"low",pct:10};
  const a=r.reduce((s,x)=>s+x.accuracy,0)/r.length;
  const t=r.reduce((s,x)=>s+x.total,0);
  if(a>=85&&t>=30)return{label:"High",cls:"high",pct:Math.min(95,a)};
  if(a>=65)return{label:"Medium",cls:"medium",pct:a};
  return{label:"Low",cls:"low",pct:a};
}

function renderResources(){
  const subs=state.subject==="all"?SPHERES[state.sphere][state.level]:[state.subject];
  let h="";
  subs.forEach(s=>{if(RES[s]){h+=`<div style="font-size:12px;font-weight:600;margin:8px 0 4px">${s}</div>`;RES[s].forEach(r=>h+=`<a href="${r.u}" target="_blank" rel="noreferrer">${r.l}</a>`);}});
  document.getElementById("resourceLinks").innerHTML=h;
}

function renderAnalytics(){
  const atype=state.analyticsType;
  const titles={descriptive:t('descTitle'),diagnostic:t('diagTitle'),prescriptive:t('prescTitle'),predictive:t('predTitle')};
  document.getElementById("chartTitle").textContent=titles[atype]||"";
  const c=document.getElementById("mainChart"),ctx=c.getContext("2d");
  c.width=c.offsetWidth*2;c.height=360;ctx.clearRect(0,0,c.width,c.height);
  const subs=SPHERES[state.sphere][state.level],log=state.sessionLog,sess=state.sessions.filter(s=>s.sphere===state.sphere);
  if(atype==="descriptive")drawAcc(ctx,c,subs,log);
  else if(atype==="diagnostic")drawWeak(ctx,c,subs,log);
  else if(atype==="prescriptive")drawPriority(ctx,c,subs,log);
  else if(atype==="predictive")drawPredict(ctx,c,sess);
  drawShared();
}

function drawAcc(ctx,c,subs,log){
  const acc={};subs.forEach(s=>acc[s]={c:0,t:0});
  log.forEach(l=>{if(acc[l.subject]){acc[l.subject].t++;if(l.correct)acc[l.subject].c++;}});
  const vals=subs.map(s=>acc[s].t?Math.round(acc[s].c/acc[s].t*100):0);
  barChart(ctx,c.width,c.height,subs,vals,["#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#ef4444"],t('accBySub'));
}

function drawWeak(ctx,c,subs,log){
  const w={};subs.forEach(s=>w[s]=0);
  log.filter(l=>!l.correct).forEach(l=>{if(w[l.subject]!==undefined)w[l.subject]++;});
  const mx=Math.max(...Object.values(w),1),vals=subs.map(s=>Math.round(w[s]/mx*100));
  barChart(ctx,c.width,c.height,subs,vals,["#ef4444","#f97316","#eab308","#f43f5e","#dc2626"],t('weakZones'));
}

function drawPriority(ctx,c,subs,log){
  const acc={};const cnt={};subs.forEach(s=>{acc[s]=0;cnt[s]=0;});
  log.forEach(l=>{if(cnt[l.subject]!==undefined){cnt[l.subject]++;if(l.correct)acc[l.subject]++;}});
  const vals=subs.map(s=>{const a=cnt[s]?Math.round(acc[s]/cnt[s]*100):0;return Math.max(0,80-a);});
  barChart(ctx,c.width,c.height,subs,vals,["#22c55e","#16a34a","#15803d","#166534","#14532d"],t('priority'));
}

function drawPredict(ctx,c,sess){
  const r=sess.slice(-10);
  if(r.length<2){ctx.fillStyle="var(--muted)";ctx.font="14px system-ui";ctx.fillText(t('needMin2'),60,100);return;}
  const a=r.map(s=>s.accuracy),n=a.length;
  const sx=a.reduce((s,_,i)=>s+i,0),sy=a.reduce((s,v)=>s+v,0),sxy=a.reduce((s,v,i)=>s+i*v,0),sxx=a.reduce((s,_,i)=>s+i*i,0);
  const slope=(n*sxy-sx*sy)/(n*sxx-sx*sx),intercept=(sy-slope*sx)/n;
  const pred=Math.min(100,Math.max(0,Math.round(intercept+slope*n)));
  const w=c.width,h=c.height,pad=60,cw=w-pad*2,ch=h-pad*2;
  ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--ink")||"#333";
  ctx.font="bold 14px system-ui";ctx.fillText(t('forecast')+pred+"%",pad,30);
  a.forEach((v,i)=>{const x=pad+i*(cw/(n-1||1)),y=h-pad-(v/100)*ch;ctx.beginPath();ctx.arc(x,y,5,0,Math.PI*2);ctx.fillStyle="#3b82f6";ctx.fill();});
  ctx.strokeStyle="#3b82f6";ctx.lineWidth=2;ctx.beginPath();
  ctx.moveTo(pad,h-pad-(a[0]/100)*ch);ctx.lineTo(pad+(n-1)*(cw/(n-1||1)),h-pad-(a[n-1]/100)*ch);ctx.stroke();
  const px=pad+n*(cw/(n-1||1)),py=h-pad-(pred/100)*ch;
  ctx.beginPath();ctx.arc(px,py,8,0,Math.PI*2);ctx.fillStyle="#22c55e";ctx.fill();
}

function drawShared(){
  const c=document.getElementById("sharedChart"),ctx=c.getContext("2d");
  c.width=c.offsetWidth*2;c.height=360;ctx.clearRect(0,0,c.width,c.height);
  const subs=SPHERES[state.sphere][state.level],all=state.sessions.filter(s=>s.sphere===state.sphere);
  const acc={};subs.forEach(s=>acc[s]={c:0,t:0});
  all.forEach(s=>(s.log||[]).forEach(l=>{if(acc[l.subject]){acc[l.subject].t++;if(l.correct)acc[l.subject].c++;}}));
  const vals=subs.map(s=>acc[s].t?Math.round(acc[s].c/acc[s].t*100):0);
  barChart(ctx,c.width,c.height,subs,vals,["#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#ef4444"],t('totalAcc'));
}

function barChart(ctx,w,h,labels,values,colors,title){
  const pad=60,bw=Math.min(60,(w-pad*2)/labels.length-10),mx=Math.max(...values,1),ch=h-pad*2;
  ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--ink")||"#333";
  ctx.font="bold 14px system-ui";ctx.fillText(title,pad,30);
  labels.forEach((l,i)=>{
    const x=pad+i*(bw+10)+10,bh=Math.max(2,(values[i]/mx)*ch),y=h-pad-bh;
    ctx.fillStyle=colors[i%colors.length];ctx.beginPath();ctx.roundRect(x,y,bw,bh,6);ctx.fill();
    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--ink")||"#333";
    ctx.font="11px system-ui";ctx.textAlign="center";
    ctx.fillText(l.length>12?l.substring(0,11)+"\u2026":l,x+bw/2,h-pad+16);
    ctx.fillText(values[i]+"%",x+bw/2,y-6);
  });ctx.textAlign="start";
}
