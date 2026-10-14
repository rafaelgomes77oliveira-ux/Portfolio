import { EDITOR_TABS } from "../../data/tabsData";
import { useLanguage } from "../../context/LanguageContext";

export default function EmptyEditorView({ onRunCommand }) {
  const { language, t } = useLanguage();
  const quickFiles = EDITOR_TABS.filter((t) => t.id !== "terminal");

  return (
    <div className="cmd-output cmd-empty-editor">
      <div className="empty-editor-card">
        <div className="empty-editor-badge">CYBER_OS // WORKSPACE</div>
        <div className="empty-editor-logo">&lt;R/&gt;</div>
        <h2 className="empty-editor-title">{t("empty.title")}</h2>
        <p className="empty-editor-desc">
          {t("empty.subtitle")}
        </p>

        <div className="empty-editor-grid">
          {quickFiles.map((item) => (
            <button
              key={item.id}
              type="button"
              className="empty-file-btn"
              onClick={() => onRunCommand && onRunCommand(item.id)}
              title={`${language === "pt" ? "Abrir" : "Open"} ${item.name}`}
            >
              <span className="empty-file-icon" style={{ color: item.iconColor }}>
                {typeof item.icon === "function" ? <item.icon aria-hidden="true" /> : item.icon}
              </span>
              <div className="empty-file-info">
                <span className="empty-file-name">{item.name}</span>
                <span className="empty-file-desc">{t(`tabs.${item.id}.desc`) || item.desc}</span>
              </div>
              <span className="empty-file-action">{language === "pt" ? "Abrir →" : "Open →"}</span>
            </button>
          ))}
        </div>

        <div className="empty-editor-footer-tip">
          <span className="tip-badge">{language === "pt" ? "DICA" : "TIP"}</span>
          <span>
            {language === "pt" ? (
              <>
                Digite comandos como <code>code</code>, <code>about</code> ou <code>projects</code> no terminal integrado abaixo.
              </>
            ) : (
              <>
                Type commands like <code>code</code>, <code>about</code>, or <code>projects</code> in the integrated terminal below.
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
