import { VscUnmute, VscMute, VscTrash, VscGlobe } from "react-icons/vsc";
import { portfolioData } from "../../data/portfolioData";
import { useLanguage } from "../../context/LanguageContext";
import { soundManager } from "../../utils/audio";

export default function TerminalHeader({
  soundActive,
  onToggleSound,
  onClear,
}) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="terminal-header">
      <div className="terminal-header-left">
        <div className="window-dots">
          <button
            type="button"
            className="dot dot-close"
            onClick={onClear}
            title={t("header.clearTitle")}
          ></button>
          <button
            type="button"
            className="dot dot-minimize"
            title="Terminal Minimizar"
          ></button>
          <button
            type="button"
            className="dot dot-maximize"
            title="Terminal Tela Cheia"
          ></button>
        </div>
        <div className="terminal-title">
          <span className="terminal-prompt-user">{portfolioData.user}@{portfolioData.host}</span>
          <span className="terminal-path">:~</span>
          <span className="terminal-shell"> (bash)</span>
        </div>
      </div>

      <div className="terminal-header-right">
        {/* Botão de Troca de Idioma PT / EN */}
        <button
          type="button"
          className="control-chip-btn lang-toggle-btn active"
          onClick={() => {
            soundManager.playEnter();
            toggleLanguage();
          }}
          title={t("header.langSwitchTitle")}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <VscGlobe style={{ color: "var(--accent, #61dafb)" }} />
          <span>{language === "pt" ? "PT 🇧🇷" : "EN 🇺🇸"}</span>
        </button>

        <button
          type="button"
          className={`control-chip-btn ${soundActive ? "active" : ""}`}
          onClick={onToggleSound}
          title={t("header.soundTitle")}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          {soundActive ? <VscUnmute /> : <VscMute />}
          <span>{soundActive ? t("header.soundOn") : t("header.soundOff")}</span>
        </button>

        <button
          type="button"
          className="control-chip-btn"
          onClick={onClear}
          title={t("header.clearTitle")}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <VscTrash />
          <span>{t("header.clear")}</span>
        </button>

        <div className="system-pill">
          <span className="status-indicator"></span>
          <span className="system-status-text">{t("header.online")}</span>
        </div>
      </div>
    </header>
  );
}
