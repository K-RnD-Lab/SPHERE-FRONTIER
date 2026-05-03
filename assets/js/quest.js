const quests = [
  {id:"S1",sphere:"S",file:"🩺-S1-HealthTech.md",label:"🩺 S1 HealthTech"},
  {id:"S2",sphere:"S",file:"🌿-S2-Green-Sustainability.md",label:"🌿 S2 Green / Sustainability"},
  {id:"S3",sphere:"S",file:"🌾-S3-AgTech-Food.md",label:"🌾 S3 AgTech & Food"},
  {id:"S4",sphere:"S",file:"📚-S4-Human-Systems.md",label:"📚 S4 Human Systems"},
  {id:"E1",sphere:"E",file:"💼-E1-Venture-Product.md",label:"💼 E1 Venture / Product"},
  {id:"E2",sphere:"E",file:"📊-E2-Validation-GTM.md",label:"📊 E2 Validation / GTM"},
  {id:"E3",sphere:"E",file:"🤝-E3-Ecosystem-Partners.md",label:"🤝 E3 Ecosystem & Partners"},
  {id:"E4",sphere:"E",file:"📋-E4-Founder-Ops.md",label:"📋 E4 Founder Ops"},
  {id:"T1",sphere:"T",file:"🤖-T1-AI-Data-Analytics.md",label:"🤖 T1 AI / Data Analytics"},
  {id:"T2",sphere:"T",file:"💻-T2-Software-Engineering.md",label:"💻 T2 Software Engineering"},
  {id:"T3",sphere:"T",file:"🖥️-T3-Dashboards-Interfaces.md",label:"🖥️ T3 Dashboards & Interfaces"},
  {id:"T4",sphere:"T",file:"⚙️-T4-Infra-Reproducibility.md",label:"⚙️ T4 Infra & Reproducibility"}
];

const GITHUB_RAW = "https://raw.githubusercontent.com/K-RnD-Lab/SPHERE-";
const SPHERE_MAP = {S:"I-SCIENCE",E:"II-ENTREPRENEURSHIP",T:"III-TECHNOLOGY"};
const nav = document.getElementById("questNav");
const content = document.getElementById("mdContent");

function buildNav(){
  const groups = {S:[],E:[],T:[]};
  quests.forEach(q => groups[q.sphere].push(q));
  const labels = {S:"Science",E:"Entrepreneurship",T:"Technology"};
  let html = "";
  Object.entries(groups).forEach(([sphere,items]) => {
    html += `<div class="nav-${sphere}"><h3>${labels[sphere]}</h3>`;
    items.forEach(q => {
      html += `<a href="#${q.id}" data-file="${q.file}" data-sphere="${q.sphere}">${q.label}</a>`;
    });
    html += `</div>`;
  });
  nav.innerHTML = html;
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      nav.querySelectorAll("a").forEach(x => x.classList.remove("active"));
      a.classList.add("active");
      loadQuest(a.dataset.file, a.dataset.sphere);
    });
  });
}

async function loadQuest(file, sphere){
  const repo = `SPHERE-${SPHERE_MAP[sphere]}`;
  const url = `${GITHUB_RAW}${sphere === "S" ? "I-SCIENCE" : sphere === "E" ? "II-ENTREPRENEURSHIP" : "III-TECHNOLOGY"}/main/quests/${file}`;
  content.innerHTML = "<p style='color:var(--muted)'>Loading quest...</p>";
  try {
    const res = await fetch(url);
    if(!res.ok) throw new Error(res.status);
    const md = await res.text();
    content.innerHTML = marked.parse(md);
  } catch(err) {
    content.innerHTML = `<p style='color:var(--muted)'>Could not load quest. <a href="${url}" target="_blank" rel="noreferrer">Open raw file →</a></p>`;
  }
}

buildNav();

const hash = location.hash.slice(1);
if(hash){
  const q = quests.find(q => q.id === hash);
  if(q){
    const a = nav.querySelector(`a[href="#${q.id}"]`);
    if(a){ a.classList.add("active"); loadQuest(q.file, q.sphere); }
  }
}
