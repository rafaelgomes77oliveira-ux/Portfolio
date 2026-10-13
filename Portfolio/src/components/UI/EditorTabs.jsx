import { getTabById } from "../../data/tabsData";

export default function EditorTabs({
  openTabs = [],
  activeTab,
  onSelectTab,
  onCloseTab,
}) {
  if (!openTabs || openTabs.length === 0) {
    return (
      <div className="editor-tabs-container empty-tabs">
        <span className="empty-tabs-hint">Nenhum arquivo aberto no editor</span>
      </div>
    );
  }

  return (
    <div className="editor-tabs-container" role="tablist">
      {openTabs.map((tabId) => {
        const tab = getTabById(tabId);
        const isActive = activeTab === tab.id;

        return (
          <div
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            tabIndex={0}
            className={`editor-tab-item ${isActive ? "active" : ""}`}
            onClick={() => onSelectTab && onSelectTab(tab.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectTab && onSelectTab(tab.id);
              }
            }}
            onAuxClick={(e) => {
              // Botão do meio do mouse (scroll) fecha a aba estilo VS Code
              if (e.button === 1) {
                e.preventDefault();
                onCloseTab && onCloseTab(tab.id);
              }
            }}
            title={`${tab.name} (${tab.label}) • Clique para ver, botão X para fechar`}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-name">{tab.name}</span>

            {/* Botão de Fechar Aba (X) */}
            <button
              type="button"
              className="tab-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab && onCloseTab(tab.id);
              }}
              title={`Fechar ${tab.name}`}
              aria-label={`Fechar ${tab.name}`}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {isActive && <span className="tab-active-pip"></span>}
          </div>
        );
      })}
    </div>
  );
}
