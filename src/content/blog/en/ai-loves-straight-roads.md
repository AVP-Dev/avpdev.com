---
title: "AI Loves Straight Roads: Why Local Optimization Breaks Complex Systems"
description: "Why AI degrades architecture in complex projects. Local greedy shortcuts, broken abstractions, GitClear code churn data, and the green test paradox."
pubDate: 2026-09-14
heroImage: "../../../assets/images/blog/ai-loves-straight-roads.webp"
tags: ["AI", "System Architecture", "Technical Debt", "Refactoring", "GitClear", "Engineering"]
draft: false
---

When Redis creator Salvatore Sanfilippo declared that code has become cheap raw material and that line-by-line review is a waste of time ([read my deep dive on that paradox](/en/blog/control-ideas-not-code)), many developers rejoiced: *“Great! We can just generate everything with agents, run automated tests, and never look inside!”*

Yet as soon as you apply this approach to real production environments, an unsettling pattern begins to emerge.

As long as you ask an AI to write a one-off parser, build a slick landing page animation, or script a database migration, it feels like pure sorcery. The model seems sharper than a high-salary senior engineer.

The moment you unleash agents on a real enterprise backend—with distributed transactions, message queues, and a dozen interdependent services—the system begins to rot from within.

Why does this happen? The answer lies in the fundamental nature of Large Language Models: **AI is a greedy, local optimizer. It loves straight roads.**

---

### Chesterton’s Fence and Machine Logic

In classical philosophy, there is a famous principle known as **Chesterton’s Fence**:

> **Context: Chesterton’s Fence**  
> In 1929, philosopher G.K. Chesterton proposed a simple rule: if you encounter a fence across a field that seems completely useless and obstructs your path, you are not allowed to tear it down until you discover *why and for what purpose it was built*. The person who put it there had a reason, even if it isn't obvious at first glance.

AI agents behave in the exact opposite manner. They identify the immediate trajectory `Point A → Point B` and bulldoze every fence in their way because a straight line is shorter.

Consider a standard architecture pipeline in an enterprise CRM/ERP:
```
[HTTP Controller] 
       ↓ 
 [Input DTO / Zod Validation] 
       ↓ 
  [Application Service] 
       ↓ 
[Domain Repository Interface] 
       ↓ 
[PostgreSQL Database with Transaction / Audit Logging]
```

Suppose you instruct an agent: *“Add an endpoint to notify our third-party logistics partner about order status updates.”*

What does an experienced human engineer do? They publish an `OrderExportRequested` domain event to a queue (RabbitMQ/Redis Stream), attach an asynchronous consumer, configure retry policies with exponential backoff, and write an entry into an audit log. Is it complex? Yes. Does it require boilerplate? Absolutely.

What does the AI agent do? It inspects the controller and reasons: *“Why traverse four layers of abstraction? I can invoke `fetch('https://api.delivery.com')` inline right here in the controller and immediately return a response to the client. Task done, 50 lines saved, unit test passes in 2 milliseconds!”*

Technically, the code is spotless. It compiles. It passes on your laptop.

That "fence" of abstraction layers wasn't built for decoration. It existed to protect the system against:
* Blocking the web worker process during a 10-second external network timeout.
* Leaking PII into raw HTTP request logs.
* Inconsistent state if the external API returns a 500 error after the local database record has already been committed.

The AI shortened the path. It eliminated code. And in doing so, it compromised the architectural resilience of the entire platform.

---

### Accidental vs. Essential Complexity

> **Who is Fred Brooks?**  
> The legendary system architect behind the IBM System/360, Turing Award laureate, and author of the classic software engineering book *The Mythical Man-Month*. Brooks famously established Brooks's Law: adding manpower to a late software project only makes it later.

In his landmark 1986 essay *«No Silver Bullet»*, Fred Brooks divided software engineering complexity into two distinct categories:
1. **Accidental Complexity:** syntactic boilerplate, configuration quirks, manual type mapping, build tooling. The friction engineers fought for decades.
2. **Essential Complexity:** the inherent nature of the domain problem—idempotency across network failures, race conditions on shared balances, and business state invariants.

AI is peerless at destroying *accidental* complexity. It drafts DTOs, validates schemas, and generates boilerplate faster than you can pour a cup of coffee.

When confronted with *essential* complexity, however, an agent attempts to treat it as accidental—by simply erasing it.

In my own work, I observed an AI attempting to refactor a real-time state synchronization pipeline based on PostgreSQL's `LISTEN/NOTIFY` and worker pools. The model enthusiastically proposed replacing the whole pipeline with a simple `setInterval` polling `SELECT * FROM table WHERE updated_at > ...`.

To the model, this looked brilliant: *“Look, I eliminated 200 lines of complex event bus wiring!”* The fact that a naive polling loop would saturate the primary database under 5,000 concurrent clients simply fell outside the model's contextual horizon.

---

### What the Data Shows: GitClear’s 2024–2026 Longitudinal Study

This isn't mere nostalgia from veteran developers. Analytics firm **GitClear** conducted an extensive study analyzing over **200 million lines of code** across open-source and commercial repositories:

1. **Doubling of Code Churn:**
   * In 2021 (prior to mass AI code assistant adoption), the baseline `churn` rate (code modified, reverted, or deleted within two weeks of authoring) stood at **3.3%**.
   * By 2025–2026, code churn had spiked to **7.1% – 8.2%**.  
   Developers write code significantly faster, but that code survives in production half as long.

2. **A 4x Surge in Duplicate Code (Code Clones):**
   * AI agents rarely perform structural refactoring across existing abstractions (`move / update`).
   * Models are 4 times more likely to duplicate logic blocks into isolated helpers with minor modifications, violating DRY (Don’t Repeat Yourself).

Why? Because an agent operates within its local context window. It is computationally cheaper for a model to copy-paste a modified utility than to analyze the complete dependency graph and cleanly evolve an existing shared service.

---

### System Degradation Under Green Tests

The most treacherous quality of AI-generated code is that it **looks pristine**.

When a junior developer writes subpar code, bad indentation, strange variable names, and absent tests give it away immediately.

AI code, conversely, features clean indentation, strict TypeScript interfaces, polished JSDoc annotations, and a suite of passing unit tests. Yet underneath, the architecture can silently decompose into an unmaintainable monolith:

```
                    ┌─ workaround (AI-fix 1)
                    ├─ direct fetch bypassing queue (AI-fix 2)
[PRISTINE SYSTEM] ──┼─ duplicated helper (AI-fix 3)
                    ├─ inline sql query (AI-fix 4)
                    └─ special case flag (AI-fix 5)
```

Each isolated change appears reasonable in a PR diff. Each satisfies its local acceptance criteria. Taken together, however, they build what is known as **AI Technical Debt**.

The system loses its conceptual integrity. Multiple diverging paths emerge across the codebase to accomplish the exact same task.

---

### Key Takeaway

AI is not broken. It acts as an optimal mathematical solver for a local objective function. When prompted to "build feature X," it finds the shortest path to X while remaining blind to the ecosystem outside the prompt.

Trying to solve this by manually reading every line of generated diff is impossible at modern generation volumes.

What we need is an architectural framework that forces AI agents to **stay strictly on rails designed by human engineers**.

In our final piece of the series, we examine that practical system:  
👉 **“The Architect of the Future: Shifting from Line Reviews to Design Reviews”** (coming September 16).

We explore the **Skeleton + Pluggable Modules** pattern, Salvatore Sanfilippo’s `DESIGN.md` artifact, and an actionable delegation matrix defining what to hand over to AI completely—and what to never let it touch.

---

*Also read: [Code Became Cheap. Engineering Thinking Did Not](/en/blog/control-ideas-not-code) | [AI-Friendly Code Architecture: 5 Essential Rules](/en/blog/ai-friendly-code-architecture)*
