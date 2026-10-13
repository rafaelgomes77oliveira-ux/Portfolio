import { portfolioData } from "../../data/portfolioData";

export default function SkillsOutput() {
  const { skills } = portfolioData;

  const renderProgressBar = (level) => {
    const totalBlocks = 15;
    const filledBlocks = Math.round((level / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    const bar = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);
    return `[${bar}] ${level}%`;
  };

  const categories = [
    { title: "FRONTEND & UI ECOSYSTEM", key: "frontend", tag: "FE-STACK" },
    { title: "BACKEND & RUNTIMES", key: "backend", tag: "BE-CORE" },
    { title: "DATABASES & STORAGE", key: "database", tag: "DB-LAYER" },
    { title: "TOOLS, CLOUD & DEVOPS", key: "tools", tag: "ENV-TOOLS" },
  ];

  return (
    <div className="cmd-output cmd-skills">
      <div className="output-header">
        <span className="accent-tag">[ MODULE CAPABILITIES & TECH PROFILES ]</span>
        <span className="output-sub">Níveis de proficiência computados pelo sistema:</span>
      </div>

      <div className="skills-container">
        {categories.map((cat) => {
          const list = skills[cat.key] || [];
          return (
            <div key={cat.key} className="skill-section">
              <div className="skill-cat-title">
                <span className="cat-badge">{cat.tag}</span>
                <h4>{cat.title}</h4>
              </div>

              <div className="skill-list">
                {list.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-meta">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <div className="skill-progress-wrap">
                      <span className="skill-ascii-bar">{renderProgressBar(skill.level)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
