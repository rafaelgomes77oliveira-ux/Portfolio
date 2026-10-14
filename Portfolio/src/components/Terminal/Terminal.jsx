import { useRef, useEffect } from "react";
import TerminalHeader from "./TerminalHeader";
import TerminalPrompt from "./TerminalPrompt";
import QuickToolbar from "../UI/QuickToolbar";
import SidebarNav from "../UI/SidebarNav";
import EditorTabs from "../UI/EditorTabs";
import MainView from "./MainView";
import { useTerminal } from "../../hooks/useTerminal";
import { useLanguage } from "../../context/LanguageContext";

export default function Terminal({
  soundActive,
  onToggleSound,
}) {
  const { language, t } = useLanguage();
  const terminalBodyRef = useRef(null);

  const {
    openTabs,
    closeTab,
    activeTab,
    setActiveTab,
    consoleEntries,
    inputVal,
    setInputVal,
    executeCommand,
    navigateHistoryUp,
    navigateHistoryDown,
    autocomplete,
  } = useTerminal({
    onToggleSound,
  });

  // Sempre que mudar de aba, reseta o scroll para o topo da página para não cortar conteúdo
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const handleTerminalPanelClick = (e) => {
    // Foca o input apenas se o usuário clicou na área do console e não em botões/links
    if (!e.target.closest("button") && !e.target.closest("a") && !e.target.closest("input")) {
      const input = terminalBodyRef.current?.querySelector("input");
      input?.focus({ preventScroll: true });
    }
  };

  return (
    <div className="terminal-workspace-layout">
      {/* Sidebar estilo IDE inspirada no abdulmomin.dev */}
      <SidebarNav
        onRunCommand={(cmd) => executeCommand(cmd)}
        activeCommand={activeTab}
        openTabs={openTabs}
      />

      {/* Painel Principal do Workspace Fullscreen */}
      <div className="terminal-main-pane">
        <TerminalHeader
          soundActive={soundActive}
          onToggleSound={onToggleSound}
          onClear={() => executeCommand("clear")}
        />

        {/* Abas no topo do editor de código estilo VS Code */}
        <EditorTabs
          openTabs={openTabs}
          activeTab={activeTab}
          onSelectTab={(tabId) => setActiveTab(tabId)}
          onCloseTab={closeTab}
        />

        {/* Área de visualização do arquivo ativo */}
        <div ref={terminalBodyRef} className="ide-active-view-container">
          <div className="view-content-wrapper">
            <MainView
              activeTab={activeTab}
              onRunCommand={(cmd) => executeCommand(cmd)}
            />
          </div>

          {/* Console de Terminal Integrado na base da visualização */}
          <div className="integrated-terminal-panel" onClick={handleTerminalPanelClick}>
            <div className="terminal-panel-header">
              <span className="panel-badge">{t("terminal.title")}</span>
              <span className="panel-status">bash • UTF-8</span>
            </div>

            {/* Logs de comandos executados */}
            {consoleEntries.length > 0 && (
              <div className="console-log-list">
                {consoleEntries.map((item) => (
                  <div key={item.id} className="console-log-item">
                    {item.command && (
                      <div className="console-cmd-line">
                        <span className="console-prompt">rafael@arch:~$</span>
                        <span className="console-cmd-text">{item.command}</span>
                        {item.timestamp && <span className="console-time">[{item.timestamp}]</span>}
                      </div>
                    )}
                    {item.textOutput && (
                      <pre className={`console-output-text ${item.type === "error" ? "error-text" : ""}`}>
                        {item.textOutput}
                      </pre>
                    )}
                    {item.lines && (
                      <div className="console-boot-lines">
                        {item.lines.map((l, idx) => (
                          <div key={idx} className="boot-line-small">
                            <span className="boot-arrow">›</span> {l}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Input interativo */}
            <TerminalPrompt
              inputVal={inputVal}
              setInputVal={setInputVal}
              onEnter={executeCommand}
              onNavigateUp={navigateHistoryUp}
              onNavigateDown={navigateHistoryDown}
              onAutocomplete={autocomplete}
            />

            {/* Atalhos rápidos logo abaixo do prompt */}
            <QuickToolbar onRunCommand={(cmd) => executeCommand(cmd)} />
          </div>
        </div>

        {/* Rodapé fixo do sistema */}
        <footer className="terminal-footer">
          <div className="footer-left">
            <span>{t("status.activeFile")} {activeTab || (language === "pt" ? "NENHUM" : "NONE")}</span>
            <span className="footer-separator">•</span>
            <span>{t("status.encoding")}</span>
          </div>
          <div className="footer-right">
            <span>{t("status.shortcuts")}</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
