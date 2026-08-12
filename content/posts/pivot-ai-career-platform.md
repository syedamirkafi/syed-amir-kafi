---
title: "Pivot: An AI-Powered Career Operations Platform"
date: "2026-08-01"
category: PROJECTS
section: tech
status: in-progress
style: browser
tags: [react, typescript, node, firebase, gemini-api, ai]
excerpt: "Building a web tool that automates document generation and data extraction from job postings — the project that turned my job search into a product."
cover: "#F4B400"
featured: true
order: 6
---

Job searching is a data problem wrapped in a document problem. Every application needs a tailored CV, a cover letter, and a tracker — and doing it by hand is repetitive, error-prone work. So I built **Pivot**, an AI-powered career operations platform.

## What it does

- **Automates document generation** from job postings using AI APIs — cutting hours of manual, repetitive formatting per application.
- **Extracts structured data** from postings so nothing important slips through the cracks.
- **One dashboard** with Kanban-style tracking, calendar scheduling, and analytics to manage the end-to-end process.

## The stack

React, TypeScript, Node.js, Firebase, and the Google Gemini API. The architecture was deliberately simple: a web frontend, a service layer for the AI calls, and Firebase for state — enough to ship something real instead of an architecture diagram.

## What I learned

- **AI as a workflow multiplier** — the value isn't in generating text; it's in removing the boring, repetitive steps so the human can focus on judgment.
- **Product thinking about my own process** — building the tool forced me to model my job search as a pipeline: inputs, stages, and metrics. The same mental model I use for any operations process.
- **Shipping beats perfecting** — the project went from idea to working tool because scope was ruthlessly trimmed.

> Automation is best applied to the work you hate most — it's where the waste is.

Pivot is on GitHub at [github.com/syedamirkafi/pivot](https://github.com/syedamirkafi/pivot). It also grew into something bigger: the open-source system I now run my entire German job search on.
