"use client";

import { FormEvent, useState } from "react";

const projects = [
  {
    number: "01",
    title: "Support Ticket Intelligence Dashboard",
    description:
      "Build a dashboard that classifies support tickets, surfaces trends, and helps a team prioritize its queue.",
    skills: ["Next.js", "TypeScript", "Data visualization"],
    level: "Beginner friendly",
  },
  {
    number: "02",
    title: "AI Knowledge Base Assistant",
    description:
      "Create a searchable assistant that answers questions from a small collection of company documents.",
    skills: ["OpenAI API", "RAG", "UX design"],
    level: "Portfolio standout",
  },
  {
    number: "03",
    title: "Job Application Tracker",
    description:
      "Design a focused application tracker with status analytics, reminders, and role-skill comparisons.",
    skills: ["React", "Database", "Product thinking"],
    level: "Practical build",
  },
];

const timeline = [
  ["Week 1", "Plan & learn", "Define the user flow, sketch the interface, and review the core technologies."],
  ["Week 2", "Build the foundation", "Create the main screens, reusable components, and sample data."],
  ["Week 3", "Add intelligence", "Connect the main workflow and refine the most important interaction."],
  ["Week 4", "Polish & ship", "Test the experience, write documentation, and deploy the project."],
];

export default function Home() {
  const [showProjects, setShowProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowProjects(true);
    setSelectedProject(null);
    setTimeout(() => document.querySelector("#recommendations")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top" aria-label="AI Project Coach home">
          <span className="brand-mark">A</span>
          AI Project Coach
        </a>
        <a className="nav-link" href="#how-it-works">How it works</a>
      </nav>

      <section className="hero shell" id="top">
        <div className="eyebrow"><span /> Turn a job description into proof of skill</div>
        <h1>Build the project that<br /><em>gets you hired.</em></h1>
        <p className="hero-copy">
          Paste a job description. Get three portfolio-ready project ideas and a practical plan built around your experience and schedule.
        </p>

        <form className="coach-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <div>
              <span className="step-label">STEP 01</span>
              <h2>Tell us what you&apos;re aiming for</h2>
            </div>
            <span className="private-note">No sign-up required</span>
          </div>

          <label>
            Job description
            <textarea required rows={7} placeholder="Paste the full job description here..." />
          </label>

          <div className="form-grid">
            <label>
              Your current background
              <input required placeholder="e.g. Marketing, learning Python" />
            </label>
            <label>
              Skills you already have
              <input placeholder="e.g. Excel, HTML, communication" />
            </label>
            <label>
              Hours available per week
              <select defaultValue="10">
                <option value="5">About 5 hours</option>
                <option value="10">About 10 hours</option>
                <option value="15">About 15 hours</option>
                <option value="20">20+ hours</option>
              </select>
            </label>
            <label>
              Target timeline
              <select defaultValue="4">
                <option value="2">2 weeks</option>
                <option value="4">4 weeks</option>
                <option value="6">6 weeks</option>
                <option value="8">8 weeks</option>
              </select>
            </label>
          </div>

          <button className="primary-button" type="submit">
            Generate my project ideas <span>→</span>
          </button>
        </form>
      </section>

      <section className="process-section" id="how-it-works">
        <div className="shell process-grid">
          <p className="section-kicker">HOW IT WORKS</p>
          <div className="process-copy">
            <h2>From job post to project plan<br />in three clear steps.</h2>
            <ol>
              <li><span>01</span><div><strong>We decode the role</strong><p>Identify the skills, tools, and outcomes the employer actually values.</p></div></li>
              <li><span>02</span><div><strong>You choose your project</strong><p>Compare three realistic ideas matched to your level and goals.</p></div></li>
              <li><span>03</span><div><strong>You follow the roadmap</strong><p>Work through a phased timeline with concrete learning and building tasks.</p></div></li>
            </ol>
          </div>
        </div>
      </section>

      {showProjects && (
        <section className="results shell" id="recommendations">
          <p className="section-kicker">YOUR RECOMMENDATIONS</p>
          <h2>Three projects worth building</h2>
          <p className="results-intro">These sample recommendations show how the final AI-powered experience will work.</p>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={`project-card ${selectedProject === index ? "selected" : ""}`} key={project.title}>
                <div className="project-top"><span>{project.number}</span><small>{project.level}</small></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">{project.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                <button type="button" onClick={() => setSelectedProject(index)}>
                  {selectedProject === index ? "Selected ✓" : "Choose this project →"}
                </button>
              </article>
            ))}
          </div>

          {selectedProject !== null && (
            <div className="timeline">
              <div className="timeline-heading">
                <div><span className="step-label">YOUR ROADMAP</span><h2>{projects[selectedProject].title}</h2></div>
                <span className="duration">4 weeks · 10 hrs/week</span>
              </div>
              <div className="timeline-list">
                {timeline.map(([week, title, task]) => (
                  <div className="timeline-item" key={week}>
                    <span>{week}</span><strong>{title}</strong><p>{task}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <footer className="shell">AI Project Coach <span>Build with intention.</span></footer>
    </main>
  );
}
