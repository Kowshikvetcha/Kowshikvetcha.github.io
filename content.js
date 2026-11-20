// ============================================================
//  Edit this file to make the portfolio yours.
//  Everything on the page is rendered from this object.
// ============================================================
window.PORTFOLIO = {
  name: "Kowshik Vetcha",
  shortName: "Kowshik",
  role: "Machine Learning Engineer",
  tagline:
    "I architect and deploy production ML & GenAI systems — from demand forecasting and fraud detection to enterprise RAG — and keep them accurate with end-to-end MLOps.",
  location: "Hyderabad, India",
  available: true, // shows the "Open to opportunities" badge
  resumeUrl: "", // e.g. "assets/resume.pdf" — leave empty to hide the button

  about: [
    "I'm a Machine Learning Engineer with around 5 years of experience turning complex business problems into high-impact data solutions. My work spans demand forecasting, fraud detection, GenAI-enabled automation and the MLOps that keeps models healthy in production.",
    "I like owning the whole lifecycle: building the data pipelines, training and serving the models, and then monitoring for drift and retraining so accuracy holds up long after launch. Currently I'm an ML Engineer at DataNimbus, and before that I spent nearly four years as a Data Scientist at TCS."
  ],

  stats: [
    { value: "5", label: "Years in ML & data" },
    { value: "70%", label: "Fewer job cancellations" },
    { value: "100M+", label: "Auth logs analyzed" },
    { value: "2×", label: "Databricks certified" }
  ],

  skills: [
    { group: "Programming", items: ["Python", "SQL", "C"] },
    { group: "Data & Engineering", items: ["PySpark", "Pandas", "NumPy", "Databricks", "FastAPI"] },
    { group: "Machine Learning", items: ["Deep Learning", "PyTorch", "Scikit-learn", "AutoML", "Regression"] },
    { group: "GenAI & LLMs", items: ["Transformers", "RAG", "LangChain", "Agentic AI", "Vector Search", "Embeddings"] },
    { group: "MLOps & Deployment", items: ["MLflow", "Docker", "Model Serving", "Model Monitoring", "Drift Detection"] },
    { group: "Tools & Systems", items: ["Linux", "n8n", "ServiceNow", "Jira", "Streamlit"] }
  ],

  experience: [
    {
      title: "ML Engineer",
      company: "DataNimbus",
      period: "Aug 2025 — Present",
      points: [
        "Architected and deployed a production-grade demand forecasting system for a leading US residential & commercial services enterprise.",
        "Designed dynamic pricing strategies using demand predictions and technician capacity modeling.",
        "Reduced job cancellations by 70% by aligning technician allocation with forecasted demand.",
        "Built scalable data pipelines plus automated monitoring with drift detection and retraining orchestration."
      ]
    },
    {
      title: "Data Scientist",
      company: "TCS",
      period: "Dec 2021 — Aug 2025",
      points: [
        "Designed and deployed an enterprise fraud detection system on SSO log analytics to flag anomalous authentication patterns.",
        "Automated incident response by wiring model outputs into ticketing for real-time P2 alerts.",
        "Built an enterprise RAG assistant over service-desk SOPs, cutting ticket resolution time by 30%."
      ]
    }
  ],

  // Personal projects from github.com/Kowshikvetcha (work projects are under Experience)
  projects: [
    {
      title: "Insurance Policy Analyser",
      description:
        "Upload a health insurance policy and ask questions about it — every answer cites the page, table or figure it came from. A layout-aware ingestion engine keeps benefit tables and footnotes intact, and a Policy Fit Score rates the policy 1–10 against a personal health profile.",
      tags: ["RAG", "Docling", "FastAPI", "React", "LLMs", "Evals"],
      github: "https://github.com/Kowshikvetcha/Insurance_RAG",
      live: ""
    },
    {
      title: "Nifty 50 Event Study",
      description:
        "A research pipeline that tests whether Nifty 50 stocks move before material corporate news is public. Aligns timestamped BSE/NSE filings to the first tradable session and checks abnormal returns, volume, F&O positioning and large deals against placebo days.",
      tags: ["Python", "Pandas", "SciPy", "Quant Research"],
      github: "https://github.com/Kowshikvetcha/nifty50-event-study",
      live: ""
    },
    {
      title: "AI Data Cleaning Pro",
      description:
        "Clean datasets by describing what you want in plain English. Offers 30+ cleaning operations, a data-quality dashboard with health scores, multi-dataset joins and full undo/redo — every change is confirmed before it applies.",
      tags: ["Python", "Pandas", "OpenAI", "Streamlit", "Docker"],
      github: "https://github.com/Kowshikvetcha/Data_quality_mvp",
      live: ""
    },
    {
      title: "AI Interview Practice Coach",
      description:
        "A desktop practice tool for mock interviews. It listens to questions from a Zoom, Meet or Teams session, transcribes them live with Whisper and uses GPT-4o to suggest a structured model answer with key points and code snippets. Everything streams over WebSockets to an always-on-top Electron overlay, so you can rehearse and compare your own answers.",
      tags: ["FastAPI", "Whisper", "GPT-4o", "WebSockets", "Electron"],
      github: "https://github.com/Kowshikvetcha/AI_Assistant/tree/main/interview-helper",
      live: ""
    }
  ],
  githubUrl: "https://github.com/Kowshikvetcha",

  certifications: [
    { title: "Databricks Certified Generative AI Engineer", issuer: "Databricks" },
    { title: "Databricks Certified Machine Learning Associate", issuer: "Databricks" }
  ],

  education: [
    {
      degree: "B.Tech, Electronics & Communication Engineering",
      school: "Gudlavalleru Engineering College",
      year: "2020"
    }
  ],

  contact: {
    blurb:
      "Working on forecasting, fraud, GenAI or MLOps problems — or just want to talk ML? My inbox is open.",
    email: "kowshikvetcha@gmail.com",
    // Contact form delivery via Web3Forms (free). Get a key at https://web3forms.com
    // by entering the email you want messages sent to, then paste it here.
    // While empty, the form opens the visitor's email app with the message pre-filled.
    web3formsKey: "f33f538c-1efd-4bfe-beda-477d684895c8",
    links: [
      { label: "GitHub", url: "https://github.com/Kowshikvetcha" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/kowshik-vetcha" }
    ]
  }
};
