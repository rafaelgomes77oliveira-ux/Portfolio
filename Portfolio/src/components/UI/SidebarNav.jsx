import { portfolioData } from "../../data/portfolioData";
import { EDITOR_TABS } from "../../data/tabsData";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { VscQuestion } from "react-icons/vsc";
import { useLanguage } from "../../context/LanguageContext";

export default function SidebarNav({ onRunCommand, activeCommand, openTabs = [] }) {
  const { language, t } = useLanguage();

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
        <div className="ide-tree-title">{t("sidebar.explorerTitle")}</div>
        <nav className="ide-files-list">
          {EDITOR_TABS.map((file) => {
            const isActive = activeCommand === file.id;
            const isOpen = openTabs.includes(file.id);

            const label = t(`tabs.${file.id}.label`) || file.label;

            return (
              <button
                key={file.id}
                type="button"
                className={`ide-file-item ${isActive ? "active" : ""} ${isOpen ? "is-open" : ""}`}
                onClick={() => onRunCommand(file.id)}
                title={`${language === "pt" ? "Abrir" : "Open"} ${file.name} (${label})`}
              >
                <span className="ide-file-icon" style={{ color: file.iconColor }}>
                  {typeof file.icon === "function" ? <file.icon aria-hidden="true" /> : file.icon}
                </span>
                <span className="ide-file-name">{file.name}</span>
                {isActive ? (
                  <span className="ide-active-indicator" title={language === "pt" ? "Arquivo ativo" : "Active file"}></span>
                ) : isOpen ? (
                  <span className="ide-open-indicator" title={language === "pt" ? "Aba aberta no editor" : "Open tab"}></span>
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
            title={t("sidebar.githubTitle")}
          >
            <SiGithub aria-label="GitHub" />
          </a>
          <a
            href="https://www.linkedin.com/in/rafael-g-antunes-8bba733a3"
            target="_blank"
            rel="noopener noreferrer"
            className="ide-social-link"
            title={t("sidebar.linkedinTitle")}
          >
            <FaLinkedin aria-label="LinkedIn" />
          </a>
          <button
            type="button"
            className="ide-social-link"
            onClick={() => onRunCommand("help")}
            title={t("sidebar.helpTitle")}
          >
            <VscQuestion aria-label="Ajuda / Help" />
          </button>
        </div>
      </div>
    </aside>
  );
}
