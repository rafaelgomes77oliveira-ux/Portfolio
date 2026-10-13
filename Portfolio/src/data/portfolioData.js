export const portfolioData = {
  user: "rafael",
  host: "arch-terminal",
  title: "Desenvolvedor de Software & Estudante de Tecnologia",
  version: "v2.5.0-hacker-edition",
  
  about: {
    name: "Rafael Gomes Oliveira",
    role: "Full Stack Developer | Estudante de Engenharia de Software",
    location: "Brasil",
    bio: [
      "Olá, bem-vindo(a) ao meu terminal! Sou um desenvolvedor focado em criar aplicações web modernas, funcionais e com design marcante.",
      "Atualmente cursando faculdade na área de tecnologia, dedico meu tempo ao desenvolvimento de software, arquitetura de sistemas e experiência do usuário (UX/UI).",
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
      { name: "React.js", level: 90, icon: "⚛️" },
      { name: "JavaScript (ES6+)", level: 92, icon: "⚡" },
      { name: "TypeScript", level: 80, icon: "🔷" },
      { name: "HTML5 / Semantic Web", level: 95, icon: "🌐" },
      { name: "CSS3 / Modern CSS / Tailwind", level: 88, icon: "🎨" },
      { name: "Vite / Next.js", level: 85, icon: "🚀" }
    ],
    backend: [
      { name: "Node.js", level: 82, icon: "🟢" },
      { name: "Express.js", level: 80, icon: "🛠️" },
      { name: "RESTful APIs", level: 88, icon: "🔌" },
      { name: "Python", level: 75, icon: "🐍" }
    ],
    database: [
      { name: "PostgreSQL", level: 78, icon: "🐘" },
      { name: "MySQL", level: 80, icon: "🐬" },
      { name: "MongoDB", level: 75, icon: "🍃" }
    ],
    tools: [
      { name: "Git & GitHub", level: 90, icon: "🐙" },
      { name: "Vercel / Cloud Deploy", level: 85, icon: "▲" },
      { name: "Linux / Bash", level: 78, icon: "🐧" },
      { name: "Figma (UI/UX)", level: 82, icon: "📐" },
      { name: "Docker", level: 70, icon: "🐳" }
    ]
  },

  projects: [
    {
      id: "portfolio-terminal",
      title: "Hacker Terminal Portfolio",
      category: "Frontend / Creative UX",
      description: "Portfólio interativo com estética de terminal cyberpunk, comandos dinâmicos, autocomplete, histórico e chuva de código Matrix.",
      techs: ["React", "Vite", "Vanilla CSS", "Web Audio API", "Vercel"],
      demoUrl: "https://seu-portfolio.vercel.app",
      githubUrl: "https://github.com/rafaelgomes77oliveira-ux/Portfolio",
      featured: true,
      status: "ONLINE"
    },
    {
      id: "task-manager-api",
      title: "Fullstack Task Management System",
      category: "Fullstack",
      description: "Plataforma para gerenciamento ágil de tarefas e sprints com autenticação JWT, dashboards de métricas e notificações em tempo real.",
      techs: ["React", "Node.js", "Express", "PostgreSQL", "JWT"],
      demoUrl: "https://github.com/rafaelgomes77oliveira-ux",
      githubUrl: "https://github.com/rafaelgomes77oliveira-ux",
      featured: true,
      status: "COMPLETED"
    },
    {
      id: "facul-academic-hub",
      title: "Portal Acadêmico / Estudos",
      category: "Acadêmico / Web App",
      description: "Sistema desenvolvido durante os projetos da faculdade para organização de matérias, notas, prazos e repositório de pesquisas.",
      techs: ["JavaScript", "React", "CSS Modules", "LocalStorage"],
      demoUrl: "https://github.com/rafaelgomes77oliveira-ux",
      githubUrl: "https://github.com/rafaelgomes77oliveira-ux",
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
      icon: "🐙"
    },
    {
      name: "LinkedIn",
      display: "linkedin.com/in/rafaelgomesoliveira",
      url: "https://www.linkedin.com/",
      cmd: "open linkedin",
      icon: "💼"
    },
    {
      name: "Email",
      display: "rafael.dev@exemplo.com",
      url: "mailto:rafael.dev@exemplo.com",
      cmd: "send mail",
      icon: "✉️"
    },
    {
      name: "WhatsApp",
      display: "+55 (XX) XXXXX-XXXX",
      url: "https://wa.me/",
      cmd: "open whatsapp",
      icon: "💬"
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
      skills: ["Estruturas de Dados", "POO", "Banco de Dados", "Engenharia de Software"]
    },
    {
      hash: "5d9f03b",
      branch: "origin/feat-web",
      tag: "v1.2.0",
      role: "Desenvolvedor Front-end & UI (Projetos & Prática)",
      org: "Autônomo / Freelance",
      period: "2024 - Presente",
      description: "Desenvolvimento de interfaces modernas em React, consumo de APIs REST, componentização e otimização de performance para web.",
      changes: "+18 repositories, 100% código versionado",
      skills: ["React.js", "Vite", "JavaScript ES6+", "Git/GitHub", "CSS Moderno"]
    },
    {
      hash: "2b7a81c",
      branch: "init",
      tag: "v0.1.0",
      role: "Início da Jornada em Programação",
      org: "Estudos & Comunidade Tech",
      period: "2022 - 2023",
      description: "Fundamentos de lógica de programação, versionamento com Git, HTML semântico e estilização CSS aplicada a projetos reais.",
      changes: "+150 commits iniciais",
      skills: ["Lógica de Programação", "Git", "HTML/CSS", "JavaScript"]
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
    { command: "repo", desc: "Abre o repositório deste portfólio no GitHub" }
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
