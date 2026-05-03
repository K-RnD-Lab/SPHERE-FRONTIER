const studies = [
  {id:"S1",domain:"Oncology",title:"Tumor Microenvironment Scoring",sphere:"S",status:"completed",methods:["scRNA-seq","spatial transcriptomics","machine learning"],summary:"Computational scoring of tumor microenvironment composition from single-cell and spatial data. Identifies immune cell subtypes and their spatial relationships in solid tumors.",date:"2026-04",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE"},
  {id:"S2",domain:"Plant Science",title:"Crop Yield Prediction Pipeline",sphere:"S",status:"in-progress",methods:["remote sensing","time-series analysis","deep learning"],summary:"Pipeline for predicting regional crop yields using satellite imagery and meteorological data. Focus on wheat and corn in Eastern Europe.",date:"2026-03",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE"},
  {id:"S3",domain:"Metabolomics",title:"Metabolite Identification Workflow",sphere:"S",status:"in-progress",methods:["LC-MS/MS","GNPS","molecular networking"],summary:"Open workflow for metabolite identification and annotation from mass spectrometry data. Uses molecular networking for dereplication and novel compound discovery.",date:"2026-04",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE"},
  {id:"S4",domain:"Neuroscience",title:"EEG Pattern Classification",sphere:"S",status:"planned",methods:["EEG","signal processing","transformer models"],summary:"Classification of EEG patterns for sleep stage detection and epileptic seizure prediction. Planned as a reproducible benchmark study.",date:"2026-05",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE"},
  {id:"S5",domain:"Ecology",title:"Biodiversity Index Dashboard",sphere:"S",status:"completed",methods:["GBIF API","Shannon index","interactive visualization"],summary:"Interactive dashboard computing biodiversity indices from GBIF occurrence data. Covers species richness, evenness, and Simpson diversity at regional scales.",date:"2026-03",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE"},
  {id:"S6",domain:"Life Systems",title:"Aging Biomarker Panel",sphere:"S",status:"planned",methods:["epigenetic clocks","proteomics","survival analysis"],summary:"Computational panel of aging biomarkers integrating epigenetic, proteomic, and clinical data. Aims for reproducible biological age estimation.",date:"2026-06",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE"},
  {id:"E1",domain:"Venture Design",title:"Startup Validation Framework",sphere:"E",status:"completed",methods:["customer interviews","hypothesis testing","lean canvas"],summary:"Applied research framework for validating early-stage startup ideas. Structured interview scripts, experiment trackers, and decision trees for go/no-go.",date:"2026-04",repo:"https://github.com/K-RnD-Lab/SPHERE-II-ENTREPRENEURSHIP"},
  {id:"E2",domain:"Market Intelligence",title:"Sector Opportunity Mapper",sphere:"E",status:"in-progress",methods:["web scraping","NLP","market sizing"],summary:"Automated sector analysis tool that maps market size, competition, and entry points for SET-aligned venture directions.",date:"2026-04",repo:"https://github.com/K-RnD-Lab/SPHERE-II-ENTREPRENEURSHIP"},
  {id:"E3",domain:"Ecosystem Mapping",title:"Innovation Ecosystem Atlas",sphere:"E",status:"planned",methods:["network analysis","stakeholder mapping","visualization"],summary:"Atlas of innovation ecosystems mapping actors, resources, and connection patterns across science, entrepreneurship, and technology communities.",date:"2026-06",repo:"https://github.com/K-RnD-Lab/SPHERE-II-ENTREPRENEURSHIP"},
  {id:"T1",domain:"Scoring Systems",title:"Research Readiness Score",sphere:"T",status:"completed",methods:["rubric design","inter-rater reliability","open scoring"],summary:"Open scoring system for evaluating research readiness of computational projects. Covers data quality, method transparency, and reproducibility.",date:"2026-03",repo:"https://github.com/K-RnD-Lab/SPHERE-III-TECHNOLOGY"},
  {id:"T2",domain:"Dashboards",title:"Lab Metrics Dashboard",sphere:"T",status:"completed",methods:["Plotly Dash","Python","GitHub API"],summary:"Dashboard tracking lab productivity metrics: study count, domain coverage, method diversity, and reproducibility scores. Auto-updates from GitHub.",date:"2026-04",repo:"https://github.com/K-RnD-Lab/SPHERE-III-TECHNOLOGY"},
  {id:"T3",domain:"Infrastructure",title:"Reproducibility Toolkit",sphere:"T",status:"in-progress",methods:["Docker","GitHub Actions","Binder","Zenodo"],summary:"Toolkit for making computational studies reproducible: containerized environments, CI/CD for analysis, and automated archival to Zenodo.",date:"2026-05",repo:"https://github.com/K-RnD-Lab/SPHERE-III-TECHNOLOGY"}
];

const domainColors = {
  "Oncology":"#c2185b","Plant Science":"#2e7d32","Metabolomics":"#6a1b9a","Neuroscience":"#0277bd",
  "Ecology":"#1b5e20","Life Systems":"#00695c","Venture Design":"#e65100","Market Intelligence":"#bf360c",
  "Ecosystem Mapping":"#827717","Scoring Systems":"#1565c0","Dashboards":"#283593","Infrastructure":"#37474f"
};

const statusIcons = {completed:"✅", "in-progress":"🔄", planned:"📋"};

function renderStats(){
  const completed = studies.filter(s=>s.status==="completed").length;
  const inProgress = studies.filter(s=>s.status==="in-progress").length;
  const planned = studies.filter(s=>s.status==="planned").length;
  const domains = [...new Set(studies.map(s=>s.domain))].length;
  document.getElementById("statsRow").innerHTML = `
    <div class="stat-card science"><div class="stat-value">${studies.length}</div><div class="stat-label">Total Studies</div></div>
    <div class="stat-card"><div class="stat-value">${completed}</div><div class="stat-label">Completed</div></div>
    <div class="stat-card"><div class="stat-value">${inProgress}</div><div class="stat-label">In Progress</div></div>
    <div class="stat-card"><div class="stat-value">${planned}</div><div class="stat-label">Planned</div></div>
    <div class="stat-card"><div class="stat-value">${domains}</div><div class="stat-label">Domains</div></div>
  `;
}

function populateDomainFilter(){
  const domains = [...new Set(studies.map(s=>s.domain))].sort();
  const sel = document.getElementById("domainFilter");
  domains.forEach(d=>{
    const opt = document.createElement("option");
    opt.value = d; opt.textContent = d;
    sel.appendChild(opt);
  });
}

function renderStudies(){
  const query = document.getElementById("searchInput").value.toLowerCase();
  const domain = document.getElementById("domainFilter").value;
  const sphere = document.getElementById("sphereFilter").value;
  const status = document.getElementById("statusFilter").value;

  const filtered = studies.filter(s=>{
    if(domain!=="all" && s.domain!==domain) return false;
    if(sphere!=="all" && s.sphere!==sphere) return false;
    if(status!=="all" && s.status!==status) return false;
    if(query){
      const hay = [s.title,s.domain,s.summary,...s.methods].join(" ").toLowerCase();
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
    const dc = domainColors[s.domain]||"#666";
    const si = statusIcons[s.status]||"";
    return `
    <article class="study-card">
      <div class="study-topline">
        <span class="chip" style="background:${dc}18;color:${dc}">${s.domain}</span>
        <span class="chip subtle">${si} ${s.status.replace("-"," ")}</span>
        <span class="chip chip-${s.sphere.toLowerCase()}">${s.sphere}</span>
      </div>
      <h3>${s.title}</h3>
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
document.getElementById("domainFilter").addEventListener("change",renderStudies);
document.getElementById("sphereFilter").addEventListener("change",renderStudies);
document.getElementById("statusFilter").addEventListener("change",renderStudies);

renderStats();
populateDomainFilter();
renderStudies();
