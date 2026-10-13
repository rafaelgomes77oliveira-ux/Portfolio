import { portfolioData } from "../../data/portfolioData";
import { EDITOR_TABS } from "../../data/tabsData";

export default function SidebarNav({ onRunCommand, activeCommand, openTabs = [] }) {
  return (
    <aside className="ide-sidebar">
      {/* Top Brand */}
      <div className="ide-sidebar-header">
        <div className="ide-brand-icon">
          <span>&lt;R/&gt;</span>
        </div>
        <div className="ide-brand-text">
          <span className="ide-brand-name">{portfolioData.user}</span>
          <span className="ide-brand-domain">.dev</span>
        </div>
      </div>

      {/* Arquivos do Projeto (Explorador estilo VS Code) */}
      <div className="ide-file-tree">
        <div className="ide-tree-title">EXPLORADOR // ARQUIVOS</div>
        <nav className="ide-files-list">
          {EDITOR_TABS.map((file) => {
            const isActive = activeCommand === file.id;
            const isOpen = openTabs.includes(file.id);

            return (
              <button
                key={file.id}
                type="button"
                className={`ide-file-item ${isActive ? "active" : ""} ${isOpen ? "is-open" : ""}`}
                onClick={() => onRunCommand(file.id)}
                title={`Abrir ${file.name} (${file.label})`}
              >
                <span className="ide-file-icon">{file.icon}</span>
                <span className="ide-file-name">{file.name}</span>
                {isActive ? (
                  <span className="ide-active-indicator" title="Arquivo ativo"></span>
                ) : isOpen ? (
                  <span className="ide-open-indicator" title="Aba aberta no editor"></span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Rodapé da sidebar com redes sociais e ajuda */}
      <div className="ide-sidebar-footer">
        <div className="ide-quick-socials">
          <a
            href="https://github.com/rafaelgomes77oliveira-ux"
            target="_blank"
            rel="noopener noreferrer"
            className="ide-social-link"
            title="GitHub"
          >
            🐙
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ide-social-link"
            title="LinkedIn"
          >
            💼
          </a>
          <button
            type="button"
            className="ide-social-link"
            onClick={() => onRunCommand("help")}
            title="Ajuda CLI (terminal.sh)"
          >
            ❓
          </button>
        </div>
      </div>
    </aside>
  );
}
