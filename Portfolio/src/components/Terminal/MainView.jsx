import CodeEditorOutput from "../Commands/CodeEditorOutput";
import AboutOutput from "../Commands/AboutOutput";
import ProjectsOutput from "../Commands/ProjectsOutput";
import SkillsOutput from "../Commands/SkillsOutput";
import ExperienceOutput from "../Commands/ExperienceOutput";
import ContactOutput from "../Commands/ContactOutput";
import HelpOutput from "../Commands/HelpOutput";
import EmptyEditorView from "../Commands/EmptyEditorView";

export default function MainView({ activeTab, onRunCommand }) {
  if (!activeTab) {
    return <EmptyEditorView onRunCommand={onRunCommand} />;
  }

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
      return <HelpOutput onRunCommand={onRunCommand} />;

    default:
      return <EmptyEditorView onRunCommand={onRunCommand} />;
  }
}
