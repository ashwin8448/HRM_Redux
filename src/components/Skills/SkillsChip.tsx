import { useRef } from "react";
import { ISelectOptionProps } from "../../core/interfaces/interface.ts";
import colors from "../../core/constants/colors.ts";
import { ChipListWrapper, ChipWrapper } from "./chip.ts";
import TooltipComponent from "../Tooltip/Tooltip.tsx";
import { ParagraphStyles } from "../../core/constants/components/text/textStyledComponents.ts";
import useOverflowCheck from "../../hooks/overflowHook.ts";

function SkillsChip({ skills }: { skills: ISelectOptionProps[] | undefined }) {

  const skillsContainerRef = useRef<HTMLDivElement | null>(null);
  const skillsOverflow = useOverflowCheck(skillsContainerRef);


  const colorsRange: (keyof typeof colors)[] = [
    "SKILL_CHIP_COLOR_1",
    "SKILL_CHIP_COLOR_2",
    "SKILL_CHIP_COLOR_3",
  ];
  const backgroundColorsRange: (keyof typeof colors)[] = [
    "SKILL_CHIP_BACKGROUND_COLOR_1",
    "SKILL_CHIP_BACKGROUND_COLOR_2",
    "SKILL_CHIP_BACKGROUND_COLOR_3",
  ];

  const tooltipMsg = skills ? skills.map((msg) => msg.label).join(", ") : "";

  const chipList =
    Array.isArray(skills) && skills.length > 0 ? (
      <ChipListWrapper
        className="overflow-ellipsis skills-container"
        ref={skillsContainerRef}
        $skillsOverflow={skillsOverflow}
      >
        {skills.map((skill: ISelectOptionProps, index: number) => {
          const colorIndex = index % colorsRange.length;
          const color = colorsRange[colorIndex];
          const backgroundColor = backgroundColorsRange[colorIndex];

          return (
            <ChipWrapper
              key={skill.value}
              $color={color}
              $backgroundColor={backgroundColor}
            >
              {skill.label}
            </ChipWrapper>
          );
        })}
      </ChipListWrapper>
    ) : (
      <ParagraphStyles className="content overflow-ellipsis">-</ParagraphStyles>
    );

  return skillsOverflow ? (
    <TooltipComponent title={tooltipMsg}>{chipList}</TooltipComponent>
  ) : (
    chipList
  );
}
export default SkillsChip;
