import { portfolioData } from "../../data/portfolioData";
import SkillsGlobe from "../SkillsGlobe";
import { VscOrganization, VscDiffAdded } from "react-icons/vsc";
import { useLanguage } from "../../context/LanguageContext";

export default function ExperienceOutput() {
  const { t } = useLanguage();
  const { experience } = portfolioData;
  const translatedItems = t("experience.items");

  return (
    <div className="cmd-output cmd-experience">
      {/* Esfera 3D de Habilidades Integrada */}
      <div className="experience-globe-card">
        <div className="output-header">
          <span className="accent-tag">[ 3D TECH SPHERE // ECOSSISTEMA DE HABILIDADES ]</span>
          <span className="output-sub">
            {t("experience.subtitle")}
          </span>
        </div>
        <SkillsGlobe />
      </div>

      {/* Histórico da Linha do Tempo no estilo Git Log */}
      <div className="output-header" style={{ marginTop: "28px" }}>
        <span className="accent-tag">{t("experience.tag")}</span>
        <span className="output-sub">{t("experience.subtitle")}</span>
      </div>

      <div className="git-timeline">
        {experience.map((item, index) => {
          const trans = Array.isArray(translatedItems) && translatedItems[index] ? translatedItems[index] : null;
          const role = trans?.role || item.role;
          const org = trans?.org || item.org;
          const desc = trans?.description || item.description;
          const changes = trans?.changes || item.changes;

          return (
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
                  <span className="commit-period">{trans?.period || item.period}</span>
                </div>

                <h3 className="commit-role">{role}</h3>
                <div className="commit-org">
                  <VscOrganization style={{ marginRight: "6px", verticalAlign: "middle" }} />
                  {org}
                </div>

                <p className="commit-desc">{desc}</p>

                <div className="commit-meta">
                  <span className="commit-diff">
                    <VscDiffAdded style={{ marginRight: "6px", verticalAlign: "middle" }} />
                    {changes}
                  </span>
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
          );
        })}
      </div>
    </div>
  );
}
