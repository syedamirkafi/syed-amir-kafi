export const skillGroups = [
  {
    id: "business",
    label: "Business Analysis",
    icon: "briefcase",
    description: "Understanding the problem and the people before touching a tool.",
    skills: [
      { name: "Business Analysis", evidence: ["Pivot", "Research Practice"] },
      { name: "Requirements Gathering", evidence: ["Pivot", "Picnic"] },
      { name: "Stakeholder Interviews", evidence: ["Pivot", "Picnic", "Robi"] },
      { name: "Requirements Traceability", evidence: ["Pivot"] },
      { name: "Process Mapping (BPMN)", evidence: ["Picnic", "Dhaka Bank"] },
      { name: "KPI Design", evidence: ["Robi", "KeyB Imports"] },
      { name: "Root Cause Analysis", evidence: ["Picnic", "Robi"] },
      { name: "Digital Transformation", evidence: ["Pivot", "Picnic", "Education"] },
    ],
  },
  {
    id: "data",
    label: "Data & Dashboards",
    icon: "grid",
    description: "Taking operational data and turning it into something teams actually look at.",
    skills: [
      { name: "SQL", evidence: ["Robi", "KeyB Imports"] },
      { name: "Power BI", evidence: ["Pivot", "Education (PL-300 planned)"] },
      { name: "Tableau", evidence: ["Robi"] },
      { name: "Excel", evidence: ["Robi", "Dhaka Bank", "KeyB Imports", "Research Practice"] },
      { name: "Data Visualization", evidence: ["Robi", "Pivot", "Picnic"] },
      { name: "Dashboard Design", evidence: ["Robi", "KeyB Imports"] },
      { name: "Python (for analysis)", evidence: ["Pivot", "Education"] },
      { name: "Google Data Analytics", evidence: ["Education (in progress)"] },
    ],
  },
  {
    id: "aiassisted",
    label: "AI-assisted BA",
    icon: "sparkles",
    description: "Cutting hours off the repetitive parts of analysis.",
    skills: [
      { name: "AI-assisted analysis", evidence: ["Pivot", "Research Practice"] },
      { name: "AI Workflow Design", evidence: ["Pivot"] },
      { name: "Microsoft Copilot", evidence: ["Education", "Daily work"] },
      { name: "Document summarization", evidence: ["Research Practice", "Pivot"] },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "grid",
    description: "The everyday stack teams like this run on.",
    skills: [
      { name: "Jira", evidence: ["Pivot", "Education"] },
      { name: "Notion", evidence: ["Pivot", "Research Practice"] },
      { name: "Miro", evidence: ["Pivot", "Picnic"] },
      { name: "Confluence", evidence: ["Pivot", "Education"] },
      { name: "Microsoft 365", evidence: ["Daily work", "Education"] },
      { name: "Slack", evidence: ["Picnic", "Pivot"] },
    ],
  },
];

export const systemSkills = [
  "Salesforce",
  "Oracle ERP",
  "WMS (warehouse management)",
  "Flexcube Core Banking",
];
