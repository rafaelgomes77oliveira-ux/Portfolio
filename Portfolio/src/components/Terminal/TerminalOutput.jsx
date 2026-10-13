import { useEffect, useRef } from "react";
import { portfolioData } from "../../data/portfolioData";

export default function TerminalOutput({ entries }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  return (
    <div className="terminal-entries">
      {entries.map((entry) => {
        if (entry.type === "boot") {
          return (
            <div key={entry.id} className="boot-sequence-block">
              {entry.lines.map((line, idx) => (
                <div key={idx} className="boot-line">
                  <span className="boot-timestamp">[  0.{String(idx * 142).padStart(6, "0")}]</span>
                  <span className="boot-text">{line}</span>
                </div>
              ))}
            </div>
          );
        }

        return (
          <div key={entry.id} className={`terminal-entry type-${entry.type}`}>
            {entry.command !== undefined && (
              <div className="entry-command-line">
                <div className="prompt-label-compact">
                  <span className="prompt-user">{portfolioData.user}@{portfolioData.host}</span>
                  <span className="prompt-colon">:</span>
                  <span className="prompt-path">~</span>
                  <span className="prompt-symbol">$</span>
                </div>
                <span className="executed-cmd">{entry.command}</span>
                {entry.timestamp && <span className="entry-timestamp">[{entry.timestamp}]</span>}
              </div>
            )}

            <div className="entry-content">
              {entry.textOutput && (
                <pre className={`text-output ${entry.type === "error" ? "error-text" : ""}`}>
                  {entry.textOutput}
                </pre>
              )}
              {entry.component && <div className="component-output">{entry.component}</div>}
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} className="terminal-scroll-anchor" />
    </div>
  );
}
