// Universal exam structure — Foundation + SET spheres + Combos
// Foundation: Logic, Math + English (base for all exams)
// SET: Specialized exam by sphere
// Combos: Cross-sphere specializations (like registry)
const SPHERES={
  // Foundation — base literacy for all exams
  foundation:{name:"Foundation",icon:"\u{1F4DA}",color:"var(--ink)",
    bachelor:["Logic","Math","Reading","Grammar","Vocabulary","Listening"],
    master:["Logic","Statistics","Academic Reading","Advanced Grammar","Academic Writing","Listening"]},
  // SET spheres — specialized exams
  S:{name:"Science",icon:"\u{1FA7A}",color:"var(--science)",
    bachelor:["Biology","Chemistry","Physics","Bioinformatics","Scientific Computing"],
    master:["Molecular Biology","Biochemistry","Biophysics","Computational Biology","Bioinformatics Engineering"]},
  E:{name:"Entrepreneurship",icon:"\u{1F4BC}",color:"var(--entrepreneurship)",
    bachelor:["Management","Marketing","Finance","Economics","Business Analytics"],
    master:["Strategic Leadership","Innovation Mgmt","Venture Finance","Behavioral Econ","ERP Systems"]},
  T:{name:"Technology",icon:"\u{1F4BB}",color:"var(--technology)",
    bachelor:["Programming","Algorithms","Databases","Networking","Tech Literacy","AI/ML Basics"],
    master:["AI/ML Engineering","Software Systems","Data Science","Cybersecurity","Digital Ethics"]},
  // Combos — cross-sphere specializations
  ST:{name:"Science + Technology",icon:"\u{1FA7A}\u{1F4BB}",color:"var(--science)",
    bachelor:["Bioinformatics","Biotech Engineering","Scientific Computing","Data Analysis"],
    master:["Computational Biology","Bioinformatics Engineering","AI for Science","Biostatistics"]},
  ET:{name:"Entrepreneurship + Technology",icon:"\u{1F4BC}\u{1F4BB}",color:"var(--entrepreneurship)",
    bachelor:["Digital Marketing","ERP Systems","Business Analytics","IT Management"],
    master:["Digital Transformation","Venture Tech","Data-Driven Strategy","Platform Engineering"]},
  SE:{name:"Science + Entrepreneurship",icon:"\u{1FA7A}\u{1F4BC}",color:"var(--science)",
    bachelor:["Pharma Management","Health Economics","Biotech Business","Clinical Trials"],
    master:["Healthcare Innovation","Bioventures","Regulatory Science","Medical Marketing"]}
};
