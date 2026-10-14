import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiFigma,
  SiGodotengine,
  SiLinux,
  SiVite,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";
import asepriteLogo from "../assets/aseprite logo.png";

export const skillsData = [
  { name: "React", icon: SiReact, color: "#61DAFB", link: "https://react.dev/" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", link: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", link: "https://www.typescriptlang.org/" },
  { name: "Node.js", icon: SiNodedotjs, color: "#68A063", link: "https://nodejs.org/" },
  { name: "Python", icon: SiPython, color: "#3776AB", link: "https://www.python.org/" },
  { name: "Java", icon: FaJava, color: "#ED8B00", link: "https://www.java.com/" },
  { name: "Aseprite", icon: asepriteLogo, color: "#7D5FFF", link: "https://www.aseprite.org/" },
  { name: "GdScript / Godot", icon: SiGodotengine, color: "#478CBF", link: "https://godotengine.org/" },
  { name: "Vite", icon: SiVite, color: "#646CFF", link: "https://vitejs.dev/" },
  { name: "Linux", icon: SiLinux, color: "#FCC624", link: "https://www.kernel.org/" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E", link: "https://www.figma.com/" },
  { name: "Photoshop", icon: DiPhotoshop, color: "#31A8FF", link: "https://www.adobe.com/products/photoshop.html" },
  { name: "Illustrator", icon: DiIllustrator, color: "#FF9A00", link: "https://www.adobe.com/products/illustrator.html" },
];
