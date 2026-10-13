import CodeEditorOutput from "../Commands/CodeEditorOutput";
import AboutOutput from "../Commands/AboutOutput";
import ProjectsOutput from "../Commands/ProjectsOutput";
import SkillsOutput from "../Commands/SkillsOutput";
import ExperienceOutput from "../Commands/ExperienceOutput";
import ContactOutput from "../Commands/ContactOutput";
import HelpOutput from "../Commands/HelpOutput";

export default function MainView({ activeTab, onRunCommand }) {
  switch (activeTab) {
    case "code":
      return <CodeEditorOutput onRunCommand={onRunCommand} />;

    case "about":
      return <AboutOutput />;

    case "projects":
      return <ProjectsOutput />;

    case "skills":
      return <SkillsOutput />;

    case "experience":
      return <ExperienceOutput />;

    case "contact":
      return <ContactOutput />;

    case "terminal":
    default:
      return <HelpOutput onRunCommand={onRunCommand} />;
  }
}
