import { SiReact } from "react-icons/si";
import {
  VscMarkdown,
  VscJson,
  VscGitBranch,
  VscFolder,
  VscMail,
  VscTerminal,
  VscFile,
} from "react-icons/vsc";

export const EDITOR_TABS = [
  {
    id: "code",
    name: "portfolio.tsx",
    icon: SiReact,
    iconColor: "#61DAFB",
    label: "Hero / Código",
    desc: "Apresentação e código principal",
  },
  {
    id: "about",
    name: "about.md",
    icon: VscMarkdown,
    iconColor: "#38bdf8",
    label: "Sobre Mim",
    desc: "Biografia, formação e objetivos",
  },
  {
    id: "skills",
    name: "skills.json",
    icon: VscJson,
    iconColor: "#f59e0b",
    label: "Habilidades",
    desc: "Stack tecnológica e proficiência",
  },
  {
    id: "experience",
    name: "experience.git",
    icon: VscGitBranch,
    iconColor: "#00ff66",
    label: "Experiência",
    desc: "Histórico profissional e acadêmico",
  },
  {
    id: "projects",
    name: "projects/",
    icon: VscFolder,
    iconColor: "#fcd34d",
    label: "Projetos",
    desc: "Aplicações e repositórios desenvolvidos",
  },
  {
    id: "contact",
    name: "contact.exe",
    icon: VscMail,
    iconColor: "#38bdf8",
    label: "Contato",
    desc: "Canais de contato e formulário de e-mail",
  },
  {
    id: "terminal",
    name: "terminal.sh",
    icon: VscTerminal,
    iconColor: "#39ff14",
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
      icon: VscFile,
      iconColor: "#a3a3a3",
      label: id,
      desc: id,
    }
  );
}
