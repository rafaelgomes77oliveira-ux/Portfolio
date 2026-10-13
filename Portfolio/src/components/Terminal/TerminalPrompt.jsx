import { useEffect, useRef } from "react";
import { portfolioData } from "../../data/portfolioData";
import { soundManager } from "../../utils/audio";

export default function TerminalPrompt({
  inputVal,
  setInputVal,
  onEnter,
  onNavigateUp,
  onNavigateDown,
  onAutocomplete,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    soundManager.playKeypress();

    if (e.key === "Enter") {
      e.preventDefault();
      onEnter(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      onNavigateUp();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      onNavigateDown();
    } else if (e.key === "Tab") {
      e.preventDefault();
      onAutocomplete();
    }
  };

  return (
    <div className="terminal-prompt-row">
      <div className="prompt-label">
        <span className="prompt-user">{portfolioData.user}@{portfolioData.host}</span>
        <span className="prompt-colon">:</span>
        <span className="prompt-path">~</span>
        <span className="prompt-symbol">$</span>
      </div>

      <div className="prompt-input-container">
        <input
          ref={inputRef}
          type="text"
          className="terminal-real-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck="false"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          placeholder="digite um comando (ex: help)..."
          aria-label="Linha de comando do terminal"
        />
        <span className="terminal-cursor">█</span>
      </div>
    </div>
  );
}
