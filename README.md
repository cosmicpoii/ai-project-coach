# AI Project Coach

AI Project Coach helps beginners turn a job description into a practical, actionable project plan.

## MVP User Flow

1. The user pastes a job description.
2. The user provides their background and available time.
3. The system analyzes the skills required for the role.
4. The system recommends three projects that the user can recreate.
5. The user selects one project.
6. The system generates a phased timeline and a set of learning tasks.

## MVP Success Criteria

Within five minutes, a user can turn a job description into:

- An analysis of the core skills required for the role
- Three relevant project recommendations
- One actionable project plan they can start immediately

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Python
- scikit-learn
- Sentence Transformers
- Vercel

## Project Data

The MVP uses a manually curated catalog of 18 portfolio projects across frontend, backend, full-stack, data analysis, machine learning, and automation/cloud.

- Catalog: [`data/projects.json`](data/projects.json)
- Curation and labeling methodology: [`docs/project-catalog-methodology.md`](docs/project-catalog-methodology.md)

The initial recommendation system will use transparent content-based ranking based on semantic similarity, skill overlap, user background, difficulty, and available time.

## Project Status

The MVP is currently under development.
