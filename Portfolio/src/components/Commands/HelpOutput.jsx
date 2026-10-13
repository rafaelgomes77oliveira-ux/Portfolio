import { portfolioData } from "../../data/portfolioData";

export default function HelpOutput({ onRunCommand }) {
  return (
    <div className="cmd-output cmd-help">
      <div className="output-header">
        <span className="accent-tag">[ TERMINAL HELP v2.5 ]</span>
        <span className="output-sub">Lista de comandos reconhecidos pelo interpretador:</span>
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
            <span className="help-desc">{item.desc}</span>
          </div>
        ))}
      </div>

      <div className="help-footer">
        <p className="dim-text">
          💡 <span className="highlight">Dica Pro:</span> Use <kbd className="terminal-kbd">Tab</kbd> para autocompletar comandos, ou as setas <kbd className="terminal-kbd">↑</kbd> e <kbd className="terminal-kbd">↓</kbd> para navegar pelo histórico. Você também pode clicar diretamente em qualquer botão acima!
        </p>
      </div>
    </div>
  );
}
