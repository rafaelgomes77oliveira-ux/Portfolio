import { useState, useCallback } from "react";
import { portfolioData } from "../data/portfolioData";
import { DEFAULT_OPEN_TABS, DEFAULT_ACTIVE_TAB } from "../data/tabsData";
import { soundManager } from "../utils/audio";

export function useTerminal({ onToggleSound } = {}) {
  // Abas abertas no topo (inicialmente apenas a principal 'code' / portfolio.tsx)
  const [openTabs, setOpenTabs] = useState(DEFAULT_OPEN_TABS);
  // Aba ativa atual
  const [activeTab, setActiveTab] = useState(DEFAULT_ACTIVE_TAB); // 'code' | 'about' | 'projects' | 'skills' | 'experience' | 'contact' | 'terminal' | null

  // Abrir ou alternar para uma aba
  const openTab = useCallback((tabId) => {
    setOpenTabs((prev) => (prev.includes(tabId) ? prev : [...prev, tabId]));
    setActiveTab(tabId);
  }, []);

  // Fechar uma aba (com botão X)
  const closeTab = useCallback((tabIdToClose) => {
    soundManager.playBeep(420, 0.05, "sine");
    setOpenTabs((prevOpen) => {
      const idx = prevOpen.indexOf(tabIdToClose);
      if (idx === -1) return prevOpen;
      const nextOpen = prevOpen.filter((t) => t !== tabIdToClose);

      setActiveTab((currentActive) => {
        if (currentActive !== tabIdToClose) return currentActive;
        if (nextOpen.length === 0) return null;
        const nextIdx = Math.min(idx, nextOpen.length - 1);
        return nextOpen[nextIdx];
      });

      return nextOpen;
    });
  }, []);

  // Histórico de saídas do console do terminal integrado
  const [consoleEntries, setConsoleEntries] = useState([
    {
      id: "boot-init",
      type: "boot",
      lines: [
        "SYSTEM.KERNEL :: v2.5.0 ONLINE",
        "Ambiente IDE carregado com sucesso. Selecione os arquivos na barra lateral ou digite comandos.",
        "Dica: digite 'help' para listar comandos rápidos."
      ]
    }
  ]);

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputVal, setInputVal] = useState("");

  const executeCommand = useCallback((rawCmd) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    soundManager.playEnter();

    // Atualiza histórico de comandos
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(" ");
    const timestamp = new Date().toLocaleTimeString();

    if (mainCmd === "clear" || mainCmd === "cls") {
      setConsoleEntries([]);
      soundManager.playSuccess();
      return;
    }

    let textOutput = null;
    let isError = false;

    switch (mainCmd) {
      case "code":
      case "main":
      case "editor":
        openTab("code");
        textOutput = "Abrindo editor: portfolio.tsx";
        soundManager.playSuccess();
        break;

      case "about":
      case "bio":
        openTab("about");
        textOutput = "Abrindo arquivo: about.md";
        soundManager.playSuccess();
        break;

      case "projects":
      case "projetos":
        openTab("projects");
        textOutput = "Abrindo diretório: projects/";
        soundManager.playSuccess();
        break;

      case "skills":
      case "habilidades":
        openTab("skills");
        textOutput = "Abrindo arquivo: skills.json";
        soundManager.playSuccess();
        break;

      case "experience":
      case "experiencia":
      case "git":
        openTab("experience");
        textOutput = "Carregando histórico: experience.git (git log)";
        soundManager.playSuccess();
        break;

      case "contact":
      case "contato":
        openTab("contact");
        textOutput = "Executando canal: contact.exe";
        soundManager.playSuccess();
        break;

      case "terminal":
        openTab("terminal");
        textOutput = "Abrindo terminal interativo: terminal.sh";
        soundManager.playSuccess();
        break;

      case "help":
        openTab("terminal");
        textOutput = portfolioData.commands
          .map((c) => `$ ${c.command.padEnd(12, " ")} - ${c.desc}`)
          .join("\n");
        soundManager.playSuccess();
        break;

      case "whoami":
      case "system":
      case "neofetch":
      case "sysinfo":
        openTab("terminal");
        textOutput = `USUÁRIO: ${portfolioData.user}@${portfolioData.host}\nSO: CyberOS Linux 6.8.9 x86_64\nSHELL: zsh 5.9\nSTATUS: ONLINE`;
        soundManager.playSuccess();
        break;

      case "sound":
      case "audio":
        if (onToggleSound) {
          const newState = onToggleSound();
          textOutput = `Efeitos sonoros: [${newState ? "ATIVADO" : "DESATIVADO"}]`;
        }
        break;

      case "date":
        textOutput = `Data do sistema: ${new Date().toLocaleString("pt-BR")}`;
        soundManager.playSuccess();
        break;

      case "history":
        setCommandHistory((prevHistory) => {
          textOutput = prevHistory.length
            ? prevHistory.map((cmd, i) => `${String(i + 1).padStart(3, " ")}  ${cmd}`).join("\n")
            : "Nenhum comando registrado no histórico.";
          return prevHistory;
        });
        soundManager.playSuccess();
        break;

      case "sudo":
        soundManager.playError();
        isError = true;
        textOutput = `Permissão negada: '${portfolioData.user}' não está no arquivo sudoers. 🔒`;
        break;

      case "repo":
      case "github":
        window.open("https://github.com/rafaelgomes77oliveira-ux/Portfolio", "_blank");
        textOutput = "Abrindo repositório no GitHub...";
        soundManager.playSuccess();
        break;

      case "echo":
        textOutput = args || "";
        soundManager.playSuccess();
        break;

      default:
        soundManager.playError();
        isError = true;
        textOutput = `bash: comando não encontrado: "${trimmed}". Digite 'help' para comandos válidos.`;
        break;
    }

    setConsoleEntries((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        command: trimmed,
        timestamp,
        type: isError ? "error" : "command",
        textOutput,
      },
    ]);
    setInputVal("");
  }, [onToggleSound]);

  // Navegação no histórico (seta para cima)
  const navigateHistoryUp = useCallback(() => {
    setCommandHistory((history) => {
      if (history.length === 0) return history;
      setHistoryIndex((prevIdx) => {
        const newIdx = prevIdx === -1 ? history.length - 1 : Math.max(0, prevIdx - 1);
        setInputVal(history[newIdx] || "");
        return newIdx;
      });
      return history;
    });
  }, []);

  // Navegação no histórico (seta para baixo)
  const navigateHistoryDown = useCallback(() => {
    setCommandHistory((history) => {
      if (history.length === 0) return history;
      setHistoryIndex((prevIdx) => {
        if (prevIdx === -1) return -1;
        const newIdx = prevIdx + 1;
        if (newIdx >= history.length) {
          setInputVal("");
          return -1;
        }
        setInputVal(history[newIdx] || "");
        return newIdx;
      });
      return history;
    });
  }, []);

  // Autocomplete com Tab
  const autocomplete = useCallback(() => {
    const current = inputVal.trim().toLowerCase();
    if (!current) return;

    const available = portfolioData.commands.map((c) => c.command);
    const matches = available.filter((c) => c.startsWith(current));

    if (matches.length === 1) {
      setInputVal(matches[0]);
      soundManager.playKeypress();
    } else if (matches.length > 1) {
      setConsoleEntries((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          command: inputVal,
          type: "autocomplete",
          textOutput: `Possíveis comandos: ${matches.join("  |  ")}`,
        },
      ]);
    }
  }, [inputVal]);

  return {
    openTabs,
    setOpenTabs,
    openTab,
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
  };
}
