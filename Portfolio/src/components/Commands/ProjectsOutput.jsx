import { portfolioData } from "../../data/portfolioData";
import { SiGithub } from "react-icons/si";
import { VscGlobe } from "react-icons/vsc";
import { useLanguage } from "../../context/LanguageContext";

export default function ProjectsOutput() {
  const { t } = useLanguage();
  const { projects } = portfolioData;

  return (
    <div className="cmd-output cmd-projects">
      <div className="output-header">
        <span className="accent-tag">[ REPOSITORY INDEX: {projects.length} PROJECTS DETECTED ]</span>
        <span className="output-sub">{t("projects.subtitle")}</span>
      </div>

      <div className="projects-grid">
        {projects.map((proj, idx) => {
          const localizedDesc = t(`projects.descriptions.${proj.id}`) || proj.description;

          return (
            <div key={proj.id} className="project-card">
              <div className="project-card-header">
                <span className="project-index">SYS_{String(idx + 1).padStart(2, "0")}</span>
                <span className={`project-status-badge status-${proj.status.toLowerCase()}`}>
                  ● {proj.status}
                </span>
              </div>

              <h3 className="project-title">{proj.title}</h3>
              <span className="project-category">{proj.category}</span>

              <p className="project-desc">{localizedDesc}</p>

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
                    <SiGithub style={{ marginRight: "6px" }} />
                    <span>{t("projects.sourceCode")}</span>
                  </a>
                )}
                {proj.demoUrl && proj.demoUrl !== "#" && (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cyber-link-btn primary"
                  >
                    <VscGlobe style={{ marginRight: "6px" }} />
                    <span>{t("projects.visitDemo")}</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
