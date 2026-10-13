// Sintetizador Web Audio API nativo e super leve para sons de terminal retrô
class TerminalSound {
  constructor() {
    this.audioCtx = null;
    this.enabled = false; // Desabilitado por padrão para respeitar preferências
  }

  init() {
    if (!this.audioCtx && typeof window !== "undefined") {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
  }

  toggle() {
    this.init();
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.playBeep(800, 0.08, "triangle");
    }
    return this.enabled;
  }

  playKeypress() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      // Ruído de clique mecânico suave
      osc.type = "sine";
      osc.frequency.setValueAtTime(600 + Math.random() * 200, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.015, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch {
      // Ignora silenciosamente se o navegador bloquear autoplay
    }
  }

  playBeep(frequency = 600, duration = 0.06, type = "sine") {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.03, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // AudioContext policy
    }
  }

  playEnter() {
    this.playBeep(520, 0.08, "square");
  }

  playError() {
    this.playBeep(220, 0.15, "sawtooth");
  }

  playSuccess() {
    if (!this.enabled) return;
    this.playBeep(700, 0.06, "triangle");
    setTimeout(() => {
      this.playBeep(980, 0.09, "triangle");
    }, 60);
  }
}

export const soundManager = new TerminalSound();
