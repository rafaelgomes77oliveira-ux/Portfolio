import { portfolioData } from "../../data/portfolioData";

export default function AboutOutput() {
  const { about } = portfolioData;

  return (
    <div className="cmd-output cmd-about">
      <div className="output-header">
        <span className="accent-tag">[ IDENTITY PROTOCOL: IDENTIFIED ]</span>
      </div>

      <div className="about-container">
        <div className="ascii-badge">
          <pre className="ascii-art">
{`   _____      ______          ______ _      
  |  __ \\    |  ____/\\       |  ____| |     
  | |__) |   | |__ /  \\      | |__  | |     
  |  _  /    |  __/ /\\ \\     |  __| | |     
  | | \\ \\ _  | | / ____ \\ _  | |____| |____ 
  |_|  \\_(_) |_|/_/    \\_(_) |______|______|`}
          </pre>
        </div>

        <div className="about-info">
          <h2 className="about-name">{about.name}</h2>
          <div className="about-role-badge">
            <span className="status-dot"></span>
            <span>{about.role}</span>
          </div>
          <p className="about-location">📍 Localização: {about.location}</p>

          <div className="about-bio-blocks">
            {about.bio.map((paragraph, index) => (
              <p key={index} className="about-text">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="about-highlights-box">
            <div className="highlights-title">⚡ DIRETRIZES & FOCO TÉCNICO:</div>
            <ul className="highlights-list">
              {about.highlights.map((item, idx) => (
                <li key={idx} className="highlight-item">
                  <span className="arrow-bullet">▶</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
