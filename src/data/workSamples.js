// Image convention: drop a real screenshot at public/work-samples/<id>.png
// (16:9, 1200x675 recommended) and point `image` at it, e.g. "/work-samples/<id>.png".
// Until a real screenshot exists, the labeled SVG placeholder at the same path is used.
export const workSamples = [
  {
    id: "tableau-dashboard",
    title: "Territory reports & dashboards",
    type: "Dashboard",
    context: "Sales analytics at Robi Axiata Ltd.",
    summary:
      "Rep scorecards with target vs. actual, weekly route rankings, and shop-level breakdowns — KPI cards up top, target lines on the trends. The whole 17-person territory checked them every morning.",
    outcome: "+18% territory sales in a season",
    image: "/work-samples/tableau-dashboard.svg",
    link: "/blog/tableau-sales-dashboards",
  },
  {
    id: "keyb-stock",
    title: "Stock & pricing system",
    type: "Stock table",
    context: "Operations at KeyB Imports",
    summary:
      "One table behind every stock and pricing call — each SKU with its level, its price, a low-stock flag, and money in versus out, so restock decisions ran on facts.",
    outcome: "Restock and pricing decisions moved off guesswork",
    image: "/work-samples/keyb-stock.svg",
    link: "/blog/keyb-stock-pricing",
  },
  {
    id: "bpmn-orders",
    title: "Order-picking BPMN workflow",
    type: "Process map",
    context: "Process improvement at Picnic",
    summary:
      "An end-to-end BPMN of order picking, then a gap analysis that flagged two redundant steps — documented before the change, so everyone started from the same baseline.",
    outcome: "2 steps removed across every shift",
    image: "/work-samples/bpmn-orders.svg",
    link: "/blog/picnic-order-picking",
  },
  {
    id: "banking-bpmn",
    title: "Banking ops process documentation",
    type: "Process docs",
    context: "Branch operations at Dhaka Bank",
    summary:
      "The FLEXCUBE branch-operation flows written into numbered SOPs, so the team could run the branch without supervision.",
    outcome: "Documented processes anyone could follow",
    image: "/work-samples/banking-bpmn.svg",
    link: "/blog/bpmn-banking-ops",
  },
  {
    id: "assignoholic-brief",
    title: "Brief-breakdown framework",
    type: "Brief framework",
    context: "Client handling at Assignoholic",
    summary:
      "A vague assignment brief turned into agreed scope — topic, word count, referencing, deadline — before research began. The same skeleton held across 80+ UK university clients.",
    outcome: "Vague briefs became scope the writer and client agreed on",
    image: "/work-samples/assignoholic-brief.svg",
    link: "/blog/research-80-clients",
  },
];
