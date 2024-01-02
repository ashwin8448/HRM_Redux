import {
  LabelStyles,
  ParagraphStyles,
} from "../../core/constants/components/text/textStyledComponents.ts";
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
        {title && <LabelStyles className="title">{title}</LabelStyles>}
      </div>
      {typeof content === "string" ? (
        <ParagraphStyles className="content overflow-ellipsis">
          {content}
        </ParagraphStyles>
      ) : (
        <SkillsChip skills={content} />
      )}
    </DetailsWrapper>
  );
};

export default DetailsSection;
