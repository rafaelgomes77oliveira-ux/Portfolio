import { useState, useCallback } from "react";
import { portfolioData } from "../data/portfolioData";
import { soundManager } from "../utils/audio";

export function useTerminal({ onToggleSound } = {}) {
  // Aba ativa atual (inspirado nas abas de arquivos do VS Code / abdulmomin.dev)
  const [activeTab, setActiveTab] = useState("code"); // 'code' | 'about' | 'projects' | 'skills' | 'experience' | 'contact' | 'terminal'
  
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
        setActiveTab("code");
        textOutput = "Abrindo editor: portfolio.tsx";
        soundManager.playSuccess();
        break;

      case "about":
      case "bio":
        setActiveTab("about");
        textOutput = "Abrindo arquivo: about.md";
        soundManager.playSuccess();
        break;

      case "projects":
      case "projetos":
        setActiveTab("projects");
        textOutput = "Abrindo diretório: projects/";
        soundManager.playSuccess();
        break;

      case "skills":
      case "habilidades":
        setActiveTab("skills");
        textOutput = "Abrindo arquivo: skills.json";
        soundManager.playSuccess();
        break;

      case "experience":
      case "experiencia":
      case "git":
        setActiveTab("experience");
        textOutput = "Carregando histórico: experience.git (git log)";
        soundManager.playSuccess();
        break;

      case "contact":
      case "contato":
        setActiveTab("contact");
        textOutput = "Executando canal: contact.exe";
        soundManager.playSuccess();
        break;

      case "help":
        setActiveTab("terminal");
        textOutput = portfolioData.commands
          .map((c) => `$ ${c.command.padEnd(12, " ")} - ${c.desc}`)
          .join("\n");
        soundManager.playSuccess();
        break;

      case "whoami":
      case "system":
      case "neofetch":
      case "sysinfo":
        setActiveTab("terminal");
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
