# 💻 Hacker Terminal Portfolio | React + Vite

Um portfólio interativo de alta fidelidade visual inspirado em terminais cyberpunk, consoles Unix/Linux e na estética Matrix com fundo preto e tipografia verde neon fosforescente.

---

## 🚀 Tecnologias Utilizadas

- **React 19**: Biblioteca para construção de interfaces reativas e componentizadas.
- **Vite 8**: Build tool ultra-rápido com Hot Module Replacement (HMR).
- **Vanilla CSS3 Moderno**: Design system puro com variáveis CSS, efeitos CRT retrô, scanlines e tipografia monospace (`Fira Code`).
- **Canvas HTML5**: Efeito animado e leve de chuva de código Matrix (*Matrix Digital Rain*).
- **Web Audio API**: Efeitos sonoros mecânicos retrô sintetizados nativamente no navegador (sem dependências externas).
- **Vercel**: Otimizado para hospedagem rápida com *Edge Network*.

---

## ⚡ Funcionalidades do Terminal

- **CLI Interativo Completo**: Digite comandos como em um terminal real.
- **Histórico de Comandos**: Navegue pelos comandos digitados usando as setas `↑` e `↓`.
- **Autocompletar com Tab**: Pressione `Tab` para autocompletar os comandos disponíveis.
- **Barra de Atalhos Rápidos (Quick Toolbar)**: Botões com 1 clique para que recrutadores e visitantes em smartphones possam navegar instantaneamente.
- **Efeitos Visuais**:
  - `matrix`: Liga/desliga o fundo animado de código caindo.
  - `crt`: Liga/desliga as linhas de varredura vintage de monitores CRT.
  - `sound`: Liga/desliga sons suaves de clique de teclado mecânico e beeps retrô.
- **Comandos Reconhecidos**:
  - `help`: Lista todos os comandos disponíveis.
  - `about`: Biografia, formação e objetivos.
  - `projects`: Lista de projetos com cartões de visualização, links para código e demo ao vivo.
  - `skills`: Habilidades técnicas com barras de progresso ASCII e categorias.
  - `contact`: Links clicáveis para LinkedIn, GitHub, Email e WhatsApp (com botão de copiar com 1 clique).
  - `whoami` / `system`: Estatísticas do sistema estilo *neofetch*.
  - `clear`: Limpa a tela do terminal.
  - `date`: Exibe data e hora atual.
  - `history`: Exibe o histórico de comandos da sessão.
  - `sudo`: Easter egg divertido de permissão.

---

## 🛠️ Como Personalizar Seus Dados

Tudo está centralizado em um único arquivo fácil de editar:

📁 **`src/data/portfolioData.js`**

Nele você pode alterar:
1. Seu nome, bio e localização em `about`.
2. Seus projetos em `projects` (título, descrição, tecnologias, links do GitHub e deploy).
3. Suas tecnologias em `skills` (níveis e categorias).
4. Suas redes em `contacts` (GitHub, LinkedIn, Email, WhatsApp).

---

## 💻 Como Rodar Localmente

1. Entre na pasta do projeto:
```bash
cd portfolio
```

2. Instale as dependências (se ainda não tiver instalado):
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra no navegador em `http://localhost:5173`.

---

## 🌐 Como Hospedar na Vercel (Passo a Passo)

1. Faça o commit e envie suas alterações para o GitHub:
```bash
git add .
git commit -m "feat: estrutura do portfolio terminal hacker finalizada"
git push origin main
```

2. Acesse [vercel.com](https://vercel.com) e conecte sua conta do GitHub.
3. Clique em **Add New...** -> **Project** e selecione o repositório **Portfolio**.
4. ⚠️ **Configuração Importante na Vercel**:
   - No campo **Root Directory**, clique em *Edit* e selecione a pasta: `portfolio`
   - O **Framework Preset** será detectado automaticamente como **Vite**.
   - O **Build Command** será `npm run build` e o **Output Directory** será `dist`.
5. Clique em **Deploy**! Em poucos segundos o seu portfólio estará online com certificado SSL gratuito.
