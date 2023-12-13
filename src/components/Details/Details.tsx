import { ISkill } from "../../core/interfaces/interface";
import SkillsChip from "../Skills/SkillsChip.tsx";
import DetailsWrapper from "./details.ts";

const DetailsSection = ({
  icon,
  title,
  content,
  matches,
}: {
  icon: string;
  title: string;
  content: string | ISkill[];
  matches: boolean;
}) => {
  console.log(matches);
  console.log((matches ? "mobile " : "")+"heading overflow-ellipsis");
  return (
    <DetailsWrapper className="common-flex">
      <div className={(matches ? "mobile " : "")+"heading overflow-ellipsis"}>
        <span className="material-symbols-outlined ">{icon}</span>
        <p className="title">{title}</p>
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
