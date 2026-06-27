# AI Product Engineering with TypeScript - Assignment 1

## Overview

This project is my submission for the **AI Product Engineering with TypeScript** assignment.

The objective is to implement several common LLM application patterns discussed during the course using **TypeScript**, **Anvia SDK**, and **OpenAI**.

Each case demonstrates a different AI workflow rather than relying on a single large prompt.

---

## Tech Stack

* TypeScript
* Node.js
* pnpm
* Anvia SDK (`@anvia/core`, `@anvia/openai`)
* OpenAI
* Zod
* Tavily (Case 3)

---

## Project Structure

```text
src/
├── case-1.ts
├── case-2.ts
├── case-3.ts
└── utils.ts
```

---

## Cases

### Case 1 – Customer Billing Request

**Scenario**

> "Why was I charged twice? Please fix it now."

**Pattern Used**

* Agentic Workflow Decision
* Guardrail & Escalation

**Description**

The AI first decides what action should be taken before answering the customer.

Possible actions include:

* Answer directly
* Ask for more information
* Hand off to a human support agent

---

### Case 2 – Meeting Transcript Summarization

**Scenario**

A long meeting transcript needs to be summarized into:

* Decisions
* Risks
* Action Items

**Pattern Used**

* Map-Reduce Summarization

**Description**

The transcript is divided into smaller chunks.

Each chunk is summarized independently before being combined into one structured summary.

---

### Case 3 – Company Profile Generator

**Scenario**

A user provides a company name and requests:

* Company profile
* Official website
* Industry

**Pattern Used**

* Research Extraction Pipeline

**Description**

The application searches for public information before extracting structured company data.

---

## Installation

Install dependencies:

```bash
pnpm install
```

Create a `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key
TAVILY_API_KEY=your_tavily_api_key
```

---

## Running the Project

Run each case individually.

Case 1

```bash
pnpm tsx src/case-1.ts
```

Case 2

```bash
pnpm tsx src/case-2.ts
```

Case 3

```bash
pnpm tsx src/case-3.ts
```

---

## Learning Outcomes

This assignment demonstrates how different AI application patterns solve different kinds of problems:

* Making decisions before responding
* Summarizing long documents
* Retrieving and extracting structured information
* Producing predictable outputs with Zod schemas
* Building modular AI workflows instead of relying on one large prompt

---

## Author

Assignment completed as part of **AI Product Engineering with TypeScript**.
