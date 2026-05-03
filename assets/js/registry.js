const studies = [
  // ── SCIENCE ──
  {id:"SPHERE-I-SCIENCE",track:"Root",combo:"S",artifact:"Repository",validation:"Taxonomy",delivery:"GitHub",title:"SPHERE-I-SCIENCE",summary:"Computational science research across oncology, plant science, metabolomics, neuroscience, ecology, and life systems.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE"},
  {id:"S1",track:"S1",combo:"S",artifact:"Lane",validation:"Taxonomy",delivery:"GitHub",title:"🩺 S1 Biomedical & Oncology",summary:"S1 is the biomedical and translational oncology block inside SPHERE-I-SCIENCE.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology"},
  {id:"S1-A-R1",track:"S1-A",combo:"S+T",artifact:"Research Tool",validation:"Prototype",delivery:"GitHub",title:"OpenVariant: An Open-Source Variant Pathogenicity Classifier",summary:"AUC-ROC = 0.942 (XGBoost) | AUC-ROC = 0.935 (AlphaMissense placeholder) | N = 1,804 (⚠ SIMULATED)",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-A%20%C2%B7%20%F0%9F%A7%AC%20PHYLO-GENOMICS"},
  {id:"S1-B-R1",track:"S1-B",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"Tumor Suppressor miRNAs Silenced in BRCA2-Mutant Breast Cancer",summary:"25 significant DE miRNAs identified (padj ≤ 0.05, |log2FC| ≥ 0.3) | N = 300 (13 BRCA2-mutant, 287 wildtype) — ⚠️ SIMULATED",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-B%20%C2%B7%20%F0%9F%94%AC%20PHYLO-RNA"},
  {id:"S1-B-R2",track:"S1-B",combo:"S+E+T",artifact:"Research Tool",validation:"Prototype",delivery:"GitHub",title:"siRNA Synthetic Lethal Targets in TP53-Mutant Lung Adenocarcinoma",summary:"PLK1 and CDK1 recovered as positive clinical controls | N = 566 (295 TP53-mut + 271 WT) [SIMULATED]",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-B%20%C2%B7%20%F0%9F%94%AC%20PHYLO-RNA"},
  {id:"S1-B-R3",track:"S1-B",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"lncRNA Networks Controlling TREM2-Dependent Microglial Inflammation",summary:"Simulated iPSC-derived microglia RNA-seq (TREM2-KO vs WT) | 2 independent simulated datasets × 12 samples each",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-B%20%C2%B7%20%F0%9F%94%AC%20PHYLO-RNA"},
  {id:"S1-C-R1",track:"S1-C",combo:"S+T",artifact:"Research Tool",validation:"Prototype",delivery:"GitHub",title:"Small Molecules Targeting FGFR3 mRNA for Bladder Cancer",summary:"Top-2 RNA-binding score = 0.793 / 0.789 (SIMULATED) | N = 200 compounds (SIMULATED virtual screen)",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-C%20%C2%B7%20%F0%9F%92%8A%20PHYLO-DRUG"},
  {id:"S1-D-R1",track:"S1-D",combo:"S+T",artifact:"Research Tool",validation:"Prototype",delivery:"GitHub",title:"ML Prediction of Protein Corona in LNPs from Physicochemical Properties",summary:"Macro-OvR AUC = 0.791 (reported) / 0.836 [SIMULATED-CIRCULAR] | N = 19,200 (LNPDB, simulated)",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-D%20%C2%B7%20%F0%9F%A7%AA%20PHYLO-LNP"},
  {id:"S1-D-R2a",track:"S1-D",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"ML Prediction of Protein Corona in LNPs (Hypothesis)",summary:"XGBoost AUC = 0.877 (5-fold CV, simulated; target spec: 0.791) | Corona PoC AUC = 0.834 (LOOCV) | N = 19,200 (SIMULATED)",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-D%20%C2%B7%20%F0%9F%A7%AA%20PHYLO-LNP"},
  {id:"S1-D-R2b",track:"S1-D",combo:"S+T",artifact:"Research Tool",validation:"Prototype",delivery:"GitHub",title:"Predicting Protein Corona Remodeling Under Physiological Flow",summary:"RF Train R² = 0.781 | LOOCV R² = −0.281 (underpowered, N=32) | N = 32 matched pairs (SIMULATED)",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-D%20%C2%B7%20%F0%9F%A7%AA%20PHYLO-LNP"},
  {id:"S1-D-R3",track:"S1-D",combo:"S+T",artifact:"Research Tool",validation:"Prototype",delivery:"GitHub",title:"Ionizable Lipid Properties Predicting ApoE Enrichment for BBB Crossing",summary:"LOO-CV R² = 0.542 | Pearson r = 0.780, MAE = 4.9% | N = 22 (SIMULATED — literature-grounded)",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-D%20%C2%B7%20%F0%9F%A7%AA%20PHYLO-LNP"},
  {id:"S1-D-R4a",track:"S1-D",combo:"S+T",artifact:"Research Tool",validation:"Prototype",delivery:"GitHub",title:"AutoCorona: NLP Pipeline for Automated LNP Protein Corona Data Extraction",summary:"F1 = 0.71 (proteinsource) | N = 43 entries (22 GS + 21 new)",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-D%20%C2%B7%20%F0%9F%A7%AA%20PHYLO-LNP"},
  {id:"S1-D-R4b",track:"S1-D",combo:"S+T",artifact:"Research Tool",validation:"Prototype",delivery:"GitHub",title:"K R&D Lab — LNP Corona Research Projects",summary:"Demo space for LNP corona research projects aggregation and visualization.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-D%20%C2%B7%20%F0%9F%A7%AA%20PHYLO-LNP"},
  {id:"S1-D-R4c",track:"S1-D",combo:"S",artifact:"Hypothesis",validation:"Scaffold",delivery:"GitHub",title:"ML Prediction of Protein Corona in LNPs (Scaffold)",summary:"XGBoost AUC = 0.791 (5-fold CV) | N = 19,200 transfection records",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-D%20%C2%B7%20%F0%9F%A7%AA%20PHYLO-LNP"},
  {id:"S1-E-R1a",track:"S1-E",combo:"S+E",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"ML Prediction of LNP Transfection Efficacy",summary:"XGBoost AUC = 0.782 (5-fold CV) | N = 19,200 (SIMULATED — based on LNPDB statistics)",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-E%20%C2%B7%20%F0%9F%A9%B8%20PHYLO-BIOMARKERS"},
  {id:"S1-E-R1b",track:"S1-E",combo:"S+E",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"Protein Corona Fingerprinting as Liquid Biopsy Biomarker",summary:"RF GroupKFold AUC = 0.993 ± 0.005 (tissue-level only) | N = 576 samples × 8,843 proteins (SIMULATED — CPTAC)",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S1%20%E2%80%94%20%F0%9F%A9%BA%20%20Biomedical%20%26%20Oncology/S1-E%20%C2%B7%20%F0%9F%A9%B8%20PHYLO-BIOMARKERS"},
  {id:"S2",track:"S2",combo:"S",artifact:"Lane",validation:"Taxonomy",delivery:"GitHub",title:"🌿 S2 Plant Science & Phytochemistry",summary:"S2 covers plant-intrinsic biology rather than agricultural intervention systems.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S2%20%E2%80%94%20%F0%9F%8C%BF%20Plant%20Science%20%26%20Phytochemistry"},
  {id:"S3",track:"S3",combo:"S+T",artifact:"Lane",validation:"Taxonomy",delivery:"GitHub",title:"🌾 S3 Agricultural Biology & Biofertilizers",summary:"S3 covers applied agro-biology and intervention logic around crop systems.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S3%20%E2%80%94%20%F0%9F%8C%BE%20Agricultural%20Biology%20%26%20Biofertilizers"},
  {id:"S4",track:"S4",combo:"S",artifact:"Lane",validation:"Taxonomy",delivery:"GitHub",title:"⚗️ S4 Biochemistry & Metabolomics",summary:"S4 is the cross-organism chemistry and mechanism lane inside SPHERE-I-SCIENCE.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S4%20%E2%80%94%20%E2%9A%97%EF%B8%8F%20Biochemistry%20%26%20Metabolomics"},
  {id:"S5",track:"S5",combo:"S+T",artifact:"Lane",validation:"Taxonomy",delivery:"GitHub",title:"🧠 S5 Neuroscience & Aging",summary:"S5 covers brain, cognition, neuroinflammation, and computational aging questions.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S5%20%E2%80%94%20%F0%9F%A7%A0%20Neuroscience%20%26%20Aging"},
  {id:"S6",track:"S6",combo:"S",artifact:"Lane",validation:"Taxonomy",delivery:"GitHub",title:"🌍 S6 Ecology & Environmental Science",summary:"S6 covers environmental systems rather than organism-intrinsic molecular biology.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S6%20%E2%80%94%20%F0%9F%8C%8D%20Ecology%20%26%20Environmental%20Science"},
  {id:"S7",track:"S7",combo:"S+T",artifact:"Lane",validation:"Taxonomy",delivery:"GitHub",title:"📚 S7 K Life OS",summary:"Science-facing lane for measurable life systems, cognition, adaptive training, self-tracking, and longitudinal human-pattern research.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-A",track:"S7-A",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"🚀 S7-A Creativity or Self-Expression",summary:"A sub-lane inside 📚 S7 — K Life OS.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-B",track:"S7-B",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"👨‍🏫 S7-B Personal Development or Self-Care",summary:"A sub-lane inside 📚 S7 — K Life OS.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-C",track:"S7-C",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"🏠 S7-C Domestic Life or Household",summary:"A sub-lane inside 📚 S7 — K Life OS.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-D",track:"S7-D",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"💵 S7-D Finance",summary:"A sub-lane inside 📚 S7 — K Life OS.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-E",track:"S7-E",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"🤝 S7-E Parenting or Family",summary:"A sub-lane inside 📚 S7 — K Life OS.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-F",track:"S7-F",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"📚 S7-F Recreation and Hobbies",summary:"A sub-lane inside 📚 S7 — K Life OS.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-G",track:"S7-G",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"👤 S7-G Community Involvement",summary:"A sub-lane inside 📚 S7 — K Life OS.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-H",track:"S7-H",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"🌳 S7-H Physical Health",summary:"A sub-lane inside 📚 S7 — K Life OS.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-I-R1",track:"S7-I",combo:"S+T",artifact:"Research Tool",validation:"Live",delivery:"GitHub",title:"R1 Master Prep Analytics",summary:"A combined research case for magistracy preparation, learning systems, cognition, live dashboarding, and the actual trainer workspace.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-I",track:"S7-I",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"🔎 S7-I Career or Education",summary:"A sub-lane inside 📚 S7 — K Life OS.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-J",track:"S7-J",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"🌿 S7-J Environmental or Charity",summary:"A sub-lane inside 📚 S7 — K Life OS.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-K",track:"S7-K",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"👥 S7-K Personal Relationship",summary:"A sub-lane inside 📚 S7 — K Life OS.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-L",track:"S7-L",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"🧘 S7-L Spirituality",summary:"A sub-lane inside 📚 S7 — K Life OS.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  {id:"S7-M",track:"S7-M",combo:"S",artifact:"Hypothesis",validation:"Exploratory",delivery:"GitHub",title:"🧭 S7-M Longitudinal Reviews & Life Wheel Synthesis",summary:"A meta-lane inside 📚 S7 — K Life OS.",repo:"https://github.com/K-RnD-Lab/SPHERE-I-SCIENCE/tree/main/S7%20%E2%80%94%20%F0%9F%93%9A%20K%20Life%20OS"},
  // ── ENTREPRENEURSHIP ──
  {id:"SPHERE-II-ENTREPRENEURSHIP",track:"Root",combo:"E",artifact:"Repository",validation:"Taxonomy",delivery:"GitHub",title:"SPHERE-II-ENTREPRENEURSHIP",summary:"Applied research for venture design, market intelligence, ecosystem mapping, and public cases.",repo:"https://github.com/K-RnD-Lab/SPHERE-II-ENTREPRENEURSHIP"},
  {id:"E1-R1",track:"E1",combo:"S+E",artifact:"Venture Case",validation:"Exploratory",delivery:"GitHub",title:"R1a Lab-to-Market Opportunity Map",summary:"Which translational opportunity spaces are the most plausible first commercial or collaboration paths for K R&D Lab outputs?",repo:"https://github.com/K-RnD-Lab/SPHERE-II-ENTREPRENEURSHIP/tree/main/E1%20-%20Venture%2C%20Product%20%26%20Opportunity%20Systems"},
  {id:"E2-R1",track:"E2",combo:"S+E+T",artifact:"Venture Case",validation:"Scaffold",delivery:"GitHub",title:"R1a Translational Audience Segments",summary:"Which audience groups are most distinct and strategically relevant for K R&D Lab outputs across science, tooling, and public-facing artifacts?",repo:"https://github.com/K-RnD-Lab/SPHERE-II-ENTREPRENEURSHIP/tree/main/E2%20-%20Market%2C%20Audience%20%26%20Behavioral%20Intelligence"},
  {id:"E3-R1",track:"E3",combo:"S+E+T",artifact:"Public Case",validation:"Active Case",delivery:"GitHub",title:"R1a Bio-AI Translation Landscape",summary:"Which ecosystems, conferences, partners, and open communities matter most for translating K R&D Lab work?",repo:"https://github.com/K-RnD-Lab/SPHERE-II-ENTREPRENEURSHIP/tree/main/E3%20-%20Ecosystem%2C%20Partnerships%20%26%20External%20Signals"},
  {id:"E4-A",track:"E4",combo:"S+E+T",artifact:"Public Case",validation:"Active Case",delivery:"GitHub",title:"R1a Three-Sphere Research Ops Case",summary:"How should K R&D Lab structure research, tooling, and public-facing artifacts across GitHub and Hugging Face?",repo:"https://github.com/K-RnD-Lab/SPHERE-II-ENTREPRENEURSHIP/tree/main/E4%20-%20Applied%20Investigations%20%26%20Public%20Cases"},
  // ── TECHNOLOGY ──
  {id:"SPHERE-III-TECHNOLOGY",track:"Root",combo:"T",artifact:"Repository",validation:"Taxonomy",delivery:"GitHub",title:"SPHERE-III-TECHNOLOGY",summary:"Reusable research tools, scoring systems, dashboards, and open infrastructure for K R&D Lab.",repo:"https://github.com/K-RnD-Lab/SPHERE-III-TECHNOLOGY"},
  {id:"T1-R1",track:"T1",combo:"S+T",artifact:"Tool",validation:"Prototype",delivery:"GitHub",title:"R1a Bioinformatics Pipeline Template",summary:"How should K R&D Lab package reusable analytical engines so the same method can support multiple science studies?",repo:"https://github.com/K-RnD-Lab/SPHERE-III-TECHNOLOGY/tree/main/T1%20-%20Research%20Tools%2C%20ML%20%26%20Analytical%20Engines"},
  {id:"T2-R1",track:"T2",combo:"S+T",artifact:"Scoring System",validation:"Prototype",delivery:"GitHub",title:"R1a Study Readiness Scoring",summary:"How can K R&D Lab score whether a study is ready to move from exploratory computational work into a more reproducible stage?",repo:"https://github.com/K-RnD-Lab/SPHERE-III-TECHNOLOGY/tree/main/T2%20-%20Reproducibility%2C%20Scoring%20%26%20Method%20Systems"},
  {id:"T3-R1",track:"T3",combo:"S+E+T",artifact:"Dashboard",validation:"Live Prototype",delivery:"GitHub, Hugging Face",title:"R1a Study Registry Dashboard Template",summary:"What is the minimal reusable dashboard or registry pattern that can make K R&D Lab studies easier to browse, compare, and audit?",repo:"https://github.com/K-RnD-Lab/SPHERE-III-TECHNOLOGY/tree/main/T3%20-%20Dashboards%2C%20Interfaces%20%26%20Open%20Infrastructure"}
];

const comboColors = {"S":"var(--science)","E":"var(--entrepreneurship)","T":"var(--technology)","S+T":"var(--technology)","S+E":"var(--entrepreneurship)","S+E+T":"var(--accent)"};
const comboLabels = {"S":"\u{1FA7A} Science","E":"\u{1F680} Entrepreneurship","T":"\u{1F4BB} Technology","S+T":"\u{1FA7A}+\u{1F4BB}","S+E":"\u{1FA7A}+\u{1F680}","S+E+T":"\u{1FA7A}+\u{1F680}+\u{1F4BB}"};
const artifactIcons = {"Repository":"\u{1F4E6}","Lane":"\u{1F6E4}\uFE0F","Hypothesis":"\u{1F4A1}","Research Tool":"\u{1F527}","Venture Case":"\u{1F4C8}","Public Case":"\u{1F4CB}","Tool":"\u{1F6E0}\uFE0F","Scoring System":"\u{1F4CA}","Dashboard":"\u{1F5A5}\uFE0F"};
const validationIcons = {"Taxonomy":"\u{1F3F7}\uFE0F","Exploratory":"\u{1F52C}","Prototype":"\u{1F9EA}","Scaffold":"\u{1F3D7}\uFE0F","Active Case":"\u2705","Live":"\u{1F7E2}","Live Prototype":"\u{1F7E2}"};

function getHomeSphere(combo){return combo.split("+")[0]}
function getSphereEntries(sphere){return studies.filter(s=>getHomeSphere(s.combo)===sphere)}

function renderStats(){
  const sCount = getSphereEntries("S").length;
  const eCount = getSphereEntries("E").length;
  const tCount = getSphereEntries("T").length;
  const hybrids = studies.filter(s=>s.combo.includes("+")).length;
  document.getElementById("statsRow").innerHTML = `
    <div class="stat-card science"><div class="stat-value">${studies.length}</div><div class="stat-label">Total entries</div></div>
    <div class="stat-card"><div class="stat-value">${sCount}</div><div class="stat-label">\u{1FA7A} Science</div></div>
    <div class="stat-card"><div class="stat-value">${eCount}</div><div class="stat-label">\u{1F680} Entrepreneurship</div></div>
    <div class="stat-card"><div class="stat-value">${tCount}</div><div class="stat-label">\u{1F4BB} Technology</div></div>
    <div class="stat-card"><div class="stat-value">${hybrids}</div><div class="stat-label">\u{1F517} Hybrid lanes</div></div>
  `;
}

function getActiveFilters(exclude){
  const f = {sphere:document.getElementById("sphereFilter").value,
    combo:document.getElementById("comboFilter").value,
    track:document.getElementById("trackFilter").value,
    artifact:document.getElementById("artifactFilter").value,
    validation:document.getElementById("validationFilter").value};
  if(exclude) delete f[exclude];
  return f;
}

function applyFilters(arr,filters){
  return arr.filter(s=>{
    if(filters.sphere!=="all" && getHomeSphere(s.combo)!==filters.sphere) return false;
    if(filters.combo!=="all" && s.combo!==filters.combo) return false;
    if(filters.track!=="all" && s.track!==filters.track) return false;
    if(filters.artifact!=="all" && s.artifact!==filters.artifact) return false;
    if(filters.validation!=="all" && s.validation!==filters.validation) return false;
    return true;
  });
}

function initFilters(){
  const sphereOrder = {"S":0,"E":1,"T":2};
  const comboOrder = {"S":0,"E":1,"T":2,"S+T":3,"S+E":4,"S+E+T":5};

  const spheres = [...new Set(studies.map(s=>getHomeSphere(s.combo)))].sort((a,b)=>(sphereOrder[a]??99)-(sphereOrder[b]??99));
  const sphereSel = document.getElementById("sphereFilter");
  sphereSel.innerHTML = '<option value="all">Home sphere</option>';
  spheres.forEach(sp=>{const o=document.createElement("option");o.value=sp;o.textContent=comboLabels[sp]||sp;sphereSel.appendChild(o);});

  const combos = [...new Set(studies.map(s=>s.combo))].sort((a,b)=>(comboOrder[a]??99)-(comboOrder[b]??99));
  const comboSel = document.getElementById("comboFilter");
  comboSel.innerHTML = '<option value="all">Hybrid combo</option>';
  combos.forEach(c=>{const o=document.createElement("option");o.value=c;o.textContent=comboLabels[c]||c;comboSel.appendChild(o);});

  const tracks = [...new Set(studies.map(s=>s.track))].sort((a,b)=>{
    const sa=a.match(/^[SET]/)?a[0]:"Z",sb=b.match(/^[SET]/)?b[0]:"Z";
    if(sa!==sb)return sa<sb?-1:1;return a.localeCompare(b);
  });
  const trackSel = document.getElementById("trackFilter");
  trackSel.innerHTML = '<option value="all">All Tracks</option>';
  tracks.forEach(t=>{const o=document.createElement("option");o.value=t;o.textContent=t;trackSel.appendChild(o);});

  const artifacts = [...new Set(studies.map(s=>s.artifact))].sort();
  const artSel = document.getElementById("artifactFilter");
  artSel.innerHTML = '<option value="all">Artifact type</option>';
  artifacts.forEach(a=>{const o=document.createElement("option");o.value=a;o.textContent=`${artifactIcons[a]||""} ${a}`;artSel.appendChild(o);});

  const validations = [...new Set(studies.map(s=>s.validation))].sort();
  const valSel = document.getElementById("validationFilter");
  valSel.innerHTML = '<option value="all">Validation</option>';
  validations.forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=`${validationIcons[v]||""} ${v}`;valSel.appendChild(o);});
}

function populateFilters(changed){
  const filters = getActiveFilters(changed);
  const base = applyFilters(studies,filters);

  const curSphere = document.getElementById("sphereFilter").value;
  const curCombo = document.getElementById("comboFilter").value;
  const curTrack = document.getElementById("trackFilter").value;
  const curArtifact = document.getElementById("artifactFilter").value;
  const curValidation = document.getElementById("validationFilter").value;

  const sphereOrder = {"S":0,"E":1,"T":2};
  const comboOrder = {"S":0,"E":1,"T":2,"S+T":3,"S+E":4,"S+E+T":5};

  // Sphere
  if(changed!=="sphere"){
    const spheres = [...new Set(base.map(s=>getHomeSphere(s.combo)))].sort((a,b)=>(sphereOrder[a]??99)-(sphereOrder[b]??99));
    const sphereSel = document.getElementById("sphereFilter");
    const prev = spheres.includes(curSphere)?curSphere:"all";
    sphereSel.innerHTML = '<option value="all">Home sphere</option>';
    spheres.forEach(sp=>{
      const opt = document.createElement("option");
      opt.value = sp; opt.textContent = comboLabels[sp]||sp;
      if(sp===prev) opt.selected = true;
      sphereSel.appendChild(opt);
    });
  }

  // Combo
  if(changed!=="combo"){
    const combos = [...new Set(base.map(s=>s.combo))].sort((a,b)=>(comboOrder[a]??99)-(comboOrder[b]??99));
    const comboSel = document.getElementById("comboFilter");
    const prev = combos.includes(curCombo)?curCombo:"all";
    comboSel.innerHTML = '<option value="all">Hybrid combo</option>';
    combos.forEach(c=>{
      const opt = document.createElement("option");
      opt.value = c; opt.textContent = comboLabels[c]||c;
      if(c===prev) opt.selected = true;
      comboSel.appendChild(opt);
    });
  }

  // Track
  if(changed!=="track"){
    const tracks = [...new Set(base.map(s=>s.track))].sort((a,b)=>{
      const sa=a.match(/^[SET]/)?a[0]:"Z", sb=b.match(/^[SET]/)?b[0]:"Z";
      if(sa!==sb) return sa<sb?-1:1;
      return a.localeCompare(b);
    });
    const trackSel = document.getElementById("trackFilter");
    const prev = tracks.includes(curTrack)?curTrack:"all";
    trackSel.innerHTML = '<option value="all">All Tracks</option>';
    tracks.forEach(t=>{
      const opt = document.createElement("option");
      opt.value = t; opt.textContent = t;
      if(t===prev) opt.selected = true;
      trackSel.appendChild(opt);
    });
  }

  // Artifact
  if(changed!=="artifact"){
    const artifacts = [...new Set(base.map(s=>s.artifact))].sort();
    const artSel = document.getElementById("artifactFilter");
    const prev = artifacts.includes(curArtifact)?curArtifact:"all";
    artSel.innerHTML = '<option value="all">Artifact type</option>';
    artifacts.forEach(a=>{
      const opt = document.createElement("option");
      opt.value = a; opt.textContent = `${artifactIcons[a]||""} ${a}`;
      if(a===prev) opt.selected = true;
      artSel.appendChild(opt);
    });
  }

  // Validation
  if(changed!=="validation"){
    const validations = [...new Set(base.map(s=>s.validation))].sort();
    const valSel = document.getElementById("validationFilter");
    const prev = validations.includes(curValidation)?curValidation:"all";
    valSel.innerHTML = '<option value="all">Validation</option>';
    validations.forEach(v=>{
      const opt = document.createElement("option");
      opt.value = v; opt.textContent = `${validationIcons[v]||""} ${v}`;
      if(v===prev) opt.selected = true;
      valSel.appendChild(opt);
    });
  }
}

function renderStudies(){
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filters = getActiveFilters();
  const filtered = applyFilters(studies,filters).filter(s=>{
    if(!query) return true;
    const hay = [s.id,s.title,s.summary,s.combo,s.track,s.artifact,s.validation].join(" ").toLowerCase();
    return hay.includes(query);
  });

  const grid = document.getElementById("studyGrid");
  if(!filtered.length){
    grid.innerHTML = '<p style="text-align:center;color:var(--muted);padding:28px">No entries match the current filters.</p>';
    return;
  }

  grid.innerHTML = filtered.map(s=>{
    const comboLabel = comboLabels[s.combo]||s.combo;
    const artIcon = artifactIcons[s.artifact]||"";
    const valIcon = validationIcons[s.validation]||"";
    return `
    <article class="study-card">
      <div class="study-topline">
        <span class="chip" style="background:color-mix(in srgb,${comboColors[s.combo]||"var(--muted)"} 15%,transparent);color:${comboColors[s.combo]||"var(--ink)"}">${comboLabel}</span>
        <span class="chip subtle">${artIcon} ${s.artifact}</span>
        <span class="chip subtle">${valIcon} ${s.validation}</span>
      </div>
      <h3>${s.id}</h3>
      <p>${s.title}</p>
      <p style="color:var(--muted);font-size:13px;margin-top:4px">${s.summary}</p>
      <div class="study-meta">
        <div><strong>Track:</strong> ${s.track} \u00B7 <strong>Delivery:</strong> ${s.delivery}</div>
      </div>
      <a href="${s.repo}" target="_blank" rel="noreferrer" class="link-pill">Open Repo \u2192</a>
    </article>`;
  }).join("");
}

function onFilterChange(which){
  populateFilters(which);
  renderStudies();
}

document.getElementById("searchInput").addEventListener("input",renderStudies);
document.getElementById("sphereFilter").addEventListener("change",()=>onFilterChange("sphere"));
document.getElementById("comboFilter").addEventListener("change",()=>onFilterChange("combo"));
document.getElementById("trackFilter").addEventListener("change",()=>onFilterChange("track"));
document.getElementById("artifactFilter").addEventListener("change",()=>onFilterChange("artifact"));
document.getElementById("validationFilter").addEventListener("change",()=>onFilterChange("validation"));

renderStats();
initFilters();
renderStudies();
