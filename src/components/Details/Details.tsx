import { ISkill } from "../../core/interfaces/interface";
import SkillsChip from "../Skills/SkillsChip.tsx";
import DetailsWrapper from "./details.ts";

const DetailsSection = ({
  icon,
  title,
  content,
  newline,
}: {
  icon?: string;
  title?: string;
  content: string | ISkill[];
  matches?: boolean;
  newline?: boolean;
}) => {
  return (
    <DetailsWrapper $newline={newline} $skill={typeof content != "string"}>
      <div className="description">
        <span className="material-symbols-outlined ">{icon}</span>
        {title && <span className="title">{title}</span>}
      </div>
      {typeof content === "string" ? (
        <p className="content overflow-ellipsis">{content}</p>
      ) : (
        <SkillsChip className="content" skills={content} />
      )}
    </DetailsWrapper>
  );
};

export default DetailsSection;
