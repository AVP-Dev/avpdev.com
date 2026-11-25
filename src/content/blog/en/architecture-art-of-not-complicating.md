---
title: "Architecture Is the Art of Not Overcomplicating"
description: "Why engineering maturity is measured not by how many tools you add, but by what you leave out. Practical lessons from NYX System, Pravia, and PostgreSQL Queue."
pubDate: 2026-11-26
heroImage: "../../../assets/images/blog/architecture-art-of-not-complicating.webp"
tags: ["architecture", "engineering", "PostgreSQL", "AI", "system design", "pragmatism"]
draft: false
---

In our previous series, we looked closely at how AI changes day-to-day development: [code has become a cheap commodity](/en/blog/control-ideas-not-code), models [cut through critical architectural layers for shorter paths](/en/blog/ai-loves-straight-roads), and the engineer's role has [shifted toward Design Review](/en/blog/architect-of-the-future).

Yet even if you take AI completely out of the picture, a much older engineering problem remains.

Early in our careers, skill is often equated with **how many moving parts we can wire together**. The more boxes on the diagram — Kafka, Redis, Elasticsearch, a service mesh, multiple event buses, five abstraction layers — the more impressive the system looks.

With experience, the perspective shifts: **engineering maturity is defined not by how many technologies you can introduce, but by how many you can purposefully leave out under real-world constraints.**

Good architecture is neither the simplest nor the most complex. It is an architecture where **every single element has a justified reason to exist**.

---

### In This Article:
- [Two Extremes: Overengineering and Underengineering](#two-extremes)
- [Simplicity ≠ Primitiveness: The NYX System Case](#simplicity-not-primitivity)
- [The True Cost of Complexity: PostgreSQL Queue and Pravia](#cost-of-complexity)
- [Designing for the Future Without Guessing](#design-for-future)
- [The Role of AI: Why Restraint Matters Even More](#ai-role)
- [When Complexity Is Necessary & The Architect's 4 Questions](#architect-filter)

---

## 1. Two Extremes: Overengineering and Underengineering {#two-extremes}

Architectural debates often collapse into a false choice: *"either we build full multi-layered enterprise architecture by the book, or we keep everything crudely straightforward."*

In reality, **overengineering** and **underengineering** are two sides of the same failure: disconnecting technical decisions from actual domain constraints.

| System State | What Happens in Code & Infra | Cost to the Product |
| :--- | :--- | :--- |
| **Underengineering (Primitiveness)** | Direct `DELETE` queries with no audit trail, business logic inside controllers, synchronous external API calls inside DB transactions. | Fast initial launch, followed by fragility under load, data integrity risks, and painful production incidents. |
| **Justified Simplicity (Balance)** | Minimal moving parts, paired with strict invariants at the boundaries: transactions, contracts, data isolation, and predictable failure modes. | Straightforward operations, predictable iteration speed, and production stability. |
| **Overengineering (Cargo Cult)** | Microservices for a small team, external message brokers for modest job volumes, premature abstractions built without a confirmed second use case. | Extra infrastructure bills, Dual-Write consistency bugs, and slower feature delivery. |

Both extremes erode a product's viability. Underengineering threatens reliability *from the outside* (outages and security flaws), while overengineering slows evolution *from the inside* (maintenance overhead and cognitive load).

---

## 2. Simplicity ≠ Primitiveness: The NYX System Case {#simplicity-not-primitivity}

The most common mistake when talking about "keeping things simple" is confusing simplicity with primitiveness.

You cannot sacrifice security, data integrity, or fault tolerance for a cleaner diagram. Just like [**Chesterton's Fence**](/en/blog/ai-loves-straight-roads), many constraints exist not for aesthetics, but because the domain demands them.

> **Reference: Essential vs. Accidental Complexity**  
> In *No Silver Bullet*, Fred Brooks divided complexity into *accidental* (caused by tools, boilerplate, and unnecessary layers) and *essential* (inherent to the problem domain itself). Removing accidental complexity is craftsmanship. Cutting out essential complexity leads directly to failures.

A clear example is [**NYX System**](/en/project/project-nyx-system), a multi-tenant industrial ERP/MES platform built with Go and PostgreSQL.

At first glance, tracking factory orders and inventory looks like basic CRUD: create a record, edit quantities, delete mistakes.

On a real factory floor, that kind of oversimplification quickly turns into accounting and security issues:
* **Immutable Ledger Accounting ("Storno").** Direct deletions and silent overwrites are blocked at the database level. Every correction must be recorded as a reversing audit entry, preventing inventory mismatches and keeping financial history verifiable.
* **Privacy Mode on Shop-Floor Tablets.** Floor operators only see anonymized order codes (`#ORD-2026-404`) without client names or pricing, reducing the risk of customer list leaks.
* **Contract-First (OpenAPI) & Tenant Isolation.** Strict typed contracts uniting office administration and shop-floor PWAs.

Did these safeguards make NYX System more complex than basic CRUD? Yes. Yet this is **essential complexity**: every mechanism addresses a concrete operational and financial risk.

---

## 3. The True Cost of Complexity: PostgreSQL Queue and Pravia {#cost-of-complexity}

If NYX System illustrates where complexity is **mandatory**, the next two projects show the opposite choice — where omitting extra components simplifies operations and improves predictability.

Every new dependency, external service, or abstraction layer carries a **Total Cost of Ownership (TCO)**:
1. Operational overhead (RAM, networking, monitoring, backups, alerts).
2. New failure modes and state synchronization bugs.
3. Cognitive load when investigating production incidents.

### Case 1: PostgreSQL Queue — Operating Without a Separate Broker

For background jobs (emails, webhooks, document indexing, LLM calls), teams often reach for `Redis + BullMQ` or `RabbitMQ` by default.

In small-to-medium B2B systems, a separate broker often introduces more operational friction than value:
* Another service to monitor, patch, and protect against state loss on restarts.
* The classic **Dual-Write** problem: a PostgreSQL transaction commits, while publishing the job to Redis fails over the network (or vice versa).

In [**Postgres Queue**](/en/project/project-postgres-queue), we intentionally avoided adding an external broker and built the queue directly on top of the existing PostgreSQL instance:

```text
[Business Mutation] + [Enqueue Job Row]
                     │
                     ▼  Single ACID Transaction (Transactional Outbox)
               [PostgreSQL]
                     │
                     ▼  FOR UPDATE SKIP LOCKED (no worker idle waiting)
     [Workers] ───► Idempotent Execution / Backoff + Jitter / DLQ
```

**Why this worked in our context:**
* **Eliminating Dual-Write:** business state changes and job scheduling execute inside the same ACID transaction (Transactional Outbox).
* **Non-blocking job distribution:** `FOR UPDATE SKIP LOCKED` lets concurrent workers skip rows already locked by other threads. Row-level locks still exist, of course, but workers never stall waiting for them to release.
* **Delivery guarantees and idempotency:** because retries and stale-job recovery provide *at-least-once* delivery semantics, workers were designed to be idempotent (using deterministic keys), with exhausted jobs routed to a Dead-Letter Queue.
* **Unified reliability & resource savings:** jobs are covered by standard PostgreSQL WAL and database backups, and dropping a separate broker container cut baseline RAM usage for the queuing layer by roughly **70%** compared to running a dedicated Redis/RabbitMQ node.

When queue throughput hits database I/O limits or complex stream routing is required, a dedicated broker becomes the right tool. Until then, PostgreSQL alone is easier to operate and stronger on data consistency.

### Case 2: Pravia — Shortening the Data Path Under Load

In the B2B RAG platform [**Pravia**](/en/project/project-pravia), we needed fast vector retrieval across enterprise knowledge bases under high concurrent load.

Instead of splitting the system into an external embedding API, a standalone vector database, and an extra queue for analytics from day one, we minimized network hops:
* Kept vector storage and retrieval inside PostgreSQL using `pgvector` with tuned HNSW indexes.
* Moved query vectorization from external cloud APIs to local CPU inference via **ONNX Runtime** (`EmbeddingGemma-300M`), eliminating network roundtrips and cutting embedding compute costs by up to **90%** compared to metered cloud embedding APIs at the same request volume.

Initial `k6` load tests exposed a bottleneck: `p95` latency spiked to **19.7s** due to database connection pool locks during synchronous analytics writes. We addressed the root causes directly at the data-path level:
* moved analytics writes off the critical path into asynchronous batching;
* reduced the duration and contention of transactional database operations during search;
* isolated the ONNX worker pool.

After these changes, **the retrieval and context-preparation stage** (query vectorization + `pgvector` HNSW lookup, excluding streaming LLM generation over SSE) dropped to **`164ms` p95** at 300 concurrent users (0% errors). Under a peak test of `1,000 VU`, a single standard VPS sustained `46 req/s` with a `99.98%` success rate.

---

## 4. Designing for the Future Without Guessing {#design-for-future}

A common objection is: *"If we don't build for scale upfront, won't we have to rewrite everything from scratch later?"*

The key is separating **clean boundaries** from **premature implementation**:
* **Premature complexity:** deploying Kubernetes, Kafka, and eight microservices on day one for a small user base.
* **Designing for growth:** maintaining clear module boundaries and explicit contracts *inside* a single deployment.

In **NYX System**, instead of running DDL migrations for every custom manufacturing route, evolving domain attributes were placed in `JSONB` validated at the contract boundary. The schema stays strict where integrity is critical (money, stock, reversals) and flexible where attributes evolve.

A system's ability to grow depends not on how many services you start with, but on how cleanly responsibilities are separated — so you can extract a component into its own node on the exact day metrics justify it.

---

## 5. The Role of AI: Why Restraint Matters Even More {#ai-role}

In the era of coding agents, the temptation to overcomplicate has grown.

Previously, sheer manual effort acted as a natural brake: wiring up an extra broker, writing multiple factory layers, or splitting services took days of work, forcing you to pause and ask whether it was truly needed.

Today, an AI agent can generate boilerplate, layers, and configs in a couple of minutes. **The cost of generating implementation has dropped to near zero — but the cost of complexity itself has not.**

Debugging, operating, and reasoning about that complexity still carry the exact same price. An agent does not own production at 3 AM or guide the system's evolution a year later (see [Pair Programming with Two AI Agents](/en/blog/pair-programming-two-ai-agents) for more on agent accountability). The faster code is written, the more valuable the discipline to say: *"This layer doesn't belong here."*

---

## 6. When Complexity Is Necessary & The Architect's 4 Questions {#architect-filter}

> **An Important Balance:**  
> Avoiding complexity should never become a dogma of its own. Sometimes an extra layer, a separate service, or a stricter contract is not overengineering — it is a deliberate trade-off to reduce risk.  
> The architect's job is not to fight complexity blindly, but to manage it.

Added complexity is justified and necessary when it addresses real systemic risks: isolating critical failures (so a reporting job cannot take down billing), enforcing audit and security guarantees (as in NYX System), scaling genuine bottlenecks independently, or separating ownership across multiple teams.

To tell deliberate necessity apart from cargo culting, run any new library, service, queue, or abstraction layer through four questions:

1. **What exact invariant or failure mode does this protect?** If the answer is "best practice" or "just in case for future scale," the element isn't justified.
2. **What risks arise if we leave this solution out?** Certain safeguards (audit trails, tenant isolation, idempotency) must exist before the first incident occurs. However, if omitting an element creates no real risk to security, data integrity, or current load, it is accidental complexity.
3. **Can we solve this with what is already in the stack?** Often PostgreSQL transactions, thoughtful table design, or a clean in-process module solve the problem without a new infrastructure node.
4. **What will this cost to own a year from now?** Measure monitoring, debugging, and onboarding overhead — not how fast the code can be generated.

---

### Closing Thought

Architecture is neither a collection of trendy patterns nor minimalism at any cost.

**Good architecture is neither the simplest nor the most complex.** It is a system where every dependency, table, layer, and boundary has a clear, explainable reason to exist. Everything else is noise you eventually pay for with team velocity and production stability.

---

*More in the series on engineering mindset:*
1. [Code Became Cheap. Engineering Mindset Did Not](/en/blog/control-ideas-not-code)
2. [AI Loves Straight Roads: Why Local Optimization Breaks Complex Systems](/en/blog/ai-loves-straight-roads)
3. [Architect of the Future: From Line-by-Line Code Review to Design Review](/en/blog/architect-of-the-future)
4. **Architecture Is the Art of Not Overcomplicating** (this article)
