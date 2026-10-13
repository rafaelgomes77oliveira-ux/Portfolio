import { useState } from "react";
import { portfolioData } from "../../data/portfolioData";

export default function ContactOutput() {
  const { contacts } = portfolioData;
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (text, index) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="cmd-output cmd-contact">
      <div className="output-header">
        <span className="accent-tag">[ COMM CHANNELS: OPEN FOR TRANSMISSIONS ]</span>
        <span className="output-sub">Canais de comunicação disponíveis para contato e oportunidades:</span>
      </div>

      <div className="contact-grid">
        {contacts.map((contact, index) => (
          <div key={contact.name} className="contact-card">
            <div className="contact-card-top">
              <span className="contact-icon">{contact.icon}</span>
              <span className="contact-network">{contact.name}</span>
            </div>

            <div className="contact-details">
              <a
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-value-link"
              >
                {contact.display}
              </a>
            </div>

            <div className="contact-actions">
              <a
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-link-btn primary"
              >
                <span>Conectar ↗</span>
              </a>
              <button
                type="button"
                className="cyber-link-btn"
                onClick={() => handleCopy(contact.display, index)}
              >
                <span>{copiedIndex === index ? "✓ Copiado!" : "Copiar"}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="contact-footer-note">
        <p className="dim-text">
          📡 Disponível para propostas de estágio, projetos freelance e colaborações open source.
        </p>
      </div>
    </div>
  );
}
