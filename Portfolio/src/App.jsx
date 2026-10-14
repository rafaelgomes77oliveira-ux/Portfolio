import { useState } from "react";
import Terminal from "./components/Terminal/Terminal";
import MatrixRain from "./components/Terminal/MatrixRain";
import ScanlineOverlay from "./components/Terminal/ScanlineOverlay";
import { soundManager } from "./utils/audio";
import { LanguageProvider } from "./context/LanguageContext";
import "./App.css";

export default function App() {
  const [matrixActive, setMatrixActive] = useState(true);
  const [crtActive, setCrtActive] = useState(true);
  const [soundActive, setSoundActive] = useState(false);

  const handleToggleMatrix = () => {
    setMatrixActive((prev) => !prev);
    return !matrixActive;
  };

  const handleToggleCrt = () => {
    setCrtActive((prev) => !prev);
    return !crtActive;
  };

  const handleToggleSound = () => {
    const newState = soundManager.toggle();
    setSoundActive(newState);
    return newState;
  };

  return (
    <LanguageProvider>
      <div className="hacker-app fullscreen-mode">
        {/* Container principal ocupando tela cheia */}
        <main className="app-main-container">
          <Terminal
            soundActive={soundActive}
            onToggleSound={handleToggleSound}
          />
        </main>
      </div>
    </LanguageProvider>
  );
}
