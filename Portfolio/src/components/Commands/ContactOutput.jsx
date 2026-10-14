import { useState } from "react";
import { portfolioData } from "../../data/portfolioData";
import { soundManager } from "../../utils/audio";
import { useLanguage } from "../../context/LanguageContext";
import {
  VscSend,
  VscCopy,
  VscCheck,
  VscClearAll,
  VscAccount,
  VscMail,
  VscTag,
  VscEdit,
  VscRadioTower,
  VscLoading,
} from "react-icons/vsc";
import { SiGmail } from "react-icons/si";

export default function ContactOutput() {
  const { language, t } = useLanguage();
  const { contacts } = portfolioData;
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Estado do formulário de e-mail direto
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formCopied, setFormCopied] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // "idle" | "sending" | "success" | "error"

  const handleCopy = (text, index) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      soundManager.playEnter();
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  // Envio DIRETO para o e-mail via API sem precisar abrir Gmail ou cliente local
  const handleSendDirectEmail = async (e) => {
    if (e) e.preventDefault();
    const { name, email, subject, message } = formState;

    if (!message.trim()) {
      soundManager.playError();
      alert(t("contact.alertEmptyMessage"));
      return;
    }

    setSubmitStatus("sending");
    soundManager.playEnter();

    const recipient = "rafaelgomesa0403@gmail.com";
    const sub = subject.trim() || (language === "pt" ? `[Portfólio] Contato de ${name || "Visitante"}` : `[Portfolio] Contact from ${name || "Visitor"}`);

    try {
      // Endpoint de envio direto sem abrir cliente de email
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || `https://formsubmit.co/ajax/${recipient}`;
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name || (language === "pt" ? "Visitante do Portfólio" : "Portfolio Visitor"),
          email: email || "visitante@portfolio.dev",
          _subject: sub,
          message: message,
          _captcha: "false",
          _template: "table",
        }),
      });

      if (response.ok) {
        soundManager.playSuccess();
        setSubmitStatus("success");
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("HTTP Status " + response.status);
      }
    } catch {
      soundManager.playError();
      setSubmitStatus("error");
    }
  };

  const handleCopyFormContent = () => {
    const { name, email, subject, message } = formState;
    const bodyContent = `Para: rafaelgomesa0403@gmail.com\nAssunto: ${subject || (language === "pt" ? "Contato de Portfólio" : "Portfolio Contact")}\nRemetente: ${name || "Visitante"} (${email || "Sem e-mail"})\n\nMensagem:\n${message || "(Mensagem em branco)"}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(bodyContent);
      soundManager.playSuccess();
      setFormCopied(true);
      setTimeout(() => setFormCopied(false), 2500);
    }
  };

  const handleClearForm = () => {
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setSubmitStatus("idle");
  };

  const renderContactIcon = (icon, color) => {
    if (!icon) return null;
    if (typeof icon === "function") {
      const IconComp = icon;
      return <IconComp style={{ color: color || "inherit" }} aria-hidden="true" />;
    }
    return <span>{icon}</span>;
  };

  return (
    <div className="cmd-output cmd-contact">
      {/* Cabeçalho */}
      <div className="output-header">
        <span className="accent-tag">{t("contact.tag")}</span>
        <span className="output-sub">{t("contact.subtitle")}</span>
      </div>

      {/* Cards de Contato Direto */}
      <div className="contact-grid">
        {contacts.map((contact, index) => (
          <div key={contact.name} className="contact-card">
            <div className="contact-card-top">
              <span className="contact-icon">{renderContactIcon(contact.icon, contact.color)}</span>
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
                <span>{t("contact.connectBtn")} ↗</span>
              </a>
              <button
                type="button"
                className="cyber-link-btn"
                onClick={() => handleCopy(contact.display, index)}
              >
                <span>{copiedIndex === index ? `✓ ${t("contact.copiedBtn")}` : t("contact.copyBtn")}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Formulário Interativo de Envio Direto por E-mail */}
      <div className="contact-form-section">
        <div className="contact-form-header">
          <div className="form-title-wrap">
            <span className="form-icon"><VscMail /></span>
            <h3 className="form-title">{t("contact.formTitle")}</h3>
          </div>
          <p className="form-desc">
            {t("contact.formDesc")} <strong>rafaelgomesa0403@gmail.com</strong> {t("contact.formDescSuffix")}
          </p>
        </div>

        {/* Notificação de Sucesso */}
        {submitStatus === "success" && (
          <div className="form-notice-box success">
            <span className="notice-icon"><VscCheck /></span>
            <div className="notice-text">
              <strong>{t("contact.successTitle")}</strong>
              <p>{t("contact.successDesc")}</p>
            </div>
          </div>
        )}

        {/* Notificação de Erro / Alternativa */}
        {submitStatus === "error" && (
          <div className="form-notice-box warning">
            <span className="notice-icon"><VscRadioTower /></span>
            <div className="notice-text">
              <strong>{t("contact.errorTitle")}</strong>
              <p>{t("contact.errorDesc")}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSendDirectEmail} className="contact-cyber-form">
          <div className="form-row-dual">
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">
                <VscAccount className="label-icon" /> {t("contact.nameLabel")}
              </label>
              <input
                id="contact-name"
                type="text"
                className="form-input"
                placeholder={t("contact.namePlaceholder")}
                value={formState.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">
                <VscMail className="label-icon" /> {t("contact.emailLabel")}
              </label>
              <input
                id="contact-email"
                type="email"
                className="form-input"
                placeholder={t("contact.emailPlaceholder")}
                value={formState.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contact-subject" className="form-label">
              <VscTag className="label-icon" /> {t("contact.subjectLabel")}
            </label>
            <input
              id="contact-subject"
              type="text"
              className="form-input"
              placeholder={t("contact.subjectPlaceholder")}
              value={formState.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message" className="form-label">
              <VscEdit className="label-icon" /> {t("contact.messageLabel")} <span className="req-star">*</span>
            </label>
            <textarea
              id="contact-message"
              className="form-textarea"
              rows={5}
              placeholder={t("contact.messagePlaceholder")}
              value={formState.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-actions-bar">
            {/* Botão de Envio Direto (sem abrir cliente local) */}
            <button
              type="submit"
              className="action-btn-cut primary"
              disabled={submitStatus === "sending"}
            >
              {submitStatus === "sending" ? (
                <>
                  <VscLoading className="spinner-icon" />
                  <span>{t("contact.sendingBtn")}</span>
                </>
              ) : (
                <>
                  <VscSend />
                  <span>{t("contact.sendBtn")}</span>
                </>
              )}
            </button>

            {/* Alternativa Direta: Abrir no Gmail */}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=rafaelgomesa0403@gmail.com&su=${encodeURIComponent(
                formState.subject || (language === "pt" ? "Contato de Portfólio" : "Portfolio Contact")
              )}&body=${encodeURIComponent(
                `Olá Rafael,\n\n${formState.message || ""}\n\n---\nRemetente: ${formState.name || "Visitante"}\nE-mail: ${formState.email || "Não informado"}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn-cut gmail-web"
              title="Abrir diretamente no Gmail Web (Navegador)"
            >
              <SiGmail style={{ color: "#ea4335" }} />
              <span>{t("contact.gmailWebBtn")}</span>
            </a>

            {/* Copiar mensagem */}
            <button
              type="button"
              className="action-btn-cut"
              onClick={handleCopyFormContent}
              title="Copiar texto formatado da mensagem para a área de transferência"
            >
              {formCopied ? <VscCheck /> : <VscCopy />}
              <span>{formCopied ? `✓ ${t("contact.copiedBtn")}` : t("contact.copyMessageBtn")}</span>
            </button>

            {/* Limpar */}
            <button
              type="button"
              className="action-btn-cut reset"
              onClick={handleClearForm}
              title="Limpar todos os campos preenchidos"
            >
              <VscClearAll />
              <span>{t("contact.clearBtn")}</span>
            </button>
          </div>
        </form>
      </div>

      <div className="contact-footer-note">
        <p className="dim-text" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <VscRadioTower style={{ color: "var(--accent, #61dafb)", flexShrink: 0 }} />
          <span>{t("contact.footerNote")}</span>
        </p>
      </div>
    </div>
  );
}
