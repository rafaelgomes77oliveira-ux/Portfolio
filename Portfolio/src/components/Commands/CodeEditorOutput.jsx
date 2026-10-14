import { portfolioData } from "../../data/portfolioData";
import { SiReact } from "react-icons/si";
import { VscPlay, VscFolder, VscGitBranch } from "react-icons/vsc";
import { useLanguage } from "../../context/LanguageContext";

export default function CodeEditorOutput({ onRunCommand }) {
  const { language, t } = useLanguage();

  const codeLines = [
    { num: 1, content: <><span className="syn-keyword">import</span> {'{'} <span className="syn-type">Developer</span> {'}'} <span className="syn-keyword">from</span> <span className="syn-string">'./universe'</span>;</> },
    { num: 2, content: "" },
    { num: 3, content: <><span className="syn-keyword">const</span> <span className="syn-func">Portfolio</span> = () =&gt; {'{'}</> },
    { num: 4, indent: 1, content: <><span className="syn-keyword">return</span> (</> },
    { num: 5, indent: 2, content: <><span className="syn-tag">&lt;</span><span className="syn-component">Developer</span></> },
    { num: 6, indent: 3, content: <><span className="syn-prop">name</span>=<span className="syn-string">"{portfolioData.about.name}"</span></> },
    { num: 7, indent: 3, content: <><span className="syn-prop">role</span>=<span className="syn-string">"{t("about.role")}"</span></> },
    { num: 8, indent: 3, content: <><span className="syn-prop">location</span>=<span className="syn-string">"{t("about.location")}"</span></> },
    { num: 9, indent: 3, content: <><span className="syn-prop">status</span>=<span className="syn-string">"Ready for Opportunities"</span></> },
    { num: 10, indent: 3, content: <><span className="syn-prop">coreStack</span>={'{'}[<span className="syn-string">'React'</span>, <span className="syn-string">'Vite'</span>, <span className="syn-string">'Node.js'</span>, <span className="syn-string">'TypeScript'</span>]{'}'}</> },
    { num: 11, indent: 2, content: <><span className="syn-tag">/&gt;</span></> },
    { num: 12, indent: 1, content: <><span className="syn-text">);</span></> },
    { num: 13, content: <><span className="syn-text">{'}'};</span></> },
    { num: 14, content: "" },
    { num: 15, content: <><span className="syn-keyword">export default</span> <span className="syn-func">Portfolio</span>;</> },
  ];

  return (
    <div className="cmd-output cmd-code-editor">
      <div className="code-editor-window">
        {/* Barra de caminho (breadcrumbs) estilo VS Code */}
        <div className="code-editor-breadcrumb-bar">
          <span className="breadcrumb-segment">portfolio</span>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-segment">src</span>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-segment breadcrumb-current">
            <SiReact className="breadcrumb-icon" style={{ color: "#61DAFB" }} />
            portfolio.tsx
          </span>
          <span className="breadcrumb-tag">TypeScript React • UTF-8</span>
        </div>

        {/* Linhas de código com numeração */}
        <div className="code-editor-body">
          {codeLines.map((line) => (
            <div key={line.num} className="code-line-row">
              <span className="line-num">{line.num}</span>
              <div
                className="line-code"
                style={{ paddingLeft: `${(line.indent || 0) * 1.5}rem` }}
              >
                {line.content}
              </div>
            </div>
          ))}
        </div>

        {/* Botões de Ação rápida como no abdulmomin.dev */}
        <div className="code-editor-actions">
          <button
            type="button"
            className="action-btn-cut primary"
            onClick={() => onRunCommand && onRunCommand("about")}
          >
            <VscPlay style={{ marginRight: "6px" }} />
            <span>{language === "pt" ? "Executar Perfil (about)" : "Run Profile (about)"}</span>
          </button>

          <button
            type="button"
            className="action-btn-cut"
            onClick={() => onRunCommand && onRunCommand("projects")}
          >
            <VscFolder style={{ marginRight: "6px" }} />
            <span>{language === "pt" ? "Ver Projetos (projects)" : "View Projects (projects)"}</span>
          </button>

          <button
            type="button"
            className="action-btn-cut"
            onClick={() => onRunCommand && onRunCommand("experience")}
          >
            <VscGitBranch style={{ marginRight: "6px" }} />
            <span>{language === "pt" ? "Histórico Git (experience)" : "Git History (experience)"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
