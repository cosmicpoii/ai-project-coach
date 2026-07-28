# Project Catalog Methodology

This document explains how the AI Project Coach catalog is scoped, labeled, and maintained. The goal is to make project recommendations consistent, explainable, and testable rather than relying on arbitrary tags or end-to-end LLM generation.

## 1. Catalog purpose

The catalog contains reproducible portfolio projects for beginners. Each project should:

- produce a concrete portfolio artifact;
- teach skills that appear in real job descriptions;
- be small enough to complete in roughly 20–60 hours;
- work with free, local, or free-tier tools where possible;
- have a clearly defined MVP rather than reproducing an entire reference product;
- be distinguishable from other catalog projects by skills, difficulty, or project type.

The initial catalog has 18 projects across six directions:

- frontend;
- backend;
- full-stack;
- data analysis;
- machine learning;
- automation and cloud.

The target learner used for estimates is a computer beginner who may know basic programming, has not completed many independent projects, and can spend approximately 5–10 hours per week.

## 2. Scope before labels

Metadata should only be assigned after the project MVP has been defined. A large reference application is not the expected deliverable.

For each candidate project, first document:

1. the user problem;
2. the must-have features;
3. features that are explicitly out of scope;
4. the final artifacts a learner should be able to demonstrate.

Example:

```text
Customer Support Portal

Must have:
- customer ticket submission;
- ticket list and detail pages;
- agent status updates;
- comments;
- a basic agent dashboard.

Out of scope:
- live chat;
- email ingestion;
- multi-tenancy;
- complex SLA automation;
- AI-generated replies.
```

This prevents reference implementations from making the estimated difficulty and time unrealistically large.

## 3. Field definitions

### `id`

A stable identifier used by the frontend, recommendation pipeline, evaluation data, and future database records.

IDs follow the pattern `<direction>-<number>`:

```text
fe-01  frontend
be-01  backend
fs-01  full-stack
da-01  data analysis
ml-01  machine learning
ac-01  automation and cloud
```

An ID should not change when the project title or description is edited.

### `title`

A short, specific name that describes the product or outcome. Avoid vague titles such as “React Project” or “Machine Learning App.”

### `direction`

The primary project family. It supports catalog coverage, diversity constraints, filtering, and evaluation.

Allowed values:

```text
frontend
backend
full-stack
data-analysis
machine-learning
automation-cloud
```

A project can use skills from several directions, but it should have one primary direction.

### `description`

A one- or two-sentence statement of what the learner will build and what problem it solves.

The description is used for:

- recommendation result cards;
- semantic matching;
- human catalog review.

It should describe the project itself, not list every implementation detail.

### `skills`

Skills are capabilities that a learner can demonstrate through a concrete feature, artifact, analysis, or piece of code.

For every skill, a curator should be able to answer:

> Where in this project does the learner demonstrate this skill?

Good mapping:

```text
Keyboard navigation and screen-reader labels -> accessibility
Typed job and filter models -> typescript
Filtering and saved-job state -> state-management
```

Guidelines:

- include approximately 3–5 core skills;
- add no more than 2–3 supporting skills;
- prefer discriminative skills over universal tools;
- use normalized lowercase slugs;
- do not include tools such as Git or VS Code on every project;
- keep aliases in a separate skill taxonomy.

For example, `machine learning`, `ML`, and `predictive modeling` should map to a normalized skill such as `machine-learning`.

### `difficulty`

Difficulty represents conceptual and integration complexity, not only project size.

Levels:

```text
1 = beginner
2 = intermediate
3 = advanced
```

Score each project from 1–3 on five dimensions:

| Dimension | 1 | 2 | 3 |
| --- | --- | --- | --- |
| Technology integration | One main technology | Two or three integrated technologies | Multiple services or runtimes |
| Data complexity | Static or local data | Relational data | Transactions, concurrency, queues, or complex modeling |
| System interaction | Basic UI or CRUD | Authentication, charts, or external APIs | Realtime, asynchronous, or distributed workflows |
| Conceptual complexity | Basic scripting or UI | State management, statistics, or applied modeling | Concurrency, experimental design, or advanced ML |
| Deployment complexity | Static deployment | Application plus database | Multiple services or cloud infrastructure |

Convert the average:

```text
1.0–1.5 -> difficulty 1
1.6–2.3 -> difficulty 2
2.4–3.0 -> difficulty 3
```

The scoring notes may be stored in a research worksheet, but the runtime catalog only needs the final level.

### `estimated_hours`

Estimated hours represent a beginner's target completion time, not an experienced developer's implementation time.

Estimate from a work breakdown:

1. scope and wireframing;
2. environment and data setup;
3. core features;
4. secondary features;
5. testing and debugging;
6. documentation;
7. deployment.

For uncertain tasks, use a three-point estimate:

```text
O = optimistic time
M = most likely time
P = pessimistic time

estimate = (O + 4M + P) / 6
```

Add approximately 20% beginner/debugging buffer after summing tasks.

The initial values are curated estimates. They should later be recalibrated using observed completion times.

### `prerequisites`

Prerequisites are the minimum abilities needed to begin the project. They are not everything the learner will use.

Ask:

> Can the learner reasonably acquire this skill while completing the project?

If yes, it belongs in `skills` or the learning plan rather than `prerequisites`. If the learner cannot begin without it, it is a prerequisite.

Keep prerequisites limited to approximately 1–4 normalized entries.

Example:

```json
{
  "prerequisites": ["basic-python", "basic-pandas"],
  "skills": ["tf-idf", "text-classification", "model-evaluation"]
}
```

### `deliverables`

Deliverables are observable artifacts that prove the project was completed.

Avoid abstract outcomes:

```text
Understand React
Learn accessibility
Improve coding skills
```

Prefer demonstrable artifacts:

```text
Deployed responsive application
Automated API test suite
Model evaluation report
Accessibility audit
Project README with screenshots
```

Each project should normally have 3–5 deliverables and include:

1. a runnable product, analysis, model, or automation;
2. evidence of technical quality or evaluation;
3. documentation that explains the work.

### `phases`

Phases are logical blocks of work used to generate a personalized timeline.

Each phase has:

```json
{
  "name": "Baseline model development",
  "percentage": 25
}
```

Rules:

- use approximately four phases;
- organize phases by dependency order;
- make phase names specific to the project;
- ensure percentages sum to exactly 100;
- include testing, documentation, or deployment in the final phase.

The timeline generator converts percentages into hours:

```text
phase hours = user total available hours × phase percentage
```

Direction-specific patterns:

```text
Frontend:
plan -> core interface -> accessibility/responsiveness -> test/deploy

Data analysis:
question/data -> cleaning/EDA -> analysis/visualization -> recommendations

Machine learning:
data -> baseline -> evaluation/improvement -> demo/documentation

Automation:
workflow -> core pipeline -> failure handling/observability -> test/runbook
```

### `references`

References are learning sources, not code that a learner is expected to copy.

Supported reference types:

```text
reference-implementation
official-documentation
dataset
tutorial
```

Each reference records what it is useful for:

```json
{
  "name": "Upptime",
  "type": "reference-implementation",
  "url": "https://github.com/upptime/upptime",
  "use_for": [
    "scheduled uptime checks",
    "incident and status-page workflows"
  ]
}
```

References should not be included in recommendation embeddings or ranking features. Repository licenses must be reviewed before any code is reused. Studying a product flow or architecture does not grant permission to copy its implementation.

## 4. Recommendation features

The first content-based recommender should use:

- project description similarity;
- normalized skill overlap;
- difficulty fit;
- prerequisite fit;
- available-time fit;
- direction and result diversity.

It should not use references or deliverable wording as a shortcut for semantic similarity.

A simple hybrid score can start with:

```text
final score =
    0.40 × semantic similarity
  + 0.25 × skill overlap
  + 0.15 × background fit
  + 0.10 × time fit
  + 0.10 × portfolio value
```

Weights are hypotheses, not permanent facts. They should be evaluated and adjusted.

## 5. Quality checks

Before accepting a catalog change, verify:

- every ID is unique;
- every direction is allowed;
- skill and prerequisite slugs are normalized;
- each project has a clear and limited MVP;
- every skill maps to a feature or artifact;
- each deliverable is observable;
- phase percentages sum to 100;
- estimated hours are based on a task breakdown;
- difficulty uses the common rubric;
- URLs use HTTPS and explain their purpose;
- reference licenses have been reviewed before code reuse.

## 6. Calibration plan

The first catalog is a manually curated baseline. It should improve through evidence:

1. ask 2–3 target learners to review project scope;
2. record estimated and actual phase time;
3. record where learners become blocked;
4. collect whether recommended projects were selected, started, and completed;
5. revise prerequisites, difficulty, and time estimates;
6. preserve catalog versions so recommendation experiments remain reproducible.

Useful future interaction fields include:

```text
user_id
project_id
viewed
selected
started
completed
rating
timestamp
```

Collaborative or sequential recommenders should only be introduced after enough meaningful interaction data exists. Until then, a transparent content-based system is the appropriate baseline.

## 7. Source of truth

`data/projects.json` is the runtime source of truth.

A spreadsheet may be used for research and comparison, but the spreadsheet and JSON file should not both be edited as independent canonical datasets. If spreadsheet-based curation is introduced later, use an automated export and validation step to generate `projects.json`.

## 8. Skill taxonomy

`data/skills.json` is the normalization dictionary used by the JD parser and catalog validation.

Its structure is:

```json
{
  "version": "1.0.0",
  "skills": {
    "react": ["react.js", "reactjs"],
    "natural-language-processing": ["nlp", "text analytics"]
  },
  "prerequisites": {
    "basic-python": ["python fundamentals", "beginner python"]
  }
}
```

The keys are canonical slugs used in `projects.json`. The array values are alternative phrases that may appear in job descriptions or user-background text.

Canonical terms and aliases have different responsibilities:

```text
Canonical slug:
- stable internal identifier;
- used for exact overlap scoring;
- lowercase and hyphenated;
- should not change when display wording changes.

Alias:
- raw phrase that may occur in user text;
- maps different spellings to one canonical slug;
- may be expanded without changing project records.
```

The normalizer should compare input text against:

1. the canonical slug with hyphens converted to spaces;
2. the humanized canonical name;
3. every alias.

For example:

```text
"React.js" -> react
"reactjs" -> react
"natural language processing" -> natural-language-processing
"NLP" -> natural-language-processing
```

Skills and prerequisites are intentionally separate:

- `skills` represent capabilities demonstrated by completing a project and can be matched against a JD;
- `prerequisites` represent the minimum learner readiness needed to start a project and are matched against the user's background.

Alias-writing rules:

- use lowercase text;
- do not repeat the canonical term unless its punctuation differs;
- include common abbreviations only when they are reasonably unambiguous;
- avoid overly broad aliases such as `api`, `data`, or `cloud`;
- prefer exact phrase or word-boundary matching;
- do not use substring matching, because `react` must not match `reactive`;
- review collisions when two canonical skills share an alias.

Every value in `projects.json.skills` must exist under `skills`, and every value in `projects.json.prerequisites` must exist under `prerequisites`.

The `version` field supports reproducibility. When aliases or canonical terms change in a way that affects extraction results, increment the version and record the change.
