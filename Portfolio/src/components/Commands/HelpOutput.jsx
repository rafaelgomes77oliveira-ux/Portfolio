import { VscLightbulb } from "react-icons/vsc";
import { portfolioData } from "../../data/portfolioData";
import { useLanguage } from "../../context/LanguageContext";

export default function HelpOutput({ onRunCommand }) {
  const { t } = useLanguage();

  return (
    <div className="cmd-output cmd-help">
      <div className="output-header">
        <span className="accent-tag">{t("help.tag")}</span>
        <span className="output-sub">{t("help.subtitle")}</span>
      </div>

      <div className="help-grid">
        {portfolioData.commands.map((item) => (
          <div key={item.command} className="help-row">
            <button
              type="button"
              className="cmd-pill-btn"
              onClick={() => onRunCommand && onRunCommand(item.command)}
              title={`Executar comando: ${item.command}`}
            >
              $ {item.command}
            </button>
            <span className="help-desc">{t(`help.commandsDesc.${item.command}`) || item.desc}</span>
          </div>
        ))}
      </div>

      <div className="help-footer">
        <p className="dim-text" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <VscLightbulb style={{ color: "var(--terminal-yellow, #ffd700)", flexShrink: 0 }} />
          <span>
            <span className="highlight">{t("help.proTip")}</span> {t("help.proTipDesc")}
          </span>
        </p>
      </div>
    </div>
  );
}
