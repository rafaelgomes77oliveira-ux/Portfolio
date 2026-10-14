import { portfolioData } from "../../data/portfolioData";
import { useLanguage } from "../../context/LanguageContext";

export default function SkillsOutput() {
  const { t } = useLanguage();
  const { skills } = portfolioData;

  const renderProgressBar = (level) => {
    const totalBlocks = 15;
    const filledBlocks = Math.round((level / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    const bar = "█".repeat(filledBlocks) + "░".repeat(emptyBlocks);
    return `[${bar}] ${level}%`;
  };

  const renderSkillIcon = (icon, color) => {
    if (!icon) return null;
    if (typeof icon === "function") {
      const IconComp = icon;
      return <IconComp style={{ color: color || "inherit" }} aria-hidden="true" />;
    }
    if (typeof icon === "string" && (icon.includes(".png") || icon.includes(".svg") || icon.startsWith("/"))) {
      return (
        <img
          src={icon}
          alt=""
          className="skill-icon-img"
          style={{ width: "18px", height: "18px", objectFit: "contain", imageRendering: "pixelated" }}
        />
      );
    }
    return <span>{icon}</span>;
  };

  const categories = [
    { title: t("skills.categories.frontend") || "FRONTEND & UI ECOSYSTEM", key: "frontend", tag: "FE-STACK" },
    { title: t("skills.categories.backend") || "BACKEND & RUNTIMES", key: "backend", tag: "BE-CORE" },
    { title: t("skills.categories.database") || "DATABASES & STORAGE", key: "database", tag: "DB-LAYER" },
    { title: t("skills.categories.tools") || "TOOLS, CLOUD & DEVOPS", key: "tools", tag: "ENV-TOOLS" },
  ];

  return (
    <div className="cmd-output cmd-skills">
      <div className="output-header">
        <span className="accent-tag">{t("skills.tag")}</span>
        <span className="output-sub">{t("skills.subtitle")}</span>
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
                      <span className="skill-icon">{renderSkillIcon(skill.icon, skill.color)}</span>
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
