import { portfolioData } from "../../data/portfolioData";

export default function ExperienceOutput() {
  const { experience } = portfolioData;

  return (
    <div className="cmd-output cmd-experience">
      <div className="output-header">
        <span className="accent-tag">[ GIT LOG --GRAPH --ONELINE : ACADEMIC & CAREER TIMELINE ]</span>
        <span className="output-sub">Histórico de marcos, formação superior e projetos versionados:</span>
      </div>

      <div className="git-timeline">
        {experience.map((item, index) => (
          <div key={item.hash} className="git-commit-node">
            <div className="git-graph-col">
              <div className="commit-point"></div>
              {index < experience.length - 1 && <div className="commit-line"></div>}
            </div>

            <div className="git-commit-content">
              <div className="commit-header">
                <span className="commit-hash">commit {item.hash}</span>
                <span className="commit-branch">({item.branch})</span>
                {item.tag && <span className="commit-tag">tag: {item.tag}</span>}
                <span className="commit-period">{item.period}</span>
              </div>

              <h3 className="commit-role">{item.role}</h3>
              <div className="commit-org">🏢 {item.org}</div>

              <p className="commit-desc">{item.description}</p>

              <div className="commit-meta">
                <span className="commit-diff">📊 {item.changes}</span>
                <div className="commit-skills">
                  {item.skills.map((s) => (
                    <span key={s} className="commit-skill-badge">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
