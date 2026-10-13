import { portfolioData } from "../../data/portfolioData";

export default function SystemInfoOutput() {
  const info = [
    { label: "OS", value: "CyberLinux x86_64 / React OS" },
    { label: "Host", value: "portfolio-terminal.vercel.app" },
    { label: "Kernel", value: "6.8.9-arch1-cyberpunk" },
    { label: "Uptime", value: "99.98% (High Availability)" },
    { label: "Shell", value: "zsh 5.9 (hacker-theme)" },
    { label: "Framework", value: "React 19 + Vite 8" },
    { label: "Hosting", value: "Vercel Edge Network" },
    { label: "User", value: `${portfolioData.user}@${portfolioData.host}` },
    { label: "Color Palette", value: "Matrix Phosphor Green (#00ff66) & Deep Onyx (#050807)" },
  ];

  return (
    <div className="cmd-output cmd-sysinfo">
      <div className="sysinfo-wrapper">
        <div className="sysinfo-logo">
          <pre className="arch-logo">
{`       /\\
      /  \\
     /\\   \\
    /      \\
   /   ,,   \\
  /   |  |  -\\
 /_-''    ''-_\\`}
          </pre>
        </div>

        <div className="sysinfo-stats">
          <div className="sysinfo-header">
            <span className="user-bold">{portfolioData.user}</span>
            <span className="at-sign">@</span>
            <span className="host-bold">{portfolioData.host}</span>
          </div>
          <div className="sysinfo-divider">--------------------------------</div>

          {info.map((item) => (
            <div key={item.label} className="sysinfo-line">
              <span className="stat-label">{item.label}:</span>
              <span className="stat-value">{item.value}</span>
            </div>
          ))}

          <div className="color-blocks">
            <span className="c-block" style={{ background: "#050807" }}></span>
            <span className="c-block" style={{ background: "#0d381e" }}></span>
            <span className="c-block" style={{ background: "#008f39" }}></span>
            <span className="c-block" style={{ background: "#00ff66" }}></span>
            <span className="c-block" style={{ background: "#38bdf8" }}></span>
            <span className="c-block" style={{ background: "#f59e0b" }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
