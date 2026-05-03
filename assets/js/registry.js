const studies = [
  // S1 — 🩺 Biomedical & Oncology
  {id:"S1-A",track:"S1",title:"🧬 PHYLO-GENOMICS",sphere:"S",status:"in-progress",methods:["scRNA-seq","spatial transcriptomics","phylogenomics"],summary:"Phylogenomic analysis pipeline for tumor microenvironment composition from single-cell and spatial data. Identifies immune cell subtypes and their spatial relationships in solid tumors.",date:"2026-04",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-A%20%C2%B7%20%F0%9F%A7%AC%20PHYLO-GENOMICS"},
  {id:"S1-B",track:"S1",title:"🔬 PHYLO-RNA",sphere:"S",status:"in-progress",methods:["RNA-seq","differential expression","network analysis"],summary:"RNA-level phylogenetic profiling for transcriptomic classification and biomarker discovery across cancer types.",date:"2026-04",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-B%20%C2%B7%20%F0%9F%94%AC%20PHYLO-RNA"},
  {id:"S1-C",track:"S1",title:"💊 PHYLO-DRUG",sphere:"S",status:"planned",methods:["drug repurposing","chemoinformatics","docking"],summary:"Computational drug repurposing framework using phylogenetic conservation and chemoinformatic similarity scoring.",date:"2026-05",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-C%20%C2%B7%20%F0%9F%92%8A%20PHYLO-DRUG"},
  {id:"S1-D",track:"S1",title:"🧪 PHYLO-LNP",sphere:"S",status:"planned",methods:["LNP formulation","delivery modeling","molecular dynamics"],summary:"Lipid nanoparticle delivery modeling for nucleic acid therapeutics. Computational pipeline for formulation optimization.",date:"2026-06",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-D%20%C2%B7%20%F0%9F%A7%AA%20PHYLO-LNP"},
  {id:"S1-E",track:"S1",title:"🩸 PHYLO-BIOMARKERS",sphere:"S",status:"planned",methods:["biomarker panels","clinical data","survival analysis"],summary:"Computational panel of blood-based biomarkers integrating proteomic and clinical data for early cancer detection.",date:"2026-06",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-E%20%C2%B7%20%F0%9F%A9%B8%20PHYLO-BIOMARKERS"},
  {id:"S1-F",track:"S1",title:"🧠 PHYLO-RARE",sphere:"S",status:"planned",methods:["rare disease genomics","variant prioritization","HPO"],summary:"Phylogenetic approach to rare disease variant prioritization using Human Phenotype Ontology and cross-species conservation.",date:"2026-07",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-F%20%C2%B7%20%F0%9F%A7%A0%20PHYLO-RARE"},
  // S2 — 🌿 Plant Science & Phytochemistry
  {id:"S2-A",track:"S2",title:"🌱 PHYLO-CROP",sphere:"S",status:"in-progress",methods:["remote sensing","time-series analysis","deep learning"],summary:"Pipeline for predicting regional crop yields using satellite imagery and meteorological data. Focus on wheat and corn in Eastern Europe.",date:"2026-03",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S2%20%E2%80%94%20%F0%9F%8C%BF%20Plant%20Science%20%26%20Phytochemistry"},
  {id:"S2-B",track:"S2",title:"🧫 PHYLO-PHYTO",sphere:"S",status:"planned",methods:["LC-MS/MS","GNPS","molecular networking"],summary:"Open workflow for phytochemical identification and annotation from mass spectrometry data. Uses molecular networking for dereplication.",date:"2026-05",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S2%20%E2%80%94%20%F0%9F%8C%BF%20Plant%20Science%20%26%20Phytochemistry"},
  // S3 — 🌾 Agricultural Biology & Biofertilizers
  {id:"S3-A",track:"S3",title:"🌾 PHYLO-AGBIO",sphere:"S",status:"planned",methods:["microbiome","biofertilizer screening","field trials"],summary:"Computational framework for biofertilizer candidate screening based on soil microbiome profiling and plant growth promotion scoring.",date:"2026-06",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S3%20%E2%80%94%20%F0%9F%8C%BE%20Agricultural%20Biology%20%26%20Biofertilizers"},
  // S4 — ⚗️ Biochemistry & Metabolomics
  {id:"S4-A",track:"S4",title:"⚗️ PHYLO-METABO",sphere:"S",status:"in-progress",methods:["metabolomics","GNPS","molecular networking"],summary:"Open workflow for metabolite identification and annotation from mass spectrometry data. Uses molecular networking for dereplication and novel compound discovery.",date:"2026-04",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S4%20%E2%80%94%20%E2%9A%97%EF%B8%8F%20Biochemistry%20%26%20Metabolomics"},
  // S5 — 🧠 Neuroscience & Aging
  {id:"S5-A",track:"S5",title:"🧠 PHYLO-NEURO",sphere:"S",status:"planned",methods:["EEG","signal processing","transformer models"],summary:"Classification of EEG patterns for sleep stage detection and epileptic seizure prediction. Planned as a reproducible benchmark study.",date:"2026-05",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S5%20%E2%80%94%20%F0%9F%A7%A0%20Neuroscience%20%26%20Aging"},
  // S6 — 🌍 Ecology & Environmental Science
  {id:"S6-A",track:"S6",title:"🌍 PHYLO-ECO",sphere:"S",status:"completed",methods:["GBIF API","Shannon index","interactive visualization"],summary:"Interactive dashboard computing biodiversity indices from GBIF occurrence data. Covers species richness, evenness, and Simpson diversity at regional scales.",date:"2026-03",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S6%20%E2%80%94%20%F0%9F%8C%8D%20Ecology%20%26%20Environmental%20Science"},
  // S7 — 📚 K Life OS
  {id:"S7-A",track:"S7",title:"📚 PHYLO-LIFE",sphere:"S",status:"planned",methods:["epigenetic clocks","proteomics","survival analysis"],summary:"Computational panel of aging biomarkers integrating epigenetic, proteomic, and clinical data. Aims for reproducible biological age estimation.",date:"2026-06",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  // E1 — 💼 Venture, Product & Opportunity Systems
  {id:"E1-A",track:"E1",title:"💡 PHYLO-VENTURE",sphere:"E",status:"completed",methods:["customer interviews","hypothesis testing","lean canvas"],summary:"Applied research framework for validating early-stage startup ideas. Structured interview scripts, experiment trackers, and decision trees for go/no-go.",date:"2026-04",repo:"https://github.com/K-RnD-Lab/SPHERE-II-ENTREPRENEURSHIP/tree/main/E1%20-%20Venture%2C%20Product%20%26%20Opportunity%20Systems"},
  // E2 — 📊 Market, Audience & Behavioral Intelligence
  {id:"E2-A",track:"E2",title:"📊 PHYLO-MARKET",sphere:"E",status:"in-progress",methods:["web scraping","NLP","market sizing"],summary:"Automated sector analysis tool that maps market size, competition, and entry points for SET-aligned venture directions.",date:"2026-04",repo:"https://github.com/K-RnD-Lab/SPHERE-II-ENTREPRENEURSHIP/tree/main/E2%20-%20Market%2C%20Audience%20%26%20Behavioral%20Intelligence"},
  // E3 — 🤝 Ecosystem, Partnerships & External Signals
  {id:"E3-A",track:"E3",title:"🤝 PHYLO-ECOSYS",sphere:"E",status:"planned",methods:["network analysis","stakeholder mapping","visualization"],summary:"Atlas of innovation ecosystems mapping actors, resources, and connection patterns across science, entrepreneurship, and technology communities.",date:"2026-06",repo:"https://github.com/K-RnD-Lab/SPHERE-II-ENTREPRENEURSHIP/tree/main/E3%20-%20Ecosystem%2C%20Partnerships%20%26%20External%20Signals"},
  // E4 — 📋 Applied Investigations & Public Cases
  {id:"E4-A",track:"E4",title:"📋 PHYLO-CASES",sphere:"E",status:"planned",methods:["case studies","public data","benchmarking"],summary:"Applied investigation framework for documenting and benchmarking public venture cases across SET domains.",date:"2026-07",repo:"https://github.com/K-RnD-Lab/SPHERE-II-ENTREPRENEURSHIP/tree/main/E4%20-%20Applied%20Investigations%20%26%20Public%20Cases"},
  // T1 — 🤖 Research Tools, ML & Analytical Engines
  {id:"T1-A",track:"T1",title:"🤖 PHYLO-SCORE",sphere:"T",status:"completed",methods:["rubric design","inter-rater reliability","open scoring"],summary:"Open scoring system for evaluating research readiness of computational projects. Covers data quality, method transparency, and reproducibility.",date:"2026-03",repo:"https://github.com/K-RnD-Lab/SPHERE-III-TECHNOLOGY/tree/main/T1%20-%20Research%20Tools%2C%20ML%20%26%20Analytical%20Engines"},
  // T2 — 💻 Reproducibility, Scoring & Method Systems
  {id:"T2-A",track:"T2",title:"💻 PHYLO-DASH",sphere:"T",status:"completed",methods:["Plotly Dash","Python","GitHub API"],summary:"Dashboard tracking lab productivity metrics: study count, domain coverage, method diversity, and reproducibility scores. Auto-updates from GitHub.",date:"2026-04",repo:"https://github.com/K-RnD-Lab/SPHERE-III-TECHNOLOGY/tree/main/T2%20-%20Reproducibility%2C%20Scoring%20%26%20Method%20Systems"},
  // T3 — 🖥️ Dashboards, Interfaces & Open Infrastructure
  {id:"T3-A",track:"T3",title:"🖥️ PHYLO-INFRA",sphere:"T",status:"in-progress",methods:["Docker","GitHub Actions","Binder","Zenodo"],summary:"Toolkit for making computational studies reproducible: containerized environments, CI/CD for analysis, and automated archival to Zenodo.",date:"2026-05",repo:"https://github.com/K-RnD-Lab/SPHERE-III-TECHNOLOGY/tree/main/T3%20-%20Dashboards%2C%20Interfaces%20%26%20Open%20Infrastructure"}
];

const trackMeta = {
  "S1":{emoji:"🩺",label:"Biomedical & Oncology"},
  "S2":{emoji:"🌿",label:"Plant Science & Phytochemistry"},
  "S3":{emoji:"🌾",label:"Agricultural Biology & Biofertilizers"},
  "S4":{emoji:"⚗️",label:"Biochemistry & Metabolomics"},
  "S5":{emoji:"🧠",label:"Neuroscience & Aging"},
  "S6":{emoji:"🌍",label:"Ecology & Environmental Science"},
  "S7":{emoji:"📚",label:"K Life OS"},
  "E1":{emoji:"💼",label:"Venture, Product & Opportunity"},
  "E2":{emoji:"📊",label:"Market, Audience & Behavioral"},
  "E3":{emoji:"🤝",label:"Ecosystem, Partnerships & Signals"},
  "E4":{emoji:"📋",label:"Applied Investigations & Cases"},
  "T1":{emoji:"🤖",label:"Research Tools, ML & Analytical"},
  "T2":{emoji:"💻",label:"Reproducibility, Scoring & Methods"},
  "T3":{emoji:"🖥️",label:"Dashboards, Interfaces & Infra"}
};

const statusIcons = {completed:"✅", "in-progress":"🔄", planned:"📋"};

function renderStats(){
  const completed = studies.filter(s=>s.status==="completed").length;
  const inProgress = studies.filter(s=>s.status==="in-progress").length;
  const planned = studies.filter(s=>s.status==="planned").length;
  const tracks = [...new Set(studies.map(s=>s.track))].length;
  document.getElementById("statsRow").innerHTML = `
    <div class="stat-card science"><div class="stat-value">${studies.length}</div><div class="stat-label">Studies</div></div>
    <div class="stat-card"><div class="stat-value">${tracks}</div><div class="stat-label">Tracks</div></div>
    <div class="stat-card"><div class="stat-value">${completed}</div><div class="stat-label">✅ Completed</div></div>
    <div class="stat-card"><div class="stat-value">${inProgress}</div><div class="stat-label">🔄 In Progress</div></div>
    <div class="stat-card"><div class="stat-value">${planned}</div><div class="stat-label">📋 Planned</div></div>
  `;
}

function getFilteredBase(){
  const sphere = document.getElementById("sphereFilter").value;
  return sphere==="all" ? studies : studies.filter(s=>s.sphere===sphere);
}

function populateFilters(){
  const base = getFilteredBase();
  const curTrack = document.getElementById("trackFilter").value;
  const curStatus = document.getElementById("statusFilter").value;

  const tracks = [...new Set(base.map(s=>s.track))].sort();
  const statuses = [...new Set(base.map(s=>s.status))].sort();

  const trackSel = document.getElementById("trackFilter");
  trackSel.innerHTML = '<option value="all">All Tracks</option>';
  tracks.forEach(t=>{
    const opt = document.createElement("option");
    const meta = trackMeta[t]||{emoji:"",label:t};
    opt.value = t; opt.textContent = `${meta.emoji} ${t} ${meta.label}`;
    if(t===curTrack) opt.selected = true;
    trackSel.appendChild(opt);
  });

  const statusSel = document.getElementById("statusFilter");
  statusSel.innerHTML = '<option value="all">All Statuses</option>';
  statuses.forEach(st=>{
    const opt = document.createElement("option");
    opt.value = st; opt.textContent = `${statusIcons[st]||""} ${st.replace("-"," ")}`;
    if(st===curStatus) opt.selected = true;
    statusSel.appendChild(opt);
  });
}

function renderStudies(){
  const query = document.getElementById("searchInput").value.toLowerCase();
  const track = document.getElementById("trackFilter").value;
  const sphere = document.getElementById("sphereFilter").value;
  const status = document.getElementById("statusFilter").value;

  const filtered = studies.filter(s=>{
    if(track!=="all" && s.track!==track) return false;
    if(sphere!=="all" && s.sphere!==sphere) return false;
    if(status!=="all" && s.status!==status) return false;
    if(query){
      const hay = [s.title,s.track,s.summary,...s.methods].join(" ").toLowerCase();
      if(!hay.includes(query)) return false;
    }
    return true;
  });

  const grid = document.getElementById("studyGrid");
  if(!filtered.length){
    grid.innerHTML = '<p style="text-align:center;color:var(--muted);padding:28px">No studies match the current filters.</p>';
    return;
  }

  grid.innerHTML = filtered.map(s=>{
    const si = statusIcons[s.status]||"";
    const meta = trackMeta[s.track]||{emoji:"",label:s.track};
    return `
    <article class="study-card">
      <div class="study-topline">
        <span class="chip chip-${s.sphere.toLowerCase()}">${s.sphere}</span>
        <span class="chip" style="background:var(--panel);color:var(--ink)">${meta.emoji} ${s.track}</span>
        <span class="chip subtle">${si} ${s.status.replace("-"," ")}</span>
      </div>
      <h3>${s.id} · ${s.title}</h3>
      <p>${s.summary}</p>
      <div class="study-meta">
        <div><strong>Methods:</strong> ${s.methods.join(", ")}</div>
        <div><strong>Date:</strong> ${s.date}</div>
      </div>
      <a href="${s.repo}" target="_blank" rel="noreferrer" class="link-pill">Open Repo →</a>
    </article>`;
  }).join("");
}

document.getElementById("searchInput").addEventListener("input",renderStudies);
document.getElementById("trackFilter").addEventListener("change",renderStudies);
document.getElementById("sphereFilter").addEventListener("change",()=>{populateFilters();renderStudies();});
document.getElementById("statusFilter").addEventListener("change",renderStudies);

renderStats();
populateFilters();
renderStudies();
