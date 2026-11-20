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
  resumeUrl: "assets/Vetcha_Kowshik_Resume.pdf", // e.g. "assets/resume.pdf" — leave empty to hide the button

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

  // Personal projects. Each card opens project.html?id=<id>, built from `details`.
  // See README → "Project detail pages" for every field.
  projects: [
    {
      id: "insurance-policy-analyser",
      title: "Insurance Policy Analyser",
      description:
        "Upload a health insurance policy and ask questions about it — every answer cites the page, table or figure it came from. A layout-aware ingestion engine keeps benefit tables and footnotes intact, and a Policy Fit Score rates the policy 1–10 against a personal health profile.",
      tags: ["RAG", "Docling", "FastAPI", "React", "LLMs", "Evals"],
      github: "https://github.com/Kowshikvetcha/Insurance_RAG",
      live: "",
      details: {
        category: "GenAI · Document Intelligence",
        summary:
          "A document-grounded assistant for health insurance policies. It answers questions with citations to the exact page, table or figure, and scores how well a policy fits one person's health profile.",
        problem:
          "Health insurance policies run to dozens of pages of legal terms, and the details that matter, such as waiting periods, co-pays and room-rent limits, are buried in tables and footnotes. Generic \"chat with your PDF\" tools flatten those tables into plain text, so their answers are vague or wrong, and people can't tell whether to trust them.",
        solution:
          "An assistant that reads a policy the way a person would, keeping tables, charts and footnotes intact, and answers questions with a citation to the exact page or table so every answer can be checked. It also scores from 1 to 10 how well the policy fits a person's health needs, backing each rating with evidence from the document.",
        metrics: [
          { value: "1–10", label: "Policy fit score with cited evidence" },
          { value: "9", label: "Policy areas rated per profile" },
          { value: "~19 s", label: "To ingest a 4-page policy on CPU" },
          { value: "6+", label: "Swappable LLM providers" }
        ],
        sections: [
          {
            title: "Ingestion engine",
            text: ["The core of the project is a pipeline that preserves document structure instead of flattening it:"],
            list: [
              "**Parse:** the Docling layout model reads headings, reading order and multi-column pages. TableFormer reconstructs tables, including merged cells and multi-row headers. OCR handles scanned pages, and clipped-text recovery restores words that overflow a cell border.",
              "**Tables:** merges tables that continue across pages, flattens multi-row headers, forward-fills merged row labels and links footnote markers (*, #, ¹) to their text.",
              "**Figures:** drops logos and icons, and uses a vision LLM to describe charts and diagrams, with numbers extracted as tables.",
              "**Enrichment:** a definitions glossary injected at answer time, section tags (coverage, exclusion, waiting period, sub-limit, co-pay, claims) and LLM table summaries.",
              "**Two-level index:** small units (sentences, table rows) are searched; full parent sections and tables are what the LLM reads."
            ]
          },
          {
            title: "Answering",
            text: [
              "Questions go through a history-aware query rewrite, then hybrid retrieval: dense embeddings plus BM25, merged with reciprocal-rank fusion and category boosts, with optional reranking. Results expand to their parent sections and relevant glossary definitions before a grounded prompt produces a streamed answer with citations.",
              "After each upload, an ingestion report shows the extracted tables (with previews), figures, OCR pages, defined terms and warnings, so extraction quality can be checked at a glance."
            ]
          },
          {
            title: "Policy Fit Score",
            list: [
              "The user fills in a health profile: basics, medical history, lifestyle, plans and priorities.",
              "Up to nine areas are rated against it: pre-existing conditions, waiting periods, sum insured, co-pay and deductibles, room rent and sub-limits, exclusions, maternity, extras and renewal terms.",
              "Weights follow the profile. For example, pre-existing conditions weigh far more when conditions are declared.",
              "**The LLM rates each area with cited evidence, but deterministic code computes the score:** a weighted mean, capped at 4 if any area is a deal-breaker. Areas the policy doesn't cover lower the confidence instead of guessing."
            ]
          },
          {
            title: "Evaluation & observability",
            list: [
              "Every question and upload is traced in a self-hosted Langfuse instance.",
              "Each answer is graded in the background for groundedness, context relevance and answer relevance, combined into a confidence score.",
              "An offline suite scores a golden question set with custom metrics plus RAGAS.",
              "A pytest suite runs against a synthetic policy that covers the hard cases: a 2-page table with spanning cells, footnotes, an overflowing cell, a chart and a scanned page."
            ]
          },
          {
            title: "Privacy by design",
            list: [
              "Documents are processed in memory only, never written to disk, and document text is never logged.",
              "Sessions expire automatically and can be deleted immediately.",
              "The health profile is used for a single request and never stored. Traces keep only a redacted summary.",
              "A fully local setup is possible with Ollama for the LLM."
            ]
          }
        ],
        stack: [
          { group: "Backend", items: ["Python", "FastAPI", "Docling", "TableFormer", "PyMuPDF"] },
          { group: "Retrieval", items: ["Embeddings", "BM25", "Reciprocal-rank fusion", "Reranking"] },
          { group: "LLMs", items: ["Anthropic", "OpenAI", "Gemini", "Groq", "Mistral", "Ollama"] },
          { group: "Frontend", items: ["React", "TypeScript", "Vite"] },
          { group: "Quality", items: ["Langfuse", "RAGAS", "Pytest", "Docker"] }
        ]
      }
    },
    {
      id: "nifty50-event-study",
      title: "Nifty 50 Event Study",
      description:
        "A research pipeline that tests whether Nifty 50 stocks move before material corporate news is public. Aligns timestamped BSE/NSE filings to the first tradable session and checks abnormal returns, volume, F&O positioning and large deals against placebo days.",
      tags: ["Python", "Pandas", "SciPy", "Quant Research"],
      github: "https://github.com/Kowshikvetcha/nifty50-event-study",
      live: "",
      details: {
        category: "Quantitative Research · Market Microstructure",
        summary:
          "Does the market know before the news? A statistical study of information leakage across the Nifty 50, using second-level filing timestamps, minute-level prices, options data and a placebo control.",
        problem:
          "Listed companies must announce material news to the stock exchanges before anyone can trade on it, but the information passes through many hands first. If it leaks, prices and options trading should move before the announcement, a sign of unfair and possibly insider trading. Testing this rigorously is hard, because most early moves have innocent explanations such as market-wide swings or press reports.",
        solution:
          "A research pipeline that collects every material announcement from India's 50 largest listed companies with its exact public time. It measures what the stock price, trading volume and options market did in the days and minutes before, and compares that with random \"normal\" days. Public explanations are filtered out, so only unexplained activity is flagged as possible leakage.",
        metrics: [
          { value: "1,840", label: "Material events analysed" },
          { value: "49", label: "Nifty 50 stocks covered" },
          { value: "938", label: "Placebo days as a control" },
          { value: "26 mo", label: "Of filings, Aug 2024 – Oct 2026" }
        ],
        sections: [
          {
            title: "Hypothesis",
            text: [
              "For Nifty 50 stocks, some of the market's reaction to material news happens before the news is public. If so, prices should drift in the news' direction, and volume and options positioning should rise on the side that would profit. The study can show that markets behave as if someone knew; it cannot say who traded or whether anything illegal happened."
            ]
          },
          {
            title: "Method",
            list: [
              "**Exact public time:** every corporate announcement from both BSE and NSE. The public time is the earlier broadcast, to the second. Day 0 is the first session that could react, using the 15:30 IST rule.",
              "**Material vs routine:** a keyword classifier keeps material news and drops routine compliance filings.",
              "**Scheduled vs unscheduled:** results and dividends have known dates, so positioning before them is expected. The headline verdicts use unscheduled news only.",
              "**Signed price drift:** the Nifty-adjusted return over the 5 sessions before Day 0, signed by the direction of the news so leaks before good and bad news don't cancel out. A sector-adjusted version removes sector news.",
              "**Positioning signals:** share volume, option volume, short-dated out-of-the-money options split into news side vs wrong side, futures and options open interest, bulk/block deals, SEBI-reported insider trades, and volume in the hour before in-session filings using 1-minute data."
            ]
          },
          {
            title: "Separating leakage from public news",
            text: ["Most apparent leakage turns out to be public information that isn't a company filing. Each event is flagged for:"],
            list: [
              "a big market day or a big sector day in the pre-window;",
              "an exchange clarification about a media report;",
              "broker rating changes or press coverage before the filing.",
              "The \"unscheduled, no public catalyst\" group keeps only events with none of these: the cleanest test of leakage."
            ]
          },
          {
            title: "Statistical testing",
            list: [
              "Every stock gets up to 20 random non-event days, measured exactly the same way, as a placebo baseline.",
              "Signed drift is tested four ways: t-test, BMP standardised test, sign test and a placebo bootstrap.",
              "Positioning signals are compared directly against the placebo days rather than against zero.",
              "Option-flow leads are drilled into minute by minute: which contracts were bought, when, whether the buyers profited, and whether any SEBI order or press report explains them."
            ]
          },
          {
            title: "Findings",
            list: [
              "**No systematic leakage** in prices, share volume or insider trading that survives controls for public news.",
              "Option activity before unscheduled news **disappears in the no-catalyst group**, so it is explained by public catalysts.",
              "**One robust anomaly:** volume rises in the hour before in-session filings (+0.40 z, p 0.04 in the no-catalyst group) without a directional price move. It looks like a story circulating rather than traders betting on the outcome.",
              "An early 12-month result showing price drift disappeared with twice the data, a useful reminder that small samples produce noise.",
              "Sanity check: insiders trade far less before scheduled results (61% vs 74% of random days), matching SEBI's mandatory trading-window closure."
            ]
          },
          {
            title: "Output",
            text: [
              "Each run produces a self-contained HTML report (verdicts, average signed CAR path, drift by event type, test tables, top movers and ranked option-flow leads) plus per-event, placebo and test CSVs. A drill-down tool generates a detailed page for each lead."
            ]
          }
        ],
        stack: [
          { group: "Language", items: ["Python 3.12"] },
          { group: "Analysis", items: ["Pandas", "NumPy", "SciPy"] },
          { group: "Data sources", items: ["BSE & NSE APIs", "NSE F&O bhavcopy", "Upstox candles", "SEBI orders", "Google News RSS"] },
          { group: "Methods", items: ["Event study", "Placebo bootstrap", "BMP test", "Sign test"] }
        ]
      }
    },
    {
      id: "ai-data-cleaning-pro",
      title: "AI Data Cleaning Pro",
      description:
        "Clean datasets by describing what you want in plain English. Offers 30+ cleaning operations, a data-quality dashboard with health scores, multi-dataset joins and full undo/redo — every change is confirmed before it applies.",
      tags: ["Python", "Pandas", "OpenAI", "Streamlit", "Docker"],
      github: "https://github.com/Kowshikvetcha/Data_quality_mvp",
      live: "",
      details: {
        category: "GenAI · Data Quality",
        summary:
          "An AI-assisted data cleaning tool: upload a dataset, see its quality issues, and clean it by chatting in plain English. Every change is previewed and confirmed before it is applied.",
        problem:
          "Before any analysis, data has to be cleaned: missing values, stray spaces, inconsistent dates and categories. It's repetitive work that usually means writing code, a wrong change is easy to make and hard to undo, and people who don't code have to wait for someone who does.",
        solution:
          "A web app where you upload a dataset, see its quality problems on a dashboard, and fix them by typing plain-English instructions such as \"fill missing ages with the median\". Every change is previewed and needs your approval before it's applied, and any step can be undone.",
        metrics: [
          { value: "30+", label: "Cleaning operations" },
          { value: "247", label: "Automated tests" },
          { value: "20", label: "Steps of undo / redo" },
          { value: "3", label: "Export formats" }
        ],
        sections: [
          {
            title: "How it works",
            list: [
              "**Describe it, don't code it:** the user writes a request like \"fill missing ages with the median and trim spaces in all text columns\".",
              "**Function calling, not free-form code:** the LLM maps the request onto a fixed set of validated cleaning tools, so it can't run arbitrary code.",
              "**Preview and confirm:** every change shows a before/after diff and needs explicit confirmation.",
              "**Undo / redo:** a full history stack makes every step reversible."
            ]
          },
          {
            title: "Features",
            list: [
              "30+ operations: fill nulls, trim, change case, round, clip and scale numbers, regex replace, parse dates, split and merge columns, and more.",
              "Batch operations across many columns at once.",
              "A data-quality dashboard with automated checks, an overall health score and column-level summaries.",
              "AI-generated cleaning suggestions based on the issues found.",
              "Multi-dataset joins on shared keys.",
              "Point-and-click manual transformations alongside the chat.",
              "Export to CSV, Excel or JSON."
            ]
          },
          {
            title: "Engineering for production",
            list: [
              "**Safety:** formulas for calculated columns are sanitised to prevent code injection, and inputs are validated before any tool runs.",
              "**Resilience:** OpenAI calls use timeouts and retries with exponential backoff.",
              "**Configuration:** settings such as model, limits and log level are centralised and overridable through environment variables.",
              "**Operations:** rotating file logs, a Docker image with a health check, and 247 pytest tests covering checks, cleaning, the executor, confirmation, diffs, export, joins and scoring."
            ]
          }
        ],
        stack: [
          { group: "App", items: ["Python", "Streamlit"] },
          { group: "Data", items: ["Pandas", "NumPy", "PyArrow"] },
          { group: "AI", items: ["OpenAI", "Function calling"] },
          { group: "Quality & Ops", items: ["Pytest", "Docker", "Logging"] }
        ]
      }
    },
    {
      id: "ai-interview-practice-coach",
      title: "AI Interview Practice Coach",
      description:
        "A desktop practice tool for mock interviews. It listens to questions from a Zoom, Meet or Teams session, transcribes them live with Whisper and uses GPT-4o to suggest a structured model answer with key points and code snippets. Everything streams over WebSockets to an always-on-top Electron overlay, so you can rehearse and compare your own answers.",
      tags: ["FastAPI", "Whisper", "GPT-4o", "WebSockets", "Electron"],
      github: "https://github.com/Kowshikvetcha/AI_Assistant/tree/main/interview-helper",
      live: "",
      details: {
        category: "GenAI · Real-time Speech",
        summary:
          "A real-time desktop coach for interview practice. During a mock interview call it transcribes each question as it is asked and suggests a structured model answer, so you can compare your own answer and improve.",
        problem:
          "Practising for interviews alone gives you no feedback. You answer a question, but you don't know what a strong answer should have covered, so it's hard to see where to improve between real interviews.",
        solution:
          "A desktop app that runs alongside a mock interview call. It picks up each question as it's asked, transcribes it, and within a few seconds shows a structured model answer, with key points and code where relevant, in a small window on top of the call. You can compare it with your own answer straight away.",
        metrics: [
          { value: "~3–5 s", label: "From question to suggested answer" },
          { value: "2 s", label: "Audio chunks streamed live" },
          { value: "7", label: "LLM provider presets" },
          { value: "3", label: "Meeting apps: Zoom, Meet, Teams" }
        ],
        sections: [
          {
            title: "Architecture",
            list: [
              "**Audio capture:** system audio is captured with WASAPI loopback on Windows in 1–2 second PCM chunks, so it works with any meeting app.",
              "**Speech-to-text:** each chunk is transcribed with the OpenAI Whisper API.",
              "**Answer generation:** GPT-4o turns the transcribed question into structured JSON: a concise answer, supporting bullet points and code snippets where relevant.",
              "**Delivery:** a FastAPI backend pushes the transcript and answers over WebSockets to an Electron overlay.",
              "**Overlay:** a floating, always-on-top window with a live transcript, start/stop/clear controls and a Ctrl+Shift+H toggle."
            ]
          },
          {
            title: "Engineering details",
            list: [
              "Performance logging for every cycle: STT latency, LLM latency, end-to-end latency and token usage, shown in the overlay's status bar.",
              "Provider-agnostic configuration: works with any OpenAI-compatible API (OpenAI, OpenRouter, Groq, Together, Fireworks, DeepSeek, Ollama) through environment variables.",
              "Typed Pydantic models and a central settings module.",
              "Unit tests for STT, the LLM service, WebSockets and performance, with all API calls mocked so tests run without a key."
            ]
          },
          {
            title: "What's next",
            list: [
              "Stream answers token by token to reduce perceived latency.",
              "Local speech-to-text for offline practice.",
              "Session history and export to review practice sessions later.",
              "macOS and Linux audio capture, plus a packaged installer."
            ]
          }
        ],
        stack: [
          { group: "Backend", items: ["Python", "FastAPI", "WebSockets", "Pydantic"] },
          { group: "AI", items: ["Whisper", "GPT-4o", "OpenAI-compatible APIs"] },
          { group: "Desktop", items: ["Electron", "JavaScript", "WASAPI"] },
          { group: "Quality", items: ["Pytest", "Latency logging"] }
        ]
      }
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
