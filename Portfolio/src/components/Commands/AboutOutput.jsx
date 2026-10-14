import { portfolioData } from "../../data/portfolioData";
import { VscLocation, VscTerminal } from "react-icons/vsc";
import { useLanguage } from "../../context/LanguageContext";

export default function AboutOutput() {
  const { t } = useLanguage();
  const { about } = portfolioData;

  const bioList = Array.isArray(t("about.bio")) ? t("about.bio") : about.bio;
  const highlightsList = Array.isArray(t("about.highlights")) ? t("about.highlights") : about.highlights;

  return (
    <div className="cmd-output cmd-about">
      <div className="output-header">
        <span className="accent-tag">{t("about.tag")}</span>
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
            <span>{t("about.role")}</span>
          </div>
          <p className="about-location">
            <VscLocation style={{ marginRight: "6px", verticalAlign: "middle" }} />
            {t("about.locationLabel")} {t("about.location")}
          </p>

          <div className="about-bio-blocks">
            {bioList.map((paragraph, index) => (
              <p key={index} className="about-text">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="about-highlights-box">
            <div className="highlights-title">
              <VscTerminal style={{ marginRight: "6px", verticalAlign: "middle" }} />
              {t("about.focusTitle")}
            </div>
            <ul className="highlights-list">
              {highlightsList.map((item, idx) => (
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
