const quests = [
  {id:"S1",sphere:"S",dir:"S1 — 🩺  Biomedical & Oncology",label:"🩺 S1 Biomedical & Oncology"},
  {id:"S2",sphere:"S",dir:"S2 — 🌿 Plant Science & Phytochemistry",label:"🌿 S2 Plant Science & Phytochemistry"},
  {id:"S3",sphere:"S",dir:"S3 — 🌾 Agricultural Biology & Biofertilizers",label:"🌾 S3 AgBio & Biofertilizers"},
  {id:"S4",sphere:"S",dir:"S4 — ⚗️ Biochemistry & Metabolomics",label:"⚗️ S4 Biochemistry & Metabolomics"},
  {id:"S5",sphere:"S",dir:"S5 — 🧠 Neuroscience & Aging",label:"🧠 S5 Neuroscience & Aging"},
  {id:"S6",sphere:"S",dir:"S6 — 🌍 Ecology & Environmental Science",label:"🌍 S6 Ecology & Environmental"},
  {id:"S7",sphere:"S",dir:"S7 — 📚 K Life OS",label:"📚 S7 K Life OS"},
  {id:"E1",sphere:"E",dir:"E1 - Venture, Product & Opportunity Systems",label:"💼 E1 Venture & Product"},
  {id:"E2",sphere:"E",dir:"E2 - Market, Audience & Behavioral Intelligence",label:"📊 E2 Market & Behavioral"},
  {id:"E3",sphere:"E",dir:"E3 - Ecosystem, Partnerships & External Signals",label:"🤝 E3 Ecosystem & Partners"},
  {id:"E4",sphere:"E",dir:"E4 - Applied Investigations & Public Cases",label:"📋 E4 Applied Investigations"},
  {id:"T1",sphere:"T",dir:"T1 - Research Tools, ML & Analytical Engines",label:"🤖 T1 Research Tools & ML"},
  {id:"T2",sphere:"T",dir:"T2 - Reproducibility, Scoring & Method Systems",label:"💻 T2 Reproducibility & Scoring"},
  {id:"T3",sphere:"T",dir:"T3 - Dashboards, Interfaces & Open Infrastructure",label:"🖥️ T3 Dashboards & Infra"}
];

// Research quests from RESEARCH-QUESTS folder
const researchQuests = [
  {id:"R1",sphere:"R",dir:"research-quest-01-ai-data-pipeline",label:"🔬 R1 AI & Data Pipeline Investigation"},
  {id:"R2",sphere:"R",dir:"research-quest-02-reproducibility-check",label:"🔬 R2 Reproducibility Check"},
  {id:"R3",sphere:"R",dir:"research-quest-03-method-validation",label:"🔬 R3 Method Validation"}
];

const REPO_MAP = {
  S:"K-RnD-Lab/SPHERE-I-SCIENCE",
  E:"K-RnD-Lab/SPHERE-II-ENTREPRENEURSHIP",
  T:"K-RnD-Lab/SPHERE-III-TECHNOLOGY",
  R:"K-RnD-Lab/SPHERE-FRONTIER"
};

const nav = document.getElementById("questNav");
const content = document.getElementById("mdContent");

function buildNav(){
  const groups = {S:[],E:[],T:[],R:[]};
  quests.forEach(q => groups[q.sphere].push(q));
  researchQuests.forEach(q => groups[q.sphere].push(q));
  
  const labels = {S:"Science",E:"Entrepreneurship",T:"Technology",R:"Research Quests"};
  let html = `<a href="./index.html" class="back-link">← K R&D Lab</a><h2>Quests</h2>`;
  
  Object.entries(groups).forEach(([sphere,items]) => {
    if(items.length === 0) return;
    html += `<div class="nav-${sphere}"><h3>${labels[sphere]}</h3>`;
    items.forEach(q => {
      html += `<a href="#${q.id}" data-dir="${encodeURIComponent(q.dir)}" data-sphere="${q.sphere}">${q.label}</a>`;
    });
    html += `</div>`;
  });
  
  nav.innerHTML = html;
  
  nav.querySelectorAll("a[data-dir]").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      nav.querySelectorAll("a").forEach(x => x.classList.remove("active"));
      a.classList.add("active");
      loadQuest(decodeURIComponent(a.dataset.dir), a.dataset.sphere);
    });
  });
}

async function loadQuest(dir, sphere){
  let url;
  if(sphere === "R"){
    // Research quests are in the same repo (SPHERE-FRONTIER)
    url = `https://raw.githubusercontent.com/K-RnD-Lab/SPHERE-FRONTIER/TEZv-research/RESEARCH-QUESTS/${dir}.md`;
  } else {
    const repo = REPO_MAP[sphere];
    url = `https://raw.githubusercontent.com/${repo}/main/${dir}/README.md`;
  }
  
  content.innerHTML = "<p style='color:var(--muted)'>Loading quest...</p>";
  
  try {
    const res = await fetch(url);
    if(!res.ok) throw new Error(res.status);
    const md = await res.text();
    content.innerHTML = marked.parse(md);
  } catch(err) {
    let ghUrl;
    if(sphere === "R"){
      ghUrl = `https://github.com/K-RnD-Lab/SPHERE-FRONTIER/tree/TEZv-research/RESEARCH-QUESTS`;
    } else {
      const repo = REPO_MAP[sphere];
      ghUrl = `https://github.com/${repo}/tree/main/${dir}`;
    }
    content.innerHTML = `<p style='color:var(--muted)'>Could not load quest. <a href="${ghUrl}" target="_blank" rel="noreferrer">Open on GitHub →</a></p>`;
  }
}

buildNav();

const hash = location.hash.slice(1);
if(hash){
  const allQuests = [...quests, ...researchQuests];
  const q = allQuests.find(q => q.id === hash);
  if(q){
    const a = nav.querySelector(`a[href="#${q.id}"]`);
    if(a){ a.classList.add("active"); loadQuest(q.dir, q.sphere); }
  }
}
