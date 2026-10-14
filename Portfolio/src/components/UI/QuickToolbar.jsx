import { VscTerminal } from "react-icons/vsc";
import { useLanguage } from "../../context/LanguageContext";

export default function QuickToolbar({ onRunCommand }) {
  const { t } = useLanguage();

  const quickActions = [
    { label: "code", desc: "Editor portfolio.tsx" },
    { label: "about", desc: "Sobre mim / About" },
    { label: "projects", desc: "Projetos / Projects" },
    { label: "skills", desc: "Habilidades / Skills" },
    { label: "experience", desc: "Git Log" },
    { label: "contact", desc: "Contato / Contact" },
    { label: "whoami", desc: "User info" },
    { label: "clear", desc: "Clear" },
  ];

  return (
    <div className="quick-toolbar">
      <span className="quick-label">
        <VscTerminal style={{ marginRight: "6px", verticalAlign: "middle" }} />
        {t("terminal.quickCommandsLabel")}
      </span>
      <div className="quick-buttons">
        {quickActions.map((action) => (
          <button
            key={action.label}
            type="button"
            className="quick-btn"
            onClick={() => onRunCommand(action.label)}
            title={`Executar: ${action.label} (${action.desc})`}
          >
            <span className="quick-dollar">$</span>
            <span className="quick-text">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
