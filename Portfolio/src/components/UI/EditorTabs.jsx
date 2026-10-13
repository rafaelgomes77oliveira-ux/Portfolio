export default function EditorTabs({ activeTab, onSelectTab }) {
  const tabs = [
    { id: "code", name: "portfolio.tsx", icon: "⚛️" },
    { id: "about", name: "about.md", icon: "📝" },
    { id: "projects", name: "projects/", icon: "📁" },
    { id: "skills", name: "skills.json", icon: "⚙️" },
    { id: "experience", name: "experience.git", icon: "🌿" },
    { id: "contact", name: "contact.exe", icon: "✉️" },
    { id: "terminal", name: "terminal.sh", icon: "💻" },
  ];

  return (
    <div className="editor-tabs-container">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`editor-tab-item ${isActive ? "active" : ""}`}
            onClick={() => onSelectTab(tab.id)}
            title={`Alternar para ${tab.name}`}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-name">{tab.name}</span>
            {isActive && <span className="tab-active-pip"></span>}
          </button>
        );
      })}
    </div>
  );
}
