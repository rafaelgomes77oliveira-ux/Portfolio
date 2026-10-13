export default function QuickToolbar({ onRunCommand }) {
  const quickActions = [
    { label: "code", desc: "Editor portfolio.tsx" },
    { label: "about", desc: "Sobre mim" },
    { label: "projects", desc: "Projetos" },
    { label: "skills", desc: "Habilidades" },
    { label: "experience", desc: "Trajetória Git Log" },
    { label: "contact", desc: "Contato" },
    { label: "whoami", desc: "Sistema" },
    { label: "clear", desc: "Limpar" },
  ];

  return (
    <div className="quick-toolbar">
      <span className="quick-label">⚡ COMANDOS RÁPIDOS:</span>
      <div className="quick-buttons">
        {quickActions.map((action) => (
          <button
            key={action.label}
            type="button"
            className="quick-btn"
            onClick={() => onRunCommand(action.label)}
            title={`Executar: ${action.label} (${action.desc})`}
          >
            <span className="quick-dollar">$</span>
            <span className="quick-text">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
