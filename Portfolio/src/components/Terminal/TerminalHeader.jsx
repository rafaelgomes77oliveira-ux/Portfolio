import { portfolioData } from "../../data/portfolioData";

export default function TerminalHeader({
  soundActive,
  onToggleSound,
  onClear,
}) {
  return (
    <header className="terminal-header">
      <div className="terminal-header-left">
        <div className="window-dots">
          <button
            type="button"
            className="dot dot-close"
            onClick={onClear}
            title="Limpar tela (Clear)"
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
        <button
          type="button"
          className={`control-chip-btn ${soundActive ? "active" : ""}`}
          onClick={onToggleSound}
          title="Alternar efeitos sonoros mecânicos"
        >
          {soundActive ? "🔊 SOM: ON" : "🔇 SOM: OFF"}
        </button>

        <button
          type="button"
          className="control-chip-btn"
          onClick={onClear}
          title="Limpar histórico da tela"
        >
          🧹 LIMPAR
        </button>

        <div className="system-pill">
          <span className="status-indicator"></span>
          <span className="system-status-text">ONLINE</span>
        </div>
      </div>
    </header>
  );
}
