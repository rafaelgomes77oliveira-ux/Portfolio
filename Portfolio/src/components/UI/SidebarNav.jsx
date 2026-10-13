import { portfolioData } from "../../data/portfolioData";

export default function SidebarNav({ onRunCommand, activeCommand }) {
  const navFiles = [
    { name: "main.ts", cmd: "code", icon: "⚡", label: "Hero / Código" },
    { name: "about.md", cmd: "about", icon: "👤", label: "Sobre Mim" },
    { name: "skills.json", cmd: "skills", icon: "⚙️", label: "Habilidades" },
    { name: "experience.git", cmd: "experience", icon: "🌿", label: "Experiência" },
    { name: "projects/", cmd: "projects", icon: "📁", label: "Projetos" },
    { name: "contact.exe", cmd: "contact", icon: "✉️", label: "Contato" },
  ];

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

      {/* Arquivos do Projeto (Navegação) */}
      <div className="ide-file-tree">
        <div className="ide-tree-title">EXPLORADOR // ARQUIVOS</div>
        <nav className="ide-files-list">
          {navFiles.map((file) => {
            const isActive = activeCommand === file.cmd;
            return (
              <button
                key={file.name}
                type="button"
                className={`ide-file-item ${isActive ? "active" : ""}`}
                onClick={() => onRunCommand(file.cmd)}
                title={`Abrir ${file.name} (${file.label})`}
              >
                <span className="ide-file-icon">{file.icon}</span>
                <span className="ide-file-name">{file.name}</span>
                {isActive && <span className="ide-active-indicator"></span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Rodapé da sidebar com redes */}
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
            title="Ajuda CLI"
          >
            ❓
          </button>
        </div>
      </div>
    </aside>
  );
}
