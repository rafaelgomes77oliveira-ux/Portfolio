import { portfolioData } from "../../data/portfolioData";

export default function CodeEditorOutput({ onRunCommand }) {
  const codeLines = [
    { num: 1, content: <><span className="syn-keyword">import</span> {'{'} <span className="syn-type">Developer</span> {'}'} <span className="syn-keyword">from</span> <span className="syn-string">'./universe'</span>;</> },
    { num: 2, content: "" },
    { num: 3, content: <><span className="syn-keyword">const</span> <span className="syn-func">Portfolio</span> = () =&gt; {'{'}</> },
    { num: 4, indent: 1, content: <><span className="syn-keyword">return</span> (</> },
    { num: 5, indent: 2, content: <><span className="syn-tag">&lt;</span><span className="syn-component">Developer</span></> },
    { num: 6, indent: 3, content: <><span className="syn-prop">name</span>=<span className="syn-string">"{portfolioData.about.name}"</span></> },
    { num: 7, indent: 3, content: <><span className="syn-prop">role</span>=<span className="syn-string">"{portfolioData.about.role}"</span></> },
    { num: 8, indent: 3, content: <><span className="syn-prop">location</span>=<span className="syn-string">"{portfolioData.about.location}"</span></> },
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
        {/* Barra superior de abas da IDE */}
        <div className="code-editor-tabs-bar">
          <div className="code-editor-tab active">
            <span className="tab-icon">⚛️</span>
            <span className="tab-filename">portfolio.tsx</span>
            <span className="tab-status-dot"></span>
          </div>
          <div className="code-editor-tab">
            <span className="tab-icon">📝</span>
            <span className="tab-filename">about.md</span>
          </div>
          <div className="code-editor-tab">
            <span className="tab-icon">📦</span>
            <span className="tab-filename">package.json</span>
          </div>
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
            <span>▶ Executar Perfil (about)</span>
          </button>

          <button
            type="button"
            className="action-btn-cut"
            onClick={() => onRunCommand && onRunCommand("projects")}
          >
            <span>📁 Ver Projetos (projects)</span>
          </button>

          <button
            type="button"
            className="action-btn-cut"
            onClick={() => onRunCommand && onRunCommand("experience")}
          >
            <span>🌿 Histórico Git (experience)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
