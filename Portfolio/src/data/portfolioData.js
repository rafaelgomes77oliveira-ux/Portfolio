import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiVite,
  SiNodedotjs,
  SiPython,
  SiGodotengine,
  SiGithub,
  SiVercel,
  SiLinux,
  SiFigma,
  SiUnity,
} from "react-icons/si";
import { FaJava, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { DiPhotoshop } from "react-icons/di";
import { VscPlug, VscDatabase } from "react-icons/vsc";
import asepriteLogo from "../assets/aseprite logo.png";

export const portfolioData = {
  user: "rafael",
  host: "arch-terminal",
  title: "Desenvolvedor de Software & Estudante de Tecnologia",
  version: "v2.5.0-hacker-edition",
  
  about: {
    name: "Rafael Gomes Antunes de Oliveira",
    role: "Full Stack Developer | Estudante de Engenharia de Software",
    location: "Belo Horizonte, MG, Brasil",
    bio: [
      "Olá, bem-vindo(a) ao meu terminal! Sou um desenvolvedor focado em criar aplicações web modernas, funcionais e com design marcante.",
      "Atualmente cursando faculdade de Engenharia de Software, dedico meu tempo ao desenvolvimento de software, arquitetura de sistemas e experiência do usuário (UX/UI).",
      "Tenho paixão por código limpo, boas práticas, automação e resolver problemas complexos com soluções elegantes."
    ],
    highlights: [
      "Foco em ecossistema JavaScript / TypeScript / React / Node.js",
      "Interesse constante em novas tecnologias, cloud e segurança",
      "Facilidade de aprendizado e trabalho colaborativo"
    ]
  },

  skills: {
    frontend: [
      { name: "React.js", level: 90, icon: SiReact, color: "#61DAFB" },
      { name: "JavaScript (ES6+)", level: 92, icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", level: 80, icon: SiTypescript, color: "#3178C6" },
      { name: "HTML5 / Semantic Web", level: 95, icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3 / Modern CSS / Tailwind", level: 88, icon: SiCss, color: "#3C99DC" },
      { name: "Vite / Next.js", level: 85, icon: SiVite, color: "#646CFF" }
    ],
    backend: [
      { name: "Node.js", level: 82, icon: SiNodedotjs, color: "#68A063" },
      { name: "Java", level: 80, icon: FaJava, color: "#ED8B00" },
      { name: "RESTful APIs", level: 88, icon: VscPlug, color: "#FF79C6" },
      { name: "Python", level: 75, icon: SiPython, color: "#3776AB" },
      { name: "GdScript", level: 82, icon: SiGodotengine, color: "#478CBF" }
    ],
    database: [
      { name: "JSONServer", level: 75, icon: VscDatabase, color: "#00D8FF" }
    ],
    tools: [
      { name: "Git & GitHub", level: 90, icon: SiGithub, color: "#F05032" },
      { name: "Vercel / Cloud Deploy", level: 85, icon: SiVercel, color: "#FFFFFF" },
      { name: "Figma (UI/UX)", level: 82, icon: SiFigma, color: "#F24E1E" },
      { name: "Unity", level: 82, icon: SiUnity, color: "#FFFFFF" },
      { name: "Aseprite", level: 75, icon: asepriteLogo, color: "#7D5FFF" },
      { name: "Photoshop", level: 75, icon: DiPhotoshop, color: "#31A8FF" }
    ]
  },

  projects: [
    {
      id: "portfolio-terminal",
      title: "IDE Terminal Portfolio",
      category: "Frontend / Creative UX",
      description: "Portfólio interativo com estética de terminal de IDE, comandos dinâmicos, autocomplete e histórico.",
      techs: ["React", "Vite", "Vanilla CSS", "Web Audio API", "Vercel"],
      demoUrl: "https://seu-portfolio.vercel.app",
      githubUrl: "https://github.com/rafaelgomes77oliveira-ux/Portfolio",
      featured: true,
      status: "ONLINE"
    },
    {
      id: "Castle-Defenders",
      title: "Castle Denfenders Pygame",
      category: "Pixel-Art / Pygame",
      description: "Jogo desenvolvido em 2 semanas com PyGame no 1° semestre da faculdade de Eng. Software. Design feito em pixel art. Menções na documentação do projeto.",
      techs: ["PyGame","Python","Aseprite","Pixel art"],
      demoUrl: "https://github.com/rafaelgomes77oliveira-ux/Pygame-Castle-Defenders",
      githubUrl: "https://github.com/rafaelgomes77oliveira-ux/Pygame-Castle-Defenders",
      featured: true,
      status: "COMPLETED"
    },
    {
      id: "Conci",
      title: "Conci",
      category: "Acadêmico / Web App",
      description: "Sistema em desenvolvimento na matéria de Trabalho interdisciplinar com a proposta de ser uma plataforma de conexão entre clientes e prestadores autônomos",
      techs: ["JavaScript", "React", "CSS Modules", "MongoDB", "Vite", "SpringBoot"],
      demoUrl: "https://github.com/rafaelgomes77oliveira-ux",
      githubUrl: "https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2026-2-ti2-7600100-Conci",
      featured: false,
      status: "ACTIVE"
    },
    {
      id: "api-crypto-tracker",
      title: "Real-time Crypto & Market Monitor",
      category: "API & Data Viz",
      description: "Aplicação que consome APIs financeiras em tempo real para monitorar tendências, cotações de criptoativos e histórico em gráficos interativos.",
      techs: ["TypeScript", "React", "Chart.js", "REST APIs"],
      demoUrl: "https://github.com/rafaelgomes77oliveira-ux",
      githubUrl: "https://github.com/rafaelgomes77oliveira-ux",
      featured: false,
      status: "PROTOTYPE"
    }
  ],

  contacts: [
    {
      name: "GitHub",
      display: "github.com/rafaelgomes77oliveira-ux",
      url: "https://github.com/rafaelgomes77oliveira-ux",
      cmd: "open github",
      icon: SiGithub,
      color: "#FFFFFF"
    },
    {
      name: "LinkedIn",
      display: "linkedin.com/in/rafael-g-antunes-8bba733a3",
      url: "https://www.linkedin.com/in/rafael-g-antunes-8bba733a3",
      cmd: "open linkedin",
      icon: FaLinkedin,
      color: "#0A66C2"
    },
    {
      name: "Email",
      display: "rafaelgomesa0403@gmail.com",
      url: "mailto:rafaelgomesa0403@gmail.com",
      cmd: "send mail",
      icon: FaEnvelope,
      color: "#EA4335"
    },
    {
      name: "WhatsApp",
      display: "+55 (21) 9673-2729",
      url: "https://wa.me/552196732729",
      cmd: "open whatsapp",
      icon: FaWhatsapp,
      color: "#25D366"
    }
  ],

  experience: [
    {
      hash: "8a4c12e",
      branch: "HEAD -> main",
      tag: "v2.0.0",
      role: "Graduação em Tecnologia / Ciência da Computação",
      org: "Faculdade",
      period: "2023 - Presente",
      description: "Formação superior com foco em algoritmos, arquitetura de software, engenharia de requisitos e sistemas distribuídos.",
      changes: "+420 horas/aula, 8 projetos acadêmicos entregues",
      skills: ["POO", "Engenharia de Software"]
    },
    {
      hash: "5d9f03b",
      branch: "origin/feat-design",
      tag: "v1.4.0",
      role: "Desenvolvedor Front-end & UI (Projetos & Prática)",
      org: "zion escola de entretenimento",
      period: "2023 - 2025",
      description: "Desenvolvimento de interfaces modernas em React, consumo de APIs REST, componentização e otimização de performance para web.",
      changes: "+50 trabalhos",
      skills: ["Photoshop", "Figma", "Aseprite", "Pixel Art", "Indesign", "Illustrator"]
    },
    {
      hash: "46d54f9",
      branch: "origin/feat-web",
      tag: "v1.2.0",
      role: "Desenvolvedor Front-end & UI (Projetos & Prática)",
      org: "Autônomo / Freelance",
      period: "2024 - 2025",
      description: "Desenvolvimento de interfaces modernas em React, consumo de APIs REST, componentização e otimização de performance para web.",
      changes: "+5 repositories, 15 projetos entregues ",
      skills: ["React.js", "Vite", "JavaScript ES6+", "Git/GitHub", "CSS Moderno"]
    },
    {
      hash: "2b7a81c",
      branch: "init",
      tag: "v0.1.0",
      role: "Início da Jornada em Programação",
      org: "Estudos & Comunidade Tech",
      period: "2022 - 2023",
      description: "Fundamentos básicos de lógica de programação, versionamento com Git, HTML semântico e estilização CSS aplicada a projetos reais.",
      changes: "+50 commits iniciais",
      skills: ["Lógica de Programação", "Git", "HTML/CSS", "JavaScript", "pixel art"]
    }
  ],

  commands: [
    { command: "help", desc: "Lista todos os comandos disponíveis no sistema" },
    { command: "about", desc: "Apresenta biografia, formação e trajetória profissional" },
    { command: "code", desc: "Abre a janela de editor de código interativo (portfolio.tsx)" },
    { command: "projects", desc: "Exibe a lista de projetos desenvolvidos com links" },
    { command: "skills", desc: "Mostra as tecnologias e proficiências técnicas" },
    { command: "experience", desc: "Exibe o histórico acadêmico e profissional estilo git log" },
    { command: "contact", desc: "Exibe formas de contato e redes sociais" },
    { command: "sound", desc: "Ativa ou desativa os efeitos sonoros de terminal (teclado)" },
    { command: "clear", desc: "Limpa a tela do terminal" },
    { command: "history", desc: "Exibe o histórico de comandos digitados" },
    { command: "date", desc: "Exibe a data e hora do sistema" },
    { command: "whoami", desc: "Mostra informações do usuário autenticado na sessão" },
    { command: "sudo", desc: "Tenta executar privilégio de administrador (root)" },
    { command: "repo", desc: "Abre o repositório deste portfólio no GitHub" },
    { command: "lang", desc: "Alterna o idioma do portfólio entre Português e Inglês" }
  ],

  bootSequence: [
    "CYBER_OS KERNEL 6.8.9-TERMINAL-GENESIS INITIALIZED",
    "CHECKING SYSTEM MEMORY... 32768 MB OK",
    "LOADING NEURAL INTERFACES & REACT VITE MODULES...",
    "ESTABLISHING SECURE SSH CONNECTION: guest@terminal.rafael-dev",
    "FIREWALL: ACTIVE | STATUS: ALL SYSTEMS OPERATIONAL [OK]",
    "DIGITE 'help' PARA LISTAR OS COMANDOS DISPONÍVEIS OU USE OS BOTÕES RÁPIDOS."
  ]
};
