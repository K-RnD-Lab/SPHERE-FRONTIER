// ═══════════════════════════════════════════════════════════
// MASTER TRAINING — K Mentorship Hub
// SET-methodology: Descriptive · Diagnostic · Prescriptive · Predictive
// ═══════════════════════════════════════════════════════════

const PROGRAMS = {
  f3: {
    name: "F3. AI and Strategic Leadership in Technology",
    short: "F3 AI & Leadership",
    meta: "1.5 yrs · 35% · 73k UAH/sem · Oct 2026",
    subjects: ["AI/ML Fundamentals","Strategic Leadership","Data Science","English B2+","Math & Statistics"]
  },
  aie: {
    name: "AI & Innovation Engineering",
    short: "AI & Innovation",
    meta: "1.5 yrs · 25% · 70k UAH/sem · Oct 2026",
    subjects: ["AI/ML Engineering","Innovation Management","Software Systems","English B2+","Math & Statistics"]
  }
};

const SHEET_ID = "1GcgjCJEPDAFtqOwONsfN_np5zdZFe3v2qa2lNzqDZd4";

// ── QUESTION BANK ──────────────────────────────────────────
const QUESTIONS = {
  "AI/ML Fundamentals": [
    {q:"Which activation function is most commonly used in the hidden layers of a deep neural network?",opts:["Sigmoid","ReLU","Softmax","Tanh"],ans:1},
    {q:"What does the term 'epoch' mean in machine learning training?",opts:["One forward pass","One backward pass","One complete pass through the entire dataset","One batch of data"],ans:2},
    {q:"Which regularization technique randomly deactivates neurons during training?",opts:["L1 regularization","L2 regularization","Dropout","Batch normalization"],ans:2},
    {q:"What is the primary purpose of a loss function?",opts:["To initialize weights","To measure prediction error","To normalize data","To reduce dimensionality"],ans:1},
    {q:"Which algorithm is used for dimensionality reduction?",opts:["K-Means","PCA","Random Forest","Gradient Descent"],ans:1},
    {q:"What is overfitting?",opts:["Model performs well on both training and test data","Model is too simple to capture patterns","Model memorizes training data but generalizes poorly","Model converges too slowly"],ans:2},
    {q:"Which optimizer adapts the learning rate for each parameter individually?",opts:["SGD","Momentum","Adam","RMSprop only"],ans:2},
    {q:"What is the vanishing gradient problem?",opts:["Gradients become too large","Gradients approach zero in early layers","Loss function disappears","Weights become negative"],ans:1},
    {q:"What type of learning uses labeled data?",opts:["Unsupervised learning","Reinforcement learning","Supervised learning","Self-supervised learning"],ans:2},
    {q:"Which architecture is best suited for sequential data like text?",opts:["CNN","RNN/LSTM","GAN","Autoencoder"],ans:1},
    {q:"What is the difference between precision and recall?",opts:["Precision = TP/(TP+FP), Recall = TP/(TP+FN)","They are the same metric","Precision measures speed, Recall measures accuracy","Recall = TN/(TN+FP)"],ans:0},
    {q:"What is a confusion matrix?",opts:["A matrix of weights","A table showing TP, FP, FN, TN","A correlation matrix","A distance matrix"],ans:1},
    {q:"Which technique handles class imbalance?",opts:["Removing majority class only","SMOTE oversampling","Increasing learning rate","Using only accuracy metric"],ans:1},
    {q:"What is transfer learning?",opts:["Moving data between servers","Using a pre-trained model for a new task","Transferring labels","Changing the optimizer"],ans:1},
    {q:"What is the curse of dimensionality?",opts:["More features always improve performance","As dimensions increase, data becomes sparse and distances lose meaning","High-dimensional data is easier to visualize","Dimensionality has no effect on models"],ans:1}
  ],
  "AI/ML Engineering": [
    {q:"What is the purpose of a feature store in MLOps?",opts:["Store model weights","Centralized repository for curated feature values","Store raw data only","Cache API responses"],ans:1},
    {q:"Which metric is most appropriate for evaluating a regression model?",opts:["Accuracy","F1-score","RMSE","AUC-ROC"],ans:2},
    {q:"What is model drift?",opts:["Model weights changing during training","Degradation of model performance over time due to data changes","Model architecture modification","Switching between models"],ans:1},
    {q:"What is the difference between batch and online inference?",opts:["No difference","Batch processes all data at once; online processes in real-time","Batch is faster; online is slower","Online requires GPU; batch requires CPU"],ans:1},
    {q:"Which tool is commonly used for experiment tracking?",opts:["Docker","MLflow","Kubernetes","Terraform"],ans:1},
    {q:"What is data versioning in ML?",opts:["Versioning code only","Tracking changes in datasets over time","Versioning model weights only","Backing up databases"],ans:1},
    {q:"What is the purpose of A/B testing in ML systems?",opts:["Comparing two training algorithms","Comparing model versions in production with real users","Testing data quality","Debugging model errors"],ans:1},
    {q:"What is a model registry?",opts:["A database of users","A centralized store for model artifacts and metadata","A log of API calls","A feature repository"],ans:1},
    {q:"Which deployment pattern routes a small percentage of traffic to a new model?",opts:["Blue-green deployment","Canary deployment","Shadow deployment","Rolling update"],ans:1},
    {q:"What is the purpose of data validation in an ML pipeline?",opts:["To increase dataset size","To ensure data meets expected schema and quality before training","To encrypt data","To reduce features"],ans:1},
    {q:"What is hyperparameter tuning?",opts:["Adjusting model weights","Finding optimal configuration settings that are not learned during training","Changing the dataset","Adjusting the learning rate during training"],ans:1},
    {q:"What does CI/CD stand for in MLOps context?",opts:["Continuous Integration/Continuous Deployment","Computed Inference/Calculated Decision","Cache Invalidation/Content Delivery","Container Instance/Cloud Deployment"],ans:0},
    {q:"What is a pipeline in ML?",opts:["A type of neural network","A sequence of data processing and modeling steps","A data storage format","A visualization tool"],ans:1},
    {q:"Why is reproducibility important in ML?",opts:["It's not important","To ensure results can be verified and debugging is possible","To make models run faster","To reduce code size"],ans:1},
    {q:"What is shadow deployment?",opts:["Deploying without users knowing","Running new model alongside production without serving its predictions","Deleting old models","Deploying on shadow servers"],ans:1}
  ],
  "Strategic Leadership": [
    {q:"What is the primary difference between management and leadership?",opts:["They are identical","Management focuses on processes; leadership focuses on vision and influence","Leadership is about control; management is about creativity","Management is higher than leadership"],ans:1},
    {q:"Which leadership style involves making decisions without team input?",opts:["Democratic","Autocratic","Transformational","Laissez-faire"],ans:1},
    {q:"What is a SWOT analysis?",opts:["A financial report","Strengths, Weaknesses, Opportunities, Threats framework","A project timeline","A risk assessment formula"],ans:1},
    {q:"What does 'stakeholder' mean in strategic context?",opts:["A person who holds the company stock only","Any individual or group affected by or affecting an organization","A competitor","A government regulator only"],ans:1},
    {q:"What is the difference between a mission and a vision statement?",opts:["They are the same","Mission = what we do now; Vision = where we want to be","Vision = current goals; Mission = future dreams","Mission is for employees; Vision is for investors"],ans:1},
    {q:"What is change management?",opts:["Managing financial changes","A structured approach to transitioning individuals and organizations to a desired future state","Changing management personnel","Altering company policies"],ans:1},
    {q:"What is emotional intelligence (EQ) in leadership?",opts:["Being emotional","The ability to recognize, understand, and manage one's own and others' emotions","IQ equivalent for emotions","Suppressing emotions at work"],ans:1},
    {q:"What is the Balanced Scorecard?",opts:["A scoring system for tests","A strategic management framework measuring financial, customer, process, and learning perspectives","A financial dashboard","A performance review form"],ans:1},
    {q:"What is strategic alignment?",opts:["Aligning text in documents","Ensuring organizational activities are consistent with strategic goals","Aligning team schedules","Financial alignment"],ans:1},
    {q:"Which framework analyzes industry competitiveness through five forces?",opts:["PESTEL","Porter's Five Forces","BCG Matrix","Blue Ocean Strategy"],ans:1},
    {q:"What is servant leadership?",opts:["Leading by serving others first and empowering team members","Being submissive","Serving food at meetings","Following orders from above"],ans:0},
    {q:"What is a KPI?",opts:["Key Process Integration","Key Performance Indicator — a measurable value demonstrating effectiveness","Knowledge Processing Index","Key Project Issue"],ans:1},
    {q:"What is organizational culture?",opts:["The building architecture","Shared values, beliefs, and behaviors that shape how an organization operates","The dress code","The organizational chart"],ans:1},
    {q:"What is the difference between intrinsic and extrinsic motivation?",opts:["No difference","Intrinsic comes from within; extrinsic comes from external rewards","Extrinsic is stronger","Intrinsic is about money"],ans:1},
    {q:"What is a cross-functional team?",opts:["A team that crosses borders","A team with members from different departments/specializations","A team that works cross-timezone","A team with cross-trained skills"],ans:1}
  ],
  "Innovation Management": [
    {q:"What is disruptive innovation?",opts:["Innovation that disrupts meetings","Innovation that creates a new market and eventually displaces established competitors","Any new technology","Incremental improvement"],ans:1},
    {q:"What is the innovation adoption lifecycle?",opts:["A biological cycle","The process by which different groups adopt innovations: innovators → early adopters → early majority → late majority → laggards","A project timeline","A financial cycle"],ans:1},
    {q:"What is design thinking?",opts:["Thinking about design only","A human-centered approach to innovation integrating user needs, technology, and business","A graphic design methodology","Architectural thinking"],ans:1},
    {q:"What is an MVP (Minimum Viable Product)?",opts:["Maximum Value Product","A version with just enough features to be usable by early customers for feedback","A prototype with all features","A marketing strategy"],ans:1},
    {q:"What is open innovation?",opts:["Innovation in open spaces","Using both internal and external ideas and paths to advance innovation","Free software only","Public domain research"],ans:1},
    {q:"What is a business model canvas?",opts:["A painting of a business","A strategic management template for developing new or documenting existing business models","A financial spreadsheet","A project canvas"],ans:1},
    {q:"What is the difference between invention and innovation?",opts:["They are the same","Invention = creating something new; Innovation = applying it to create value","Innovation comes first","Invention is commercial; innovation is scientific"],ans:1},
    {q:"What is a pivot in startup methodology?",opts:["A basketball move","A fundamental change in strategy based on learning","A financial calculation","A rotation in management"],ans:1},
    {q:"What is technology readiness level (TRL)?",opts:["A reading level","A scale from 1-9 measuring technology maturity","A testing protocol","A regulatory standard"],ans:1},
    {q:"What is a lean startup?",opts:["A startup with few employees","A methodology for developing businesses using short iterative cycles and validated learning","A low-budget company","A minimalist office design"],ans:1},
    {q:"What is the purpose of a patent?",opts:["To share knowledge freely","To protect an invention, granting exclusive rights for a limited period","To increase company valuation","To document research"],ans:1},
    {q:"What is crowdsourcing in innovation?",opts:["Sourcing from crowds of people","Obtaining ideas or services from a large group, especially from online communities","Group brainstorming only","Hiring many employees"],ans:1},
    {q:"What is a value proposition?",opts:["A price offer","A statement explaining what benefit a product provides, to whom, and how it's different","A financial projection","A marketing slogan"],ans:1},
    {q:"What is agile methodology?",opts:["Being physically agile","An iterative approach to project management emphasizing flexibility and customer feedback","A speed-focused methodology","A rigid planning framework"],ans:1},
    {q:"What is intrapreneurship?",opts:["Entrepreneurship within insects","Acting like an entrepreneur within an existing organization","Internal consulting","A training program"],ans:1}
  ],
  "Data Science": [
    {q:"What is the difference between correlation and causation?",opts:["They are the same","Correlation shows association; causation shows one variable directly causes another","Causation is weaker","Correlation implies causation"],ans:1},
    {q:"What is p-value in hypothesis testing?",opts:["The probability the null hypothesis is true","The probability of observing results at least as extreme as the observed, assuming null hypothesis is true","The effect size","The confidence level"],ans:1},
    {q:"What is the central limit theorem?",opts:["A theorem about limits","The distribution of sample means approaches normal as sample size increases, regardless of population distribution","All distributions are normal","The mean is always at the center"],ans:1},
    {q:"What is the difference between Type I and Type II errors?",opts:["They are the same","Type I = false positive; Type II = false negative","Type I = false negative; Type II = false positive","Both are false positives"],ans:1},
    {q:"What is A/B testing?",opts:["Testing two versions (A and B) to determine which performs better","A blood test","A programming test","A mathematical proof"],ans:0},
    {q:"What is feature engineering?",opts:["Engineering new products","Using domain knowledge to create features that make ML models work better","Building infrastructure","Data cleaning only"],ans:1},
    {q:"What is the difference between SQL and NoSQL?",opts:["No difference","SQL = relational, structured; NoSQL = non-relational, flexible schema","SQL is faster; NoSQL is slower","NoSQL is newer and always better"],ans:1},
    {q:"What is ETL?",opts:["A programming language","Extract, Transform, Load — a data pipeline process","A testing framework","A visualization tool"],ans:1},
    {q:"What is the purpose of cross-validation?",opts:["Validating user input","Assessing how a model generalizes to independent datasets by partitioning data into train/test subsets","Cross-checking data entries","Validating API responses"],ans:1},
    {q:"What is a data warehouse?",opts:["A physical storage building","A centralized repository for structured data from multiple sources, optimized for analysis","A temporary data cache","A backup system"],ans:1},
    {q:"What is the difference between supervised and unsupervised learning?",opts:["No difference","Supervised uses labeled data; unsupervised finds patterns in unlabeled data","Supervised is better","Unsupervised requires more data"],ans:1},
    {q:"What is a statistical interaction?",opts:["People discussing statistics","When the effect of one variable depends on the level of another variable","A correlation","A data merge"],ans:1},
    {q:"What is normalization in data preprocessing?",opts:["Making data normal","Scaling features to a similar range (e.g., 0-1)","Removing outliers","Adding missing values"],ans:1},
    {q:"What is outlier detection?",opts:["Detecting people outside","Identifying data points significantly different from the majority","Finding the average","Sorting data"],ans:1},
    {q:"What is the bias-variance tradeoff?",opts:["No tradeoff exists","Balance between model simplicity (bias) and sensitivity to training data (variance)","Bias is always bad","Variance should be maximized"],ans:1}
  ],
  "Software Systems": [
    {q:"What is the difference between monolithic and microservices architecture?",opts:["No difference","Monolithic = single unit; Microservices = independently deployable services","Monolithic is always better","Microservices cannot communicate"],ans:1},
    {q:"What is a REST API?",opts:["A sleeping API","An architectural style for networked applications using HTTP methods (GET, POST, PUT, DELETE)","A database query language","A testing framework"],ans:1},
    {q:"What is containerization?",opts:["Packaging items in containers","Packaging an application with its dependencies into a standardized unit (container)","Virtualization only","A deployment strategy"],ans:1},
    {q:"What is CI/CD?",opts:["Continuous Integration/Continuous Deployment — automating build, test, and deployment","A certification program","A programming language","A cloud service"],ans:0},
    {q:"What is the purpose of version control (Git)?",opts:["Controlling versions of documents","Tracking and managing changes to code over time","Preventing errors","Performance optimization"],ans:1},
    {q:"What is a load balancer?",opts:["A weight measurement tool","A device that distributes network traffic across multiple servers to ensure reliability","A data processor","A storage system"],ans:1},
    {q:"What is the difference between SQL and NoSQL databases?",opts:["No difference","SQL = structured tables with schemas; NoSQL = flexible document/key-value/graph stores","SQL is always better","NoSQL doesn't use queries"],ans:1},
    {q:"What is cloud computing?",opts:["Computing about clouds","On-demand delivery of computing resources over the internet","Weather prediction","Local server management"],ans:1},
    {q:"What is an API gateway?",opts:["A physical gate","A server that acts as an entry point, routing requests to appropriate microservices","A database connector","A firewall"],ans:1},
    {q:"What is infrastructure as code (IaC)?",opts:["Writing code about infrastructure","Managing infrastructure through machine-readable configuration files rather than manual processes","Coding on infrastructure","Hardware programming"],ans:1},
    {q:"What is observability in software systems?",opts:["Being observable","The ability to understand internal state from external outputs (logs, metrics, traces)","User interface design","Testing visibility"],ans:1},
    {q:"What is a message queue?",opts:["A queue of emails","A system for asynchronous communication between services","A chat system","A logging mechanism"],ans:1},
    {q:"What is horizontal vs vertical scaling?",opts:["Same thing","Horizontal = adding more machines; Vertical = adding more power to existing machine","Horizontal = adding power; Vertical = adding machines","Only horizontal exists"],ans:1},
    {q:"What is a webhook?",opts:["A fishing hook","An HTTP callback triggered by an event","A website hook","A database trigger"],ans:1},
    {q:"What is the purpose of a CDN?",opts:["A TV network","Content Delivery Network — distributed servers for fast content delivery","A coding framework","A database network"],ans:1}
  ],
  "English B2+": [
    {q:"Choose the correct sentence:",opts:["The team are working on the project.","The team is working on the project.","The team were working on the project.","The team have worked on the project."],ans:1},
    {q:"Which word is a synonym for 'ubiquitous'?",opts:["Rare","Everywhere","Unique","Invisible"],ans:1},
    {q:"Complete: 'Had I known about the meeting, I ___ attended.'",opts:["would have","will have","had","would"],ans:0},
    {q:"What does 'mitigate' mean?",opts:["Increase","Make less severe","Eliminate","Ignore"],ans:1},
    {q:"Which sentence uses the passive voice?",opts:["She wrote the report.","The report was written by her.","She is writing.","They write reports."],ans:1},
    {q:"Choose the correct preposition: 'She's responsible ___ the project.'",opts:["for","of","about","with"],ans:0},
    {q:"What does 'to leverage' mean in business context?",opts:["To lift physically","To use something to maximum advantage","To borrow money","To reduce"],ans:1},
    {q:"Which is the correct conditional: 'If the model ___ trained properly, it would perform better.'",opts:["is","was","were","been"],ans:2},
    {q:"What does 'iterative' mean?",opts:["Happening once","Repeating a process multiple times","Moving backwards","Random"],ans:1},
    {q:"Choose the correct form: 'The data ___ that our hypothesis is correct.'",opts:["show","shows","showing","shown"],ans:1},
    {q:"What is an 'abstract' in academic writing?",opts:["A painting","A brief summary of a research paper","An introduction","A conclusion"],ans:1},
    {q:"Which phrase is more formal?",opts:["A lot of","Numerous","Many","Tons of"],ans:1},
    {q:"What does 'empirical' mean?",opts:["Theoretical","Based on observation or experience","Emotional","Random"],ans:1},
    {q:"Complete: 'The results are consistent ___ previous findings.'",opts:["to","with","for","about"],ans:1},
    {q:"What does 'feasibility study' mean?",opts:["A study of ease","An analysis to determine if a project is practical and achievable","A financial audit","A marketing survey"],ans:1}
  ],
  "Math & Statistics": [
    {q:"What is the formula for the mean of a dataset?",opts:["Median of values","Sum of values divided by count","Most frequent value","Range of values"],ans:1},
    {q:"What is standard deviation?",opts:["The average value","A measure of data spread around the mean","The middle value","The maximum value"],ans:1},
    {q:"What is the probability of getting heads on a fair coin flip?",opts:["0","1","0.5","0.25"],ans:2},
    {q:"What is Bayes' theorem used for?",opts:["Solving equations","Updating probability estimates with new evidence","Calculating means","Graphing functions"],ans:1},
    {q:"What is a normal distribution?",opts:["Any distribution","A symmetric bell-shaped distribution defined by mean and standard deviation","A uniform distribution","A skewed distribution"],ans:1},
    {q:"What is the difference between mean and median?",opts:["They are the same","Mean = average; Median = middle value when sorted","Mean is always larger","Median is always larger"],ans:1},
    {q:"What is a confidence interval?",opts:["A sure interval","A range of values likely to contain the true population parameter","A fixed value","A test interval"],ans:1},
    {q:"What is linear regression?",opts:["A classification method","A method modeling the relationship between variables using a linear equation","A clustering algorithm","A dimensionality reduction technique"],ans:1},
    {q:"What is the law of large numbers?",opts:["Big numbers are important","As sample size increases, sample mean approaches population mean","Large datasets are always normal","Numbers follow laws"],ans:1},
    {q:"What is a matrix?",opts:["A movie","A rectangular array of numbers arranged in rows and columns","A list","A function"],ans:1},
    {q:"What is the derivative of x\u00B2?",opts:["x","2x","x\u00B2/2","2x\u00B2"],ans:1},
    {q:"What is the integral of 2x?",opts:["x","x\u00B2+C","2x\u00B2","2"],ans:1},
    {q:"What is a vector?",opts:["A scalar","A quantity with both magnitude and direction","A matrix","A function"],ans:1},
    {q:"What is conditional probability P(A|B)?",opts:["Probability of A","Probability of B","Probability of A given that B has occurred","Joint probability"],ans:2},
    {q:"What is the chi-square test used for?",opts:["Testing means","Testing whether categorical variables are independent","Testing regression","Testing variance"],ans:1}
  ]
};

const RESOURCES = {
  "AI/ML Fundamentals": [
    {label:"Andrew Ng — Machine Learning Specialization",url:"https://www.coursera.org/specializations/machine-learning-introduction"},
    {label:"3Blue1Brown — Neural Networks",url:"https://www.3blue1brown.com/topics/neural-networks"},
    {label:"Google ML Crash Course",url:"https://developers.google.com/machine-learning/crash-course"},
    {label:"Fast.ai Practical Deep Learning",url:"https://course.fast.ai/"}
  ],
  "AI/ML Engineering": [
    {label:"Made With ML — MLOps Course",url:"https://madewithml.com/"},
    {label:"Full Stack Deep Learning",url:"https://fullstackdeeplearning.com/"},
    {label:"Databricks — MLflow Docs",url:"https://mlflow.org/docs/latest/index.html"},
    {label:"Chip Huyen — ML Systems Design",url:"https://huyenchip.com/machine-learning-systems-design/design-a-machine-learning-system.html"}
  ],
  "Strategic Leadership": [
    {label:"Harvard ManageMentor",url:"https://hbr.org/topic/subject/leadership"},
    {label:"McKinsey — Strategic Leadership",url:"https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights"},
    {label:"Coursera — Strategic Leadership",url:"https://www.coursera.org/search?query=strategic+leadership"},
    {label:"MIT Sloan — Leadership",url:"https://mitsloan.mit.edu/faculty/directory/group/management"}
  ],
  "Innovation Management": [
    {label:"Clayton Christensen — Innovator's Dilemma",url:"https://www.hbs.edu/faculty/Pages/item.aspx?num=17067"},
    {label:"Strategyzer — Business Model Canvas",url:"https://www.strategyzer.com/canvas"},
    {label:"IDEO — Design Thinking",url:"https://www.ideou.com/pages/design-thinking"},
    {label:"Steve Blank — The Startup Owner's Manual",url:"https://steveblank.com/resources/"}
  ],
  "Data Science": [
    {label:"Kaggle Learn",url:"https://www.kaggle.com/learn"},
    {label:"StatQuest with Josh Starmer",url:"https://www.youtube.com/c/joshstarmer"},
    {label:"Towards Data Science",url:"https://towardsdatascience.com/"},
    {label:"DataCamp",url:"https://www.datacamp.com/"}
  ],
  "Software Systems": [
    {label:"Martin Fowler — Patterns of Enterprise Architecture",url:"https://martinfowler.com/books/eaa.html"},
    {label:"Docker Docs",url:"https://docs.docker.com/"},
    {label:"Kubernetes Basics",url:"https://kubernetes.io/docs/tutorials/kubernetes-basics/"},
    {label:"AWS Well-Architected Framework",url:"https://aws.amazon.com/architecture/well-architected/"}
  ],
  "English B2+": [
    {label:"IELTS Academic Preparation",url:"https://www.ielts.org/for-test-takers/preparing-for-the-test"},
    {label:"Academic English — Coursera",url:"https://www.coursera.org/search?query=academic+english"},
    {label:"Grammarly Blog",url:"https://www.grammarly.com/blog/"},
    {label:"BBC Learning English",url:"https://www.bbc.co.uk/learningenglish"}
  ],
  "Math & Statistics": [
    {label:"Khan Academy — Statistics & Probability",url:"https://www.khanacademy.org/math/statistics-probability"},
    {label:"3Blue1Brown — Essence of Linear Algebra",url:"https://www.3blue1brown.com/topics/linear-algebra"},
    {label:"StatTrek — AP Statistics",url:"https://stattrek.com/"},
    {label:"MIT OpenCourseWare — Mathematics",url:"https://ocw.mit.edu/courses/mathematics/"}
  ]
};

// ── STATE ──────────────────────────────────────────────────
let state = {
  program: null,
  subject: "all",
  mode: "practice",
  analyticsType: "descriptive",
  questions: [],
  currentIdx: 0,
  answers: {},
  sessionStart: null,
  sessions: JSON.parse(localStorage.getItem("mt_sessions")||"[]"),
  sessionLog: []
};

// ── INIT ───────────────────────────────────────────────────
document.querySelectorAll(".program-card").forEach(card=>{
  card.addEventListener("click",()=>{
    document.querySelectorAll(".program-card").forEach(c=>c.classList.remove("active"));
    card.classList.add("active");
    state.program = card.dataset.program;
    document.getElementById("programSection").style.display="none";
    document.getElementById("trainerMain").style.display="grid";
    initSubjectFilter();
    startSession();
  });
});

document.querySelectorAll(".mode-tabs button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".mode-tabs button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    state.mode = btn.dataset.mode;
    startSession();
  });
});

document.querySelectorAll(".analytics-tabs button").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".analytics-tabs button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    state.analyticsType = btn.dataset.type;
    renderAnalytics();
  });
});

document.getElementById("subjectFilter").addEventListener("change",e=>{
  state.subject = e.target.value;
  startSession();
});

document.getElementById("prevBtn").addEventListener("click",()=>{
  if(state.currentIdx>0){state.currentIdx--;renderQuestion();}
});
document.getElementById("nextBtn").addEventListener("click",()=>{
  if(state.currentIdx<state.questions.length-1){state.currentIdx++;renderQuestion();}
  else{endSession();}
});

// ── SUBJECTS ───────────────────────────────────────────────
function initSubjectFilter(){
  const sel = document.getElementById("subjectFilter");
  const prog = PROGRAMS[state.program];
  sel.innerHTML = '<option value="all">Усі предмети</option>';
  prog.subjects.forEach(s=>{
    const o=document.createElement("option");o.value=s;o.textContent=s;sel.appendChild(o);
  });
}

// ── SESSION ────────────────────────────────────────────────
function startSession(){
  const prog = PROGRAMS[state.program];
  let pool = [];
  const subjects = state.subject==="all" ? prog.subjects : [state.subject];
  subjects.forEach(subj=>{
    if(QUESTIONS[subj]){
      QUESTIONS[subj].forEach((q,i)=>pool.push({...q,subject:subj,idx:i}));
    }
  });
  // Shuffle
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  const count = state.mode==="simulation" ? Math.min(pool.length,30) : Math.min(pool.length,10);
  state.questions = pool.slice(0,count);
  state.currentIdx = 0;
  state.answers = {};
  state.sessionStart = Date.now();
  state.sessionLog = [];
  document.getElementById("sessionEnd").style.display="none";
  document.getElementById("trainerMain").style.display="grid";
  renderQuestion();
  renderResources();
  renderStats();
  renderAnalytics();
}

function renderQuestion(){
  const q = state.questions[state.currentIdx];
  const area = document.getElementById("questionArea");
  document.getElementById("qNav").style.display="flex";
  document.getElementById("qCounter").textContent=`${state.currentIdx+1} / ${state.questions.length}`;

  const answered = state.answers[state.currentIdx] !== undefined;
  const userAns = state.answers[state.currentIdx];

  let optsHtml = q.opts.map((o,i)=>{
    let cls = "q-opt";
    if(answered){
      if(i===q.ans) cls+=" correct";
      else if(i===userAns && i!==q.ans) cls+=" wrong";
      else cls+=" reveal";
    }else if(userAns===i){
      cls+=" selected";
    }
    return `<div class="${cls}" data-idx="${i}">${o}</div>`;
  }).join("");

  area.innerHTML = `
    <div class="q-card">
      <div style="font-size:12px;color:var(--muted);margin-bottom:8px">${q.subject}</div>
      <h3>${q.q}</h3>
      <div class="q-options">${optsHtml}</div>
      ${answered ? `<div style="margin-top:12px;font-size:13px;color:${userAns===q.ans?'#22c55e':'#ef4444'}">${userAns===q.ans?'\u2705 Правильно!':'\u274C Неправильно. Правильна відповідь: '+q.opts[q.ans]}</div>` : ''}
    </div>`;

  area.querySelectorAll(".q-opt:not(.correct):not(.wrong):not(.reveal)").forEach(el=>{
    el.addEventListener("click",()=>{
      const idx = parseInt(el.dataset.idx);
      state.answers[state.currentIdx] = idx;
      const correct = idx === q.ans;
      state.sessionLog.push({subject:q.subject,correct,time:Date.now()});
      renderQuestion();
      renderStats();
      renderAnalytics();
    });
  });

  document.getElementById("prevBtn").disabled = state.currentIdx===0;
  const isLast = state.currentIdx===state.questions.length-1;
  document.getElementById("nextBtn").textContent = isLast ? "Завершити \u{1F3C1}" : "Далі \u2192";
}

function endSession(){
  const elapsed = Math.round((Date.now()-state.sessionStart)/60000);
  const total = state.sessionLog.length;
  const correct = state.sessionLog.filter(l=>l.correct).length;
  const accuracy = total ? Math.round(correct/total*100) : 0;

  const session = {
    program: state.program,
    subject: state.subject,
    mode: state.mode,
    date: new Date().toISOString(),
    minutes: elapsed||1,
    total,
    correct,
    accuracy,
    log: state.sessionLog
  };
  state.sessions.push(session);
  localStorage.setItem("mt_sessions",JSON.stringify(state.sessions));

  document.getElementById("trainerMain").style.display="none";
  document.getElementById("sessionEnd").style.display="block";
  document.getElementById("finalScore").textContent = accuracy+"%";
  document.getElementById("finalScore").style.color = accuracy>=80?"#22c55e":accuracy>=60?"#eab308":"#ef4444";

  const readiness = getReadiness();
  document.getElementById("finalStats").innerHTML = `
    <span class="stat-pill">\u23F1 ${elapsed||1} хв</span>
    <span class="stat-pill">\u2705 ${correct}/${total}</span>
    <span class="stat-pill">\u{1F3AF} ${accuracy}%</span>
    <span class="stat-pill">\u{1F7E2} ${readiness.label}</span>
  `;
}

// ── STATS ──────────────────────────────────────────────────
function renderStats(){
  const log = state.sessionLog;
  const total = log.length;
  const correct = log.filter(l=>l.correct).length;
  const accuracy = total ? Math.round(correct/total*100) : 0;
  const elapsed = state.sessionStart ? Math.round((Date.now()-state.sessionStart)/60000) : 0;
  const allSessions = state.sessions.length;

  const readiness = getReadiness();

  document.getElementById("sessionStats").innerHTML = `
    <span class="stat-pill">\u23F1 <span class="val">${elapsed} хв</span></span>
    <span class="stat-pill">\u2705 <span class="val">${correct}/${total}</span></span>
    <span class="stat-pill">\u{1F3AF} <span class="val">${accuracy}%</span></span>
    <span class="stat-pill">\u{1F4CB} <span class="val">${allSessions} сесій</span></span>
    <span class="stat-pill">\u{1F7E2} <span class="val">${readiness.label}</span></span>
  `;

  const rv = document.getElementById("readinessValue");
  rv.textContent = readiness.label;
  rv.className = "readiness "+readiness.cls;
  const bar = document.getElementById("readinessBar");
  bar.style.width = readiness.pct+"%";
  bar.style.background = readiness.cls==="high"?"#22c55e":readiness.cls==="medium"?"#eab308":"#ef4444";
}

function getReadiness(){
  const recent = state.sessions.slice(-5);
  if(!recent.length) return {label:"New",cls:"low",pct:10};
  const avgAcc = recent.reduce((s,r)=>s+r.accuracy,0)/recent.length;
  const totalQ = recent.reduce((s,r)=>s+r.total,0);
  if(avgAcc>=85 && totalQ>=30) return {label:"High",cls:"high",pct:Math.min(95,avgAcc)};
  if(avgAcc>=65) return {label:"Medium",cls:"medium",pct:avgAcc};
  return {label:"Low",cls:"low",pct:avgAcc};
}

// ── RESOURCES ──────────────────────────────────────────────
function renderResources(){
  const prog = PROGRAMS[state.program];
  const subjects = state.subject==="all" ? prog.subjects : [state.subject];
  let html = "";
  subjects.forEach(subj=>{
    if(RESOURCES[subj]){
      html += `<div style="font-size:12px;font-weight:600;margin:8px 0 4px">${subj}</div>`;
      RESOURCES[subj].forEach(r=>{
        html += `<a href="${r.url}" target="_blank" rel="noreferrer">${r.label}</a>`;
      });
    }
  });
  document.getElementById("resourceLinks").innerHTML = html;
}

// ── ANALYTICS ──────────────────────────────────────────────
function renderAnalytics(){
  const type = state.analyticsType;
  const titles = {
    descriptive:"Описова аналітика \u2014 що сталося?",
    diagnostic:"Діагностична аналітика \u2014 чому?",
    prescriptive:"Прескриптивна аналітика \u2014 що робити?",
    predictive:"Предиктивна аналітика \u2014 що буде?"
  };
  document.getElementById("chartTitle").textContent = titles[type]||"";

  const canvas = document.getElementById("mainChart");
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.offsetWidth*2;
  canvas.height = 360;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const prog = PROGRAMS[state.program];
  const subjects = prog.subjects;
  const log = state.sessionLog;
  const sessions = state.sessions.filter(s=>s.program===state.program);

  if(type==="descriptive") drawDescriptive(ctx,canvas,subjects,log,sessions);
  else if(type==="diagnostic") drawDiagnostic(ctx,canvas,subjects,log,sessions);
  else if(type==="prescriptive") drawPrescriptive(ctx,canvas,subjects,log,sessions);
  else if(type==="predictive") drawPredictive(ctx,canvas,subjects,log,sessions);

  drawSharedChart();
}

function drawBarChart(ctx,w,h,labels,values,colors,title){
  const pad=60,barW=Math.min(60,(w-pad*2)/labels.length-10);
  const maxVal=Math.max(...values,1);
  const chartH=h-pad*2;

  ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--ink")||"#333";
  ctx.font="bold 14px system-ui";
  ctx.fillText(title,pad,30);

  labels.forEach((label,i)=>{
    const x=pad+i*(barW+10)+10;
    const barH=Math.max(2,(values[i]/maxVal)*chartH);
    const y=h-pad-barH;

    ctx.fillStyle=colors[i%colors.length];
    ctx.beginPath();
    ctx.roundRect(x,y,barW,barH,6);
    ctx.fill();

    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--ink")||"#333";
    ctx.font="11px system-ui";
    ctx.textAlign="center";
    const shortLabel = label.length>12?label.substring(0,11)+"\u2026":label;
    ctx.fillText(shortLabel,x+barW/2,h-pad+16);
    ctx.fillText(values[i]+"%",x+barW/2,y-6);
  });
  ctx.textAlign="start";
}

function drawDescriptive(ctx,canvas,subjects,log,sessions){
  const w=canvas.width,h=canvas.height;
  const accBySubject={};
  subjects.forEach(s=>accBySubject[s]={correct:0,total:0});
  log.forEach(l=>{
    if(accBySubject[l.subject]!==undefined){
      accBySubject[l.subject].total++;
      if(l.correct) accBySubject[l.subject].correct++;
    }
  });
  const labels=subjects;
  const values=subjects.map(s=>accBySubject[s].total?Math.round(accBySubject[s].correct/accBySubject[s].total*100):0);
  const colors=["#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#ef4444"];
  drawBarChart(ctx,w,h,labels,values,colors,"Точність по предметах (поточна сесія)");
}

function drawDiagnostic(ctx,canvas,subjects,log,sessions){
  const w=canvas.width,h=canvas.height;
  const wrongBySubject={};
  subjects.forEach(s=>wrongBySubject[s]=0);
  log.filter(l=>!l.correct).forEach(l=>{
    if(wrongBySubject[l.subject]!==undefined) wrongBySubject[l.subject]++;
  });
  const labels=subjects;
  const values=subjects.map(s=>wrongBySubject[s]);
  const maxVal=Math.max(...values,1);
  const pctValues=values.map(v=>Math.round(v/maxVal*100));
  const colors=["#ef4444","#f97316","#eab308","#f43f5e","#dc2626"];
  drawBarChart(ctx,w,h,labels,pctValues,colors,"Слабкі зони (помилки)");
}

function drawPrescriptive(ctx,canvas,subjects,log,sessions){
  const w=canvas.width,h=canvas.height;
  const accBySubject={};
  subjects.forEach(s=>accBySubject[s]=0);
  const countBySubject={};
  subjects.forEach(s=>countBySubject[s]=0);
  log.forEach(l=>{
    if(countBySubject[l.subject]!==undefined){
      countBySubject[l.subject]++;
      if(l.correct) accBySubject[l.subject]++;
    }
  });
  const labels=subjects;
  const values=subjects.map(s=>{
    const acc=countBySubject[s]?Math.round(accBySubject[s]/countBySubject[s]*100):0;
    return Math.max(0,80-acc); // priority = gap from 80%
  });
  const colors=["#22c55e","#16a34a","#15803d","#166534","#14532d"];
  drawBarChart(ctx,w,h,labels,values,colors,"Пріоритет вивчення (відстань до 80%)");
}

function drawPredictive(ctx,canvas,subjects,log,sessions){
  const w=canvas.width,h=canvas.height;
  const progSessions=sessions.filter(s=>s.program===state.program);
  const recent=progSessions.slice(-10);
  if(recent.length<2){
    ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--muted")||"#999";
    ctx.font="14px system-ui";
    ctx.fillText("Потрібно мінімум 2 сесії для предиктивної аналітики",60,100);
    return;
  }
  // Simple linear trend
  const accs=recent.map(s=>s.accuracy);
  const n=accs.length;
  const sumX=accs.reduce((s,_,i)=>s+i,0);
  const sumY=accs.reduce((s,v)=>s+v,0);
  const sumXY=accs.reduce((s,v,i)=>s+i*v,0);
  const sumXX=accs.reduce((s,_,i)=>s+i*i,0);
  const slope=(n*sumXY-sumX*sumY)/(n*sumXX-sumX*sumX);
  const intercept=(sumY-slope*sumX)/n;
  const predicted=Math.min(100,Math.max(0,Math.round(intercept+slope*n)));

  const pad=60,chartW=w-pad*2,chartH=h-pad*2;
  ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--ink")||"#333";
  ctx.font="bold 14px system-ui";
  ctx.fillText("Прогноз наступної сесії",pad,30);

  // Draw trend line
  const maxAcc=100;
  accs.forEach((acc,i)=>{
    const x=pad+i*(chartW/(n-1||1));
    const y=h-pad-(acc/maxAcc)*chartH;
    ctx.beginPath();
    ctx.arc(x,y,5,0,Math.PI*2);
    ctx.fillStyle="#3b82f6";
    ctx.fill();
  });

  // Trend line
  const x0=pad,y0=h-pad-(accs[0]/maxAcc)*chartH;
  const x1=pad+(n-1)*(chartW/(n-1||1)),y1=h-pad-(accs[n-1]/maxAcc)*chartH;
  ctx.strokeStyle="#3b82f6";
  ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();

  // Predicted point
  const px=pad+n*(chartW/(n-1||1));
  const py=h-pad-(predicted/maxAcc)*chartH;
  ctx.beginPath();ctx.arc(px,py,8,0,Math.PI*2);
  ctx.fillStyle="#22c55e";ctx.fill();
  ctx.font="bold 16px system-ui";
  ctx.fillText(predicted+"%",px+12,py+5);

  ctx.font="11px system-ui";
  ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue("--muted")||"#999";
  ctx.fillText("Сесії \u2192",pad,h-pad+20);
}

function drawSharedChart(){
  const canvas=document.getElementById("sharedChart");
  const ctx=canvas.getContext("2d");
  canvas.width=canvas.offsetWidth*2;
  canvas.height=360;
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const prog=PROGRAMS[state.program];
  const subjects=prog.subjects;
  const allSessions=state.sessions.filter(s=>s.program===state.program);

  const accBySubject={};
  subjects.forEach(s=>accBySubject[s]={correct:0,total:0});
  allSessions.forEach(session=>{
    (session.log||[]).forEach(l=>{
      if(accBySubject[l.subject]!==undefined){
        accBySubject[l.subject].total++;
        if(l.correct) accBySubject[l.subject].correct++;
      }
    });
  });

  const labels=subjects;
  const values=subjects.map(s=>accBySubject[s].total?Math.round(accBySubject[s].correct/accBySubject[s].total*100):0);
  const colors=["#3b82f6","#8b5cf6","#06b6d4","#f59e0b","#ef4444"];
  drawBarChart(ctx,canvas.width,canvas.height,labels,values,colors,"Загальна точність по предметах (всі сесії)");
}
