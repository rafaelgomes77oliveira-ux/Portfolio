export const EDITOR_TABS = [
  {
    id: "code",
    name: "portfolio.tsx",
    icon: "⚛️",
    label: "Hero / Código",
    desc: "Apresentação e código principal",
  },
  {
    id: "about",
    name: "about.md",
    icon: "📝",
    label: "Sobre Mim",
    desc: "Biografia, formação e objetivos",
  },
  {
    id: "skills",
    name: "skills.json",
    icon: "⚙️",
    label: "Habilidades",
    desc: "Stack tecnológica e proficiência",
  },
  {
    id: "experience",
    name: "experience.git",
    icon: "🌿",
    label: "Experiência",
    desc: "Histórico profissional e acadêmico",
  },
  {
    id: "projects",
    name: "projects/",
    icon: "📁",
    label: "Projetos",
    desc: "Aplicações e repositórios desenvolvidos",
  },
  {
    id: "contact",
    name: "contact.exe",
    icon: "✉️",
    label: "Contato",
    desc: "Canais de contato e redes sociais",
  },
  {
    id: "terminal",
    name: "terminal.sh",
    icon: "💻",
    label: "Terminal / Ajuda",
    desc: "Manual CLI e comandos do sistema",
  },
];

// Por padrão, apenas a aba principal ('code' - portfolio.tsx) vem aberta
export const DEFAULT_OPEN_TABS = ["code"];
export const DEFAULT_ACTIVE_TAB = "code";

export function getTabById(id) {
  return (
    EDITOR_TABS.find((t) => t.id === id) || {
      id,
      name: `${id}.txt`,
      icon: "📄",
      label: id,
      desc: id,
    }
  );
}
