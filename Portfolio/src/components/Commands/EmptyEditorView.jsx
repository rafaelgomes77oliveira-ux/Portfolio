import { EDITOR_TABS } from "../../data/tabsData";

export default function EmptyEditorView({ onRunCommand }) {
  // Atalhos rápidos para reabrir arquivos
  const quickFiles = EDITOR_TABS.filter((t) => t.id !== "terminal");

  return (
    <div className="cmd-output cmd-empty-editor">
      <div className="empty-editor-card">
        <div className="empty-editor-badge">CYBER_OS // WORKSPACE</div>
        <div className="empty-editor-logo">&lt;R/&gt;</div>
        <h2 className="empty-editor-title">Nenhum arquivo aberto</h2>
        <p className="empty-editor-desc">
          Todas as abas foram fechadas. Clique em um arquivo no{" "}
          <span className="accent-text">Explorador</span> à esquerda ou use os atalhos abaixo:
        </p>

        <div className="empty-editor-grid">
          {quickFiles.map((item) => (
            <button
              key={item.id}
              type="button"
              className="empty-file-btn"
              onClick={() => onRunCommand && onRunCommand(item.id)}
              title={`Abrir ${item.name}`}
            >
              <span className="empty-file-icon">{item.icon}</span>
              <div className="empty-file-info">
                <span className="empty-file-name">{item.name}</span>
                <span className="empty-file-desc">{item.desc}</span>
              </div>
              <span className="empty-file-action">Abrir →</span>
            </button>
          ))}
        </div>

        <div className="empty-editor-footer-tip">
          <span className="tip-badge">DICA</span>
          <span>
            Digite comandos como <code>code</code>, <code>about</code> ou <code>projects</code> no terminal integrado abaixo.
          </span>
        </div>
      </div>
    </div>
  );
}
