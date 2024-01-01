import { ISelectOptionProps } from "../../core/interfaces/interface";
import SkillsChip from "../Skills/SkillsChip.tsx";
import DetailsWrapper from "./details.ts";

const DetailsSection = ({
  content,
  icon,
  title,
  newline,
}: {
  content: string | ISelectOptionProps[];
  icon?: string;
  title?: string;
  matches?: boolean;
  newline?: boolean;
}) => {
  return (
    <DetailsWrapper $newline={newline}>
      <div className="description">
        {icon && <span className="material-symbols-outlined ">{icon}</span>}
        {title && <span className="title">{title}</span>}
      </div>
      {typeof content === "string" ? (
        <p className="content overflow-ellipsis">{content}</p>
      ) : (
        <SkillsChip skills={content} />
      )}
    </DetailsWrapper>
  );
};

export default DetailsSection;
