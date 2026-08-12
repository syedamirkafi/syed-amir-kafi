export const portfolio = [
  {
    id: "pivot",
    title: "Pivot: An AI-Powered Career Operations Platform",
    tag: "BA",
    status: "in-progress",
    cover: "#F4B400",
    image: "/work-samples/pivot.svg",
    problem:
      "Comparing job offers is a decision problem pretending to be a tracking problem. Everything lives in a spreadsheet, a calendar, and half a dozen emails — and the criteria aren't written down anywhere.",
    solution:
      "I built a tool that forces the criteria out first — what matters, what's non-negotiable. Then every offer gets scored, ranked, and tracked against it, with documents attached and decisions recorded.",
    role: "Business Analyst — requirements & workflow design",
    tech: ["Requirements gathering", "Process mapping", "Decision framework", "Gemini API (for analysis)", "Notion"],
    impact:
      "One structured workflow replaced four separate tools, and every decision I made was traceable to the criteria I'd set.",
    lessons:
      "The most valuable work wasn't the tool — it was forcing the stakeholder (me) to define requirements before evaluating options.",
    tags: ["business-analysis", "requirements", "decision-framework", "ai-assisted-analysis", "ai"],
    github: "https://github.com/syedamirkafi/pivot",
    caseStudy: "/blog/pivot-ai-career-platform",
    type: "Tool / Framework",
    context: "Personal project — AI-assisted BA",
  },
  {
    id: "research-practice",
    title: "80+ Clients, One Discipline: Structured Research",
    tag: "BA",
    status: "shipped",
    cover: "#D90429",
    image: "/work-samples/assignoholic-brief.svg",
    problem:
      "UK university clients needed serious, structured research — across business and IT — done well and done on deadline.",
    solution:
      "I built the analytical frameworks and delivered the reports myself, remotely from Bangladesh — 80+ clients.",
    role: "Research Analyst",
    tech: ["Research methods", "Report writing", "Data analysis", "Frameworks"],
    impact:
      "80+ clients and repeat business — reliability did the marketing.",
    lessons:
      "Clear frameworks make quality repeatable even when the team and topics change.",
    tags: ["research", "reporting", "analysis", "consulting"],
    caseStudy: "/blog/research-80-clients",
    type: "Research Framework",
    context: "Assignoholic Research & Consultancy",
  },
  {
    id: "tableau-dashboard",
    title: "Territory Sales Optimization: 18% Through Data",
    tag: "Data",
    status: "shipped",
    cover: "#0077B6",
    image: "/work-samples/tableau-dashboard.svg",
    problem:
      "A 17-person sales territory needed daily visibility on performance — but data lived in scattered ERP exports and no one had a single view.",
    solution:
      "Built Tableau dashboards: rep scorecards (target vs actual), weekly route rankings, shop-level breakdowns. KPI cards up top, trend lines with target markers. The whole territory checked them every morning.",
    role: "Territory Officer — Sales & Data Analysis",
    tech: ["Tableau", "SQL", "Salesforce", "ERP", "Dashboard Design"],
    impact:
      "18% territory growth in a season. Ranked 13th of 200+ territory officers nationwide.",
    lessons:
      "Dashboards only work when they're the first thing the team opens — not a separate report they have to hunt for.",
    tags: ["dashboard-design", "sales-analytics", "tableau", "data-visualization", "kpi"],
    caseStudy: "/blog/territory-sales-optimization",
    type: "Dashboard",
    context: "Robi Axiata Ltd.",
  },
  {
    id: "bpmn-orders",
    title: "Cutting Two Steps from Order Picking at Picnic",
    tag: "Process",
    status: "shipped",
    cover: "#121212",
    image: "/work-samples/bpmn-orders.svg",
    problem:
      "Picnic's warehouse order-picking flow had invisible waste — steps that added time but no value, undocumented and unquestioned.",
    solution:
      "Mapped the end-to-end process in BPMN, ran a gap analysis with floor walkers, identified two redundant steps. Documented the current state before change so everyone started from the same baseline.",
    role: "Working Student — Operations & Process Support",
    tech: ["BPMN", "Process Mapping", "Gap Analysis", "Stakeholder Workshops"],
    impact:
      "2 steps removed across every shift — scaled warehouse-wide.",
    lessons:
      "The map isn't the artifact — the shared understanding it creates is. Document before you optimize.",
    tags: ["bpmn", "process-improvement", "operations", "warehouse", "process-mapping"],
    caseStudy: "/blog/picnic-order-picking",
    type: "Process Map",
    context: "Picnic Technologies",
  },
];
