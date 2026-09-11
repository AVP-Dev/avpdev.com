---
title: "Code Became Cheap. Engineering Thinking Did Not"
description: "Redis creator Salvatore Sanfilippo argues reading AI code is a waste of time. Why code is no longer the engineer's primary product and who owns the system."
pubDate: 2026-09-11
heroImage: "../../../assets/images/blog/control-ideas-not-code.webp"
tags: ["AI", "Architecture", "Engineering", "Redis", "Clean Code", "Future of Tech"]
draft: false
---

In the summer of 2026, an event shook the software engineering world that many tried to brush off as just another wave of artificial intelligence hype.

**Salvatore Sanfilippo** published an essay with an unmistakable title: [«Control the ideas, not the code»](https://antirez.com/news/169).

> **Who is Salvatore Sanfilippo (antirez)?**  
> For those outside the systems realm: Salvatore is the legendary Italian engineer and creator of **Redis**. Redis is an ultra-fast in-memory key-value data store that powers performance for virtually every high-load system on earth: from session caching at Twitter and GitHub to queue processing at Netflix. Salvatore spent 15 years writing Redis in pure C, meticulously obsessing over every pointer, byte of RAM, and CPU cycle. He is someone for whom code craftsmanship and readability were a sacred craft.

And now, this very engineer states: **spending time reading and line-by-line reviewing AI-generated code today is suboptimal and mostly pointless.**

On X, he was immediately challenged by Matteo Collina (Node.js Technical Steering Committee member and creator of Fastify):  
*“Wait, but didn’t you say that you check all the AI-generated code for Redis?”*

Sanfilippo’s response was disarming:  
*“Yes, I do. But only out of respect for contributors and users who open Redis files and modify code by hand. If I had my hands free, I wouldn't do it. I would spend all that time doing more QA, thinking about optimization tricks, and writing a DESIGN.md file where each data structure and idea is described in human language. Let the model write the code.”*

When a junior developer says this after a two-week bootcamp, it’s naive. When the creator of Redis says it, it marks a paradigm shift.

---

### The Economic Reality: Code Costs Zero

Over my 10+ years in commercial software development, I grew accustomed to code being a scarce, expensive resource. Writing high-quality software required immense manual labor: memorizing standard libraries, handcrafting type adapters, wrangling boilerplate, mapping DTOs, and writing tests.

The traditional production formula was:

```text
Idea → Architecture → [Writing Code: 80% of Effort] → Code Review → Testing → Production
```

In 2026, generating 5,000 lines of syntactically valid TypeScript, Go, or Python takes 90 seconds and costs a fraction of a cent in LLM tokens.

Code is no longer scarce. **It has become cheap raw material.**

And here lies the paradox businesses often overlook in their race for efficiency:  
A business never cared about the code itself. Business owners don't care whether you use NestJS or raw HTTP routers, or whether your switch statements look elegant. Business cares about one thing: **does the system solve the problem, stay resilient under load, and generate value?**

If code is generated in seconds, the fundamental engineering question changes: **Who owns the result?**

---

### Torvalds on Compilers: The Historical Perspective

When the tech sphere was flooded in early 2026 with victorious headlines claiming that "99% of code is now written by AI and programmers are obsolete," Linux and Git creator **Linus Torvalds** shut down the hype with characteristic precision:

> *“Saying that 99% of code is AI-written is like saying that 100% of code is written by compilers.”*

> **Background: Linus Torvalds** — creator of the Linux operating system kernel (powering 90% of global cloud infrastructure and all Android devices) and the Git version control system. He orchestrates open-source collaboration across tens of thousands of developers worldwide.

Torvalds pointed out what hype-chasers miss: compilers have been translating human logic into millions of lines of machine instructions and assembly for over fifty years. Yet no one ever called a compiler the software architect.

Legendary developer **John Carmack** (creator of *Doom* and *Quake*, pioneer of 3D graphics) shared the same view:  
*“Coding was never the sacred value. Problem solving is. Code is just the tax we pay to make a computer understand our intention.”*

AI simply pushed the abstraction layer one step higher. We used to translate business requirements into functions and loops. Now we translate system invariants into architectural constraints for autonomous agents.

---

### Shifting the Control Plane: Implementation vs. Intent

Let’s be honest about traditional Code Reviews. What does a reviewer look for in a 1,500-line pull request?
* Did someone forget a null check?
* Is a variable poorly named?
* Is there a typo in a database column string?
* Should a duplicated helper be extracted?

This is **implementation control**. You are auditing syntax and line mechanics.

When an agent produces thousands of lines a day, reviewing every diff becomes an exhausting illusion. Attention fades after twenty files. The reviewer ends up missing the forest for the trees.

Sanfilippo argues for a radical shift: **stop micromanaging lines of code and start controlling intent:**

| Legacy Era (Implementation Control) | Modern Era (Intent Control) |
| :--- | :--- |
| Writing function bodies manually | Defining problem bounds and invariants |
| Choosing loop structures | Designing architectural scaffolds |
| Auditing diff lines | Verifying system behavioral changes |
| Catching typos in Code Reviews | Conducting Design Reviews of data models & contracts |
| Fixing bugs by hand | Designing testing systems that make bugs impossible |
| Memorizing library APIs | Understanding system boundaries & scale limits |
| Pride in lines of code shipped | Pride in system simplicity and resilience |

---

### Where Sanfilippo Is Vulnerable: The Testing Illusion

The naive takeaway from antirez’s essay would be: *“Great! Stop reading code, prompt an agent, run tests, and ship it.”*

This is what I call the **Naive Trust Trap**.

If you stop inspecting what AI built and rely blindly on "the tests passed, so it works," you are building on quicksand.

Why?  
**Tests only verify what you anticipated to test.**

In 1972, computer science pioneer Edsger Dijkstra formulated a rule that sounds prophetic in 2026:  
*“Program testing can be used to show the presence of bugs, but never to show their absence.”*

If an AI generates an endpoint and all 20 unit tests turn green, that doesn't prove the code is secure. It only proves that under the author's specific happy-path scenario, it returns `200 OK`.

Tests will not catch:
1. An IDOR vulnerability leaking tenant data because a workspace scope filter was omitted.
2. A database deadlock triggered when 10,000 concurrent requests hit a shared record.
3. An unnecessary bloated external dependency with license risks pulled in for a trivial task.

Recent 2025–2026 security benchmarks (notably from Veracode and Stanford HAI) reveal an unsettling reality: **approximately 45% of AI-generated code samples contain OWASP Top 10 vulnerabilities**, even when the code compiles cleanly and passes functional unit tests. Models write syntax effortlessly, but they lack awareness of systemic failure modes.

---

### The Takeaway

Salvatore Sanfilippo is fundamentally right: **the programmer is no longer a keyboard typist.** Our professional identity, long tethered to lines of code written or clever syntax tricks, must give way to rigorous architectural stewardship.

Code has become cheap. But the cost of an architectural blunder has multiplied a hundredfold.

If an architect misjudges the system design, an agent will churn out 10,000 lines of beautifully formatted, fully functional, yet completely wrong code in five minutes—code that will collapse the business at first scale.

*Why is it that AI breaks system architecture so easily the moment a task goes beyond a script or a basic CRUD endpoint? Why does it consistently favor shortcuts that look clean today but turn into maintenance nightmares tomorrow?*

We examine this in detail here: **[«AI Loves Straight Roads: Why Local Optimization Breaks Complex Systems»](/en/blog/ai-loves-straight-roads)**.

> **Open-Source Resource:**  
> If you want to integrate robust architectural rails and specification templates for coding agents into your projects today, check out my open starter: **[AVP-Dev / agent-starter-kit on GitHub](https://github.com/AVP-Dev/agent-starter-kit)**.

---

*Also read: [Ghosts in the Machine: Traps of AI Development](/en/blog/ghost-in-the-machine) | [AI: The Most Capable and Dangerous Student](/en/blog/ai-capable-dangerous-student)*
