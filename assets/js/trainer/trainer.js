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
    lede:"\u{1F91D} \u0422\u0438 \u0432\u043F\u043E\u0440\u0430\u0454\u0448\u0441\u044F. \u041E\u0431\u0435\u0440\u0438 \u0431\u0430\u0437\u0443 (TZNK + English) \u2014 \u0430\u0431\u043E \u0441\u0444\u0435\u0440\u0443 \u0456\u0441\u043F\u0438\u0442\u0443 \u2014 \u0456 \u0442\u0440\u0435\u043D\u0443\u0439\u0441\u044F.",
    subF:"\u{1F9EE} TZNK \u00b7 \u041B\u043E\u0433\u0456\u043A\u0430, \u043C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u043A\u0430 + \u{1F1EC}\u{1F1E7} English \u00b7 Reading, Grammar",
    subS:"\u{1F52C} Biology, Chemistry, Physics, Bioinformatics",
    subE:"\u{1F4C8} Management, Marketing, Finance, Analytics",
    subT:"\u{1F6E0}\uFE0F Programming, AI, Algorithms, Databases",
    subST:"\u{1F9EC} Biotech, Bioinformatics, Data Analysis",
    subET:"\u{1F4CA} Digital Marketing, ERP, IT Management",
    subSE:"\u{1F48A} Pharma, Health Economics, Biotech Business",
    msgTitle:"\u0422\u0432\u0456\u0439 \u0442\u0440\u0435\u043D\u0435\u0440 \u043F\u043E\u0440\u0443\u0447.",
    msgBody:"\u041E\u0431\u0435\u0440\u0438 \u0441\u0444\u0435\u0440\u0443 \u0442\u0430 \u0440\u0456\u0432\u0435\u043D\u044C \u2014 \u0456 \u043D\u0430\u0442\u0438\u0441\u043D\u0438 \u041F\u043E\u0447\u0430\u0442\u0438. \u0422\u0438 \u0432\u043F\u043E\u0440\u0430\u0454\u0448\u0441\u044F!",
    startTitle:"\u0413\u043E\u0442\u043E\u0432\u0456 \u043F\u043E\u0447\u0430\u0442\u0438?",
    startDesc:"\u041E\u0431\u0435\u0440\u0456\u0442\u044C \u043F\u0440\u0435\u0434\u043C\u0435\u0442 \u0442\u0430 \u0440\u0435\u0436\u0438\u043C, \u043F\u043E\u0442\u0456\u043C \u043D\u0430\u0442\u0438\u0441\u043D\u0438\u0442\u0435 \u041F\u043E\u0447\u0430\u0442\u0438.",
    startBtn:"\u041F\u043E\u0447\u0430\u0442\u0438 \u0441\u0435\u0441\u0456\u044E",
    timerLabel:"\u043C\u0438\u043D\u0443\u043B\u043E",
    timerExam:"\u0437\u0430\u043B\u0438\u0448\u0438\u043B\u043E\u0441\u044C",
    pracHint:"\u041F\u0440\u0430\u043A\u0442\u0438\u043A\u0430: 10 \u043F\u0438\u0442\u0430\u043D\u044C \u0443 \u0441\u0432\u043E\u0454\u043C\u0443 \u0442\u0435\u043C\u043F\u0456.",
    simHint:"\u0421\u0438\u043C\u0443\u043B\u044F\u0446\u0456\u044F: \u0432\u0441\u0456 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0456 \u043F\u0438\u0442\u0430\u043D\u044C \u0437 \u0442\u0430\u0439\u043C\u0435\u0440\u043E\u043C.",
    practice:"\u041F\u0440\u0430\u043A\u0442\u0438\u043A\u0430",
    simulation:"\u0421\u0438\u043C\u0443\u043B\u044F\u0446\u0456\u044F",
    resources:"\u0420\u0435\u0441\u0443\u0440\u0441\u0438",
    back:"\u041D\u0430\u0437\u0430\u0434",
    next:"\u0414\u0430\u043B\u0456",
    desc:"\u041E\u043F\u0438\u0441\u043E\u0432\u0430",
    diag:"\u0414\u0456\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u0447\u043D\u0430",
    presc:"\u041F\u0440\u0435\u0441\u043A\u0440\u0438\u043F\u0442\u0438\u0432\u043D\u0430",
    pred:"\u041F\u0440\u0435\u0434\u0438\u043A\u0442\u0438\u0432\u043D\u0430",
    descTitle:"\u041E\u043F\u0438\u0441\u043E\u0432\u0430 \u0430\u043D\u0430\u043B\u0456\u0442\u0438\u043A\u0430 \u2014 \u0448\u043E \u0441\u0442\u0430\u043B\u043E\u0441\u044C?",
    diagTitle:"\u0414\u0456\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u0447\u043D\u0430 \u2014 \u0447\u043E\u043C\u0443?",
    prescTitle:"\u041F\u0440\u0435\u0441\u043A\u0440\u0438\u043F\u0442\u0438\u0432\u043D\u0430 \u2014 \u0448\u043E \u0440\u043E\u0431\u0438\u0442\u0438?",
    predTitle:"\u041F\u0440\u0435\u0434\u0438\u043A\u0442\u0438\u0432\u043D\u0430 \u2014 \u0448\u043E \u0431\u0443\u0434\u0435?",
    readiness:"\u0421\u0438\u0433\u043D\u0430\u043B \u0433\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u0456",
    sharedTitle:"\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0438\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441 \u043F\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430\u043C",
    endTitle:"\u0421\u0435\u0441\u0456\u044E \u0437\u0430\u043A\u0438\u043D\u0447\u0435\u043D\u043E!",
    endGreat:"\u0422\u0438 \u043C\u043E\u043B\u043E\u0434\u0435\u0446\u044C!",
    endMsg:"\u041A\u043E\u0436\u043D\u0430 \u0441\u0435\u0441\u0456\u044F \u2014 \u0448\u0430\u0433 \u0432\u043F\u0435\u0440\u0435\u0434. \u041F\u0440\u043E\u0434\u043E\u0436\u0443\u0439, \u0442\u0438 \u0432\u043F\u043E\u0440\u0430\u0454\u0448\u0441\u044F!",
    newSession:"\u041D\u043E\u0432\u0430 \u0441\u0435\u0441\u0456\u044F",
    allSubjects:"\u0423\u0441\u0456 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0438",
    correct:"\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E!",
    wrong:"\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E. \u0412\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u044C: ",
    finish:"\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0438 \u2708",
    min:"\u0445\u0432",
    sessions:"\u0441\u0435\u0441\u0456\u0439",
    accBySub:"\u0422\u043E\u0447\u043D\u0456\u0441\u0442\u044C \u043F\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430\u043C",
    weakZones:"\u0421\u043B\u0430\u0431\u043A\u0456 \u0437\u043E\u043D\u0438 (\u043F\u043E\u043C\u0438\u043B\u043A\u0438)",
    priority:"\u041F\u0440\u0456\u043E\u0440\u0438\u0442\u0435\u0442 \u043D\u0430\u0432\u0447\u0430\u043D\u043D\u044F (\u0434\u043E 80%)",
    needMin2:"\u041F\u043E\u0442\u0440\u0456\u0431\u043D\u043E \u043C\u0456\u043D\u0456\u043C\u0443\u043C 2 \u0441\u0435\u0441\u0456\u0457",
    forecast:"\u041F\u0440\u043E\u0433\u043D\u043E\u0437 \u043D\u0430\u0441\u0442\u0443\u043F\u043D\u043E\u0457 \u0441\u0435\u0441\u0456\u0457: ",
    totalAcc:"\u0417\u0430\u0433\u0430\u043B\u044C\u043D\u0430 \u0442\u043E\u0447\u043D\u0456\u0441\u0442\u044C (\u0432\u0441\u0456 \u0441\u0435\u0441\u0456\u0457)"
  },
  en:{
    eyebrow:"K Mentorship Hub / 🧭 REAL-PREP-EDUCATION",
    title:"Master Training",
    lede:"\u{1F91D} You've got this. Pick foundation (TZNK + English), a sphere exam, or a combo path \u2014 and train.",
    frontDoor:"Front Door",
    uiLang:"Interface language",qLang:"Question language",
    subF:"\u{1F9EE} TZNK \u00b7 Logic, Math + \u{1F1EC}\u{1F1E7} English \u00b7 Reading, Grammar",
    subS:"\u{1F52C} Biology, Chemistry, Physics, Bioinformatics",
    subE:"\u{1F4C8} Management, Marketing, Finance, Analytics",
    subT:"\u{1F6E0}\uFE0F Programming, AI, Algorithms, Databases",
    subST:"\u{1F9EC} Biotech, Bioinformatics, Data Analysis",
    subET:"\u{1F4CA} Digital Marketing, ERP, IT Management",
    subSE:"\u{1F48A} Pharma, Health Economics, Biotech Business",
    msgTitle:"Your trainer is right here.",
    msgBody:"Pick a sphere and level \u2014 then press Start. You've got this!",
    startTitle:"Ready to begin?",
    startDesc:"Choose your subject and mode, then press Start.",
    startBtn:"Start Session",
    timerLabel:"elapsed",
    timerExam:"remaining",
    pracHint:"Practice: 10 questions at your own pace.",
    simHint:"Simulation: all available questions with countdown timer.",
    practice:"Practice",
    simulation:"Simulation",
    resources:"Resources",
    back:"Back",
    next:"Next",
    desc:"Descriptive",
    diag:"Diagnostic",
    presc:"Prescriptive",
    pred:"Predictive",
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

// Derive sphere from subject key (for legacy data without sphere field)
const _SUBJ_SPHERE={tznk:"S",english:"E",it:"T",all:"F",foundation:"F",S:"S",E:"E",T:"T",ST:"ST",ET:"ET",SE:"SE"};
function subjectInfo(s){return{sphere:_SUBJ_SPHERE[(s||"").toLowerCase()]||_SUBJ_SPHERE[s]||s||"F"};}

// Load from Google Sheets on init
async function loadSheetsData(){
  try{
    // 1. Try gviz (works when Sheet is "Anyone with link can view")
    const r=await fetch(SHEET_URL);
    const txt=await r.text();
    const json=JSON.parse(txt.replace(/^\)\]\}'\n/,""));
    const rows=json.table.rows;
    state.sheetsData=rows.map(r=>r.c.map(c=>c?v(c.v):""));
    // Merge sheets data into sessions if not already present
    // Columns after migration: session_id(0), date(1), subject(2), sphere(3), platform(4), mode(5),
    // source_group(6), is_internal(7), questions_total(8), correct(9),
    // accuracy_pct(10), minutes(11), session_label(12), predicted_score(13), actual_score(14), notes(15)
    if(state.sheetsData.length>0){
      const existing=JSON.parse(localStorage.getItem("mt_sessions")||"[]");
      const existingIds=new Set(existing.map(s=>s.id||s.date));
      const fromSheet=state.sheetsData.filter(r=>r[1]&&!existingIds.has(r[0]||r[1])).map(r=>({
        id:r[0],date:r[1],subject:r[2],sphere:r[3]||subjectInfo(r[2]).sphere,mode:r[5],
        minutes:parseInt(r[11])||1,total:parseInt(r[8])||0,correct:parseInt(r[9])||0,
        accuracy:parseInt(r[10])||0,label:r[12],log:[]
      }));
      if(fromSheet.length){
        state.sessions=[...existing,...fromSheet];
        localStorage.setItem("mt_sessions",JSON.stringify(state.sessions));
      }
    }
  }catch(e){
    console.log("gviz skipped:",e.message);
    // 2. Fallback: Apps Script GET (returns named objects)
    try{
      const r2=await fetch(APPS_SCRIPT_URL);
      const data=await r2.json();
      const rows=data.sessions||[];
      const existing=JSON.parse(localStorage.getItem("mt_sessions")||"[]");
      const existingIds=new Set(existing.map(s=>s.id||s.date));
      const fromScript=rows.filter(r=>r.date&&!existingIds.has(r.session_id||r.date)).map(r=>({
        id:r.session_id,date:r.date,subject:r.subject,sphere:r.sphere||subjectInfo(r.subject).sphere,mode:r.mode,
        minutes:parseInt(r.minutes)||1,total:parseInt(r.questions_total)||0,
        correct:parseInt(r.correct)||0,accuracy:parseInt(r.accuracy_pct)||0,
        label:r.session_label,log:[]
      }));
      if(fromScript.length){
        state.sessions=[...existing,...fromScript];
        localStorage.setItem("mt_sessions",JSON.stringify(state.sessions));
      }
    }catch(e2){console.log("Apps Script load skipped:",e2.message);}
  }
  // Clean up localStorage: add sphere to legacy entries, deduplicate
  const sessions=JSON.parse(localStorage.getItem("mt_sessions")||"[]");
  const subjectToSphere={tznk:"S",english:"E",it:"T",all:"F",foundation:"F",S:"S",E:"E",T:"T",ST:"ST",ET:"ET",SE:"SE"};
  let changed=false;
  sessions.forEach(s=>{
    if(!s.sphere&&s.subject){
      s.sphere=subjectToSphere[(s.subject+"").toLowerCase()]||s.subject;
      changed=true;
    }
  });
  // Deduplicate by id/date
  if(changed||sessions.length>0){
    const seen=new Set();
    const deduped=sessions.filter(s=>{
      const key=s.id||s.date;
      if(seen.has(key))return false;
      seen.add(key);return true;
    });
    if(deduped.length!==sessions.length||changed){
      state.sessions=deduped;
      localStorage.setItem("mt_sessions",JSON.stringify(deduped));
    }
  }
}

// Save session to Google Sheets via Apps Script
async function saveToSheet(session){
  if(!APPS_SCRIPT_URL)return;
  try{
    const modeLabel=state.mode==="simulation"?"simulation":"training";
    const sessionId=`${modeLabel}-${Date.now()}`;
    const sessLabel=state.mode==="simulation"?"s001-exam":"s001";
    const predScore=getReadiness().pct||session.accuracy;
    const row={
      session_id:sessionId,
      date:session.date,
      subject:session.subject,  // specific subject or sphere key if "all"
      sphere:session.sphere,    // sphere key: S, E, T, foundation, ST, ET, SE
      platform:"Master Trainer",
      mode:modeLabel,
      source_group:"internal",
      is_internal:true,
      questions_total:session.total,
      correct:session.correct,
      accuracy_pct:session.accuracy,
      minutes:session.minutes,
      session_label:sessLabel,
      predicted_score:predScore,
      actual_score:session.accuracy,
      notes:""
    };
    await fetch(APPS_SCRIPT_URL,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"text/plain"},
      body:JSON.stringify({type:"session",row:row})
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
    showStartScreen();
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

// Mode tabs (wired dynamically in showStartScreen)

// Analytics tabs
document.querySelectorAll(".analytics-tabs button").forEach(b=>{
  b.addEventListener("click",()=>{
    document.querySelectorAll(".analytics-tabs button").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");state.analyticsType=b.dataset.type;renderAnalytics();
  });
});

document.getElementById("prevBtn").addEventListener("click",()=>{if(state.currentIdx>0){state.currentIdx--;renderQ();}});
document.getElementById("nextBtn").addEventListener("click",()=>{if(state.currentIdx<state.questions.length-1){state.currentIdx++;renderQ();}else endSession();});

function initSubjects(){
  const sel=document.getElementById("subjectFilter");
  const subs=SPHERES[state.sphere][state.level];
  sel.innerHTML=`<option value="all">${t('allSubjects')}</option>`;
  subs.forEach(s=>{const o=document.createElement("option");o.value=s;o.textContent=s;sel.appendChild(o);});
}

function showStartScreen(){
  initSubjects();
  const ss=document.getElementById("startScreen");
  ss.style.display="block";
  document.getElementById("startTitle").textContent=t('startTitle');
  document.getElementById("startDesc").textContent=t('startDesc');
  document.getElementById("startBtn").textContent=t('startBtn');
  document.getElementById("trainerMain").style.display="none";
  document.getElementById("sessionEnd").style.display="none";
  // Wire mode tabs on start screen
  const modeTabs=ss.querySelectorAll(".mode-tabs button");
  modeTabs.forEach(b=>{
    b.onclick=()=>{
      modeTabs.forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
      state.mode=b.dataset.mode;
      const hint=document.getElementById("modeHint");
      if(hint)hint.textContent=state.mode==="simulation"?t('simHint'):t('pracHint');
    };
  });
  // Wire subject filter on start screen
  const sf=document.getElementById("subjectFilter");
  if(sf)sf.onchange=e=>{state.subject=e.target.value;};
  // Update mode hint
  const hint=document.getElementById("modeHint");
  if(hint)hint.textContent=state.mode==="simulation"?t('simHint'):t('pracHint');
}

document.getElementById("startBtn").addEventListener("click",()=>{
  document.getElementById("startScreen").style.display="none";
  document.getElementById("trainerMain").style.display="grid";
  startSession();
});

// Back to sphere selection
document.getElementById("backToSpheres").addEventListener("click",()=>{
  document.getElementById("startScreen").style.display="none";
  document.getElementById("sphereSection").style.display="block";
  document.getElementById("msgBox").style.display="block";
  document.querySelectorAll(".sphere-card").forEach(x=>x.classList.remove("active"));
  state.sphere=null;
});

// Back to start screen (from session)
document.getElementById("backToStart").addEventListener("click",()=>{
  stopTimer();
  document.getElementById("trainerMain").style.display="none";
  document.getElementById("startScreen").style.display="block";
});

let timerInterval=null;
const EXAM_MINUTES={foundation:60,S:90,E:90,T:120,ST:120,ET:120,SE:90}; // real exam durations by sphere

function startTimer(){
  if(timerInterval)clearInterval(timerInterval);
  const bar=document.getElementById("timerBar");
  bar.style.display="flex";
  const isSim=state.mode==="simulation";
  const examMins=EXAM_MINUTES[state.sphere]||90;
  const startMs=Date.now();
  const limitMs=isSim?examMins*60000:0;
  document.getElementById("timerLabel").textContent=isSim?t('timerExam'):t('timerLabel');
  timerInterval=setInterval(()=>{
    const elapsed=Date.now()-startMs;
    const totalSec=Math.floor(elapsed/1000);
    const mm=String(Math.floor(totalSec/60)).padStart(2,'0');
    const ss=String(totalSec%60).padStart(2,'0');
    if(isSim&&limitMs>0){
      const remain=Math.max(0,limitMs-elapsed);
      const rm=String(Math.floor(remain/60000)).padStart(2,'0');
      const rs=String(Math.floor((remain%60000)/1000)).padStart(2,'0');
      document.getElementById("timerValue").textContent=rm+':'+rs;
      if(remain<=0){clearInterval(timerInterval);endSession();}
    }else{
      document.getElementById("timerValue").textContent=mm+':'+ss;
    }
  },1000);
}

function stopTimer(){if(timerInterval){clearInterval(timerInterval);timerInterval=null;}}

function startSession(){
  const subs=state.subject==="all"?SPHERES[state.sphere][state.level]:[state.subject];
  let pool=[];
  subs.forEach(sub=>{if(Q[sub])Q[sub].forEach((q,i)=>pool.push({...q,subject:sub,idx:i}));});
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  // Simulation: use all available questions (up to 60) to mimic real exam; Practice: 10
  const n=state.mode==="simulation"?Math.min(pool.length,60):Math.min(pool.length,10);
  state.questions=pool.slice(0,n);state.currentIdx=0;state.answers={};state.sessionStart=Date.now();state.sessionLog=[];
  document.getElementById("sessionEnd").style.display="none";
  document.getElementById("trainerMain").style.display="grid";
  startTimer();
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
  // Derive subject label: sphere key if "all", else specific subject
  const subjLabel=state.subject==="all"?state.sphere:state.subject;
  state.sessions.push({sphere:state.sphere,level:state.level,subject:subjLabel,mode:state.mode,date:new Date().toISOString(),minutes:el,total:tot,correct:cor,accuracy:acc,log:state.sessionLog});
  localStorage.setItem("mt_sessions",JSON.stringify(state.sessions));
  saveToSheet(state.sessions[state.sessions.length-1]);
  stopTimer();
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
