import { portfolioData } from "../../data/portfolioData";

export default function ProjectsOutput() {
  const { projects } = portfolioData;

  return (
    <div className="cmd-output cmd-projects">
      <div className="output-header">
        <span className="accent-tag">[ REPOSITORY INDEX: {projects.length} PROJECTS DETECTED ]</span>
        <span className="output-sub">Projetos carregados do subsistema de desenvolvimento:</span>
      </div>

      <div className="projects-grid">
        {projects.map((proj, idx) => (
          <div key={proj.id} className="project-card">
            <div className="project-card-header">
              <span className="project-index">SYS_{String(idx + 1).padStart(2, "0")}</span>
              <span className={`project-status-badge status-${proj.status.toLowerCase()}`}>
                ● {proj.status}
              </span>
            </div>

            <h3 className="project-title">{proj.title}</h3>
            <span className="project-category">{proj.category}</span>

            <p className="project-desc">{proj.description}</p>

            <div className="project-tech-stack">
              {proj.techs.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-actions">
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-link-btn"
                >
                  <span>⌥ GitHub Code</span>
                </a>
              )}
              {proj.demoUrl && proj.demoUrl !== "#" && (
                <a
                  href={proj.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-link-btn primary"
                >
                  <span>⚡ Live Preview</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
