import { useRef } from "react";
import TerminalHeader from "./TerminalHeader";
import TerminalPrompt from "./TerminalPrompt";
import QuickToolbar from "../UI/QuickToolbar";
import SidebarNav from "../UI/SidebarNav";
import EditorTabs from "../UI/EditorTabs";
import MainView from "./MainView";
import { useTerminal } from "../../hooks/useTerminal";

export default function Terminal({
  soundActive,
  onToggleSound,
}) {
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

  const handleContainerClick = (e) => {
    // Foca o input caso o clique não tenha sido em um botão ou link clicável
    if (!e.target.closest("button") && !e.target.closest("a") && !e.target.closest("input")) {
      const input = terminalBodyRef.current?.querySelector("input");
      input?.focus();
    }
  };

  return (
    <div className="terminal-workspace-layout" onClick={handleContainerClick}>
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
          <div className="integrated-terminal-panel">
            <div className="terminal-panel-header">
              <span className="panel-badge">TERMINAL // CONSOLE</span>
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
            <span>ARQUIVO ATIVO: {activeTab || "NENHUM"}</span>
            <span className="footer-separator">•</span>
            <span>CODIFICAÇÃO: UTF-8</span>
          </div>
          <div className="footer-right">
            <span>USE TAB PARA COMPLETAR • ↑/↓ HISTÓRICO</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
