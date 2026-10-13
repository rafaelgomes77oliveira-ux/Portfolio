import { useEffect, useRef } from "react";

export default function MatrixRain({ enabled = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Caracteres Matrix: Katakana japonês + Números + Letras
    const characters = "ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ1234567890ABCDEF<>/*{}[]&%$#@";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    let lastDrawTime = 0;
    const fpsInterval = 1000 / 30; // 30 FPS para suavidade e baixo consumo de CPU

    const draw = (currentTime) => {
      animationFrameId = requestAnimationFrame(draw);

      const elapsed = currentTime - lastDrawTime;
      if (elapsed < fpsInterval) return;
      lastDrawTime = currentTime - (elapsed % fpsInterval);

      // Efeito de rastro translúcido escuro
      ctx.fillStyle = "rgba(5, 8, 7, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Destaque branco/verde claro na ponta do feixe
        ctx.fillStyle = Math.random() > 0.85 ? "#a6ffc9" : "#00ff66";
        ctx.shadowColor = "#00ff66";
        ctx.shadowBlur = 4;
        ctx.fillText(char, x, y);

        // Reset da gota ao passar da tela
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      aria-hidden="true"
    />
  );
}
