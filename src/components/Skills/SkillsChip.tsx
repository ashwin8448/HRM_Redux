import { useEffect, useRef, useState } from "react";
import { ISelectOptionProps } from "../../core/interfaces/interface";
import { SkillsChipWrapper, SkillsListWrapper } from "./skillsChip";
import Tooltip from "../Tooltip/Tooltip.tsx";
import colors from "../../core/constants/colors.ts";

function SkillsChip({ skills }: { skills: ISelectOptionProps[] | undefined }) {
  //check for skills overflowing the scroll width
  const [skillsOverflow, setSkillsOverflow] = useState(false);
  const handleSkillsOverflow = (isOverflow: boolean) => {
    setSkillsOverflow(isOverflow);
  };

  const skillsContainerRef = useRef<HTMLDivElement | null>(null);
  const handleResize = () => {
    const skillsContainer = skillsContainerRef.current;
    if (skillsContainer) {
      const isOverflowing =
        skillsContainer.scrollWidth > skillsContainer.clientWidth;

      handleSkillsOverflow?.(isOverflowing);
    }
  };

  useEffect(() => {
    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize); // calculate the scrollwidth whenever the window gets resized

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [skills, skillsContainerRef]);

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

  return Array.isArray(skills) && skills.length > 0 ? (
    <>
      <SkillsListWrapper
        className="overflow-ellipsis skills-container"
        ref={skillsContainerRef}
      >
        {skills.map((skill: ISelectOptionProps, index: number) => {
          const colorIndex = index % colorsRange.length;
          const color = colorsRange[colorIndex];
          const backgroundColor = backgroundColorsRange[colorIndex];

          return (
            <SkillsChipWrapper
              key={skill.value}
              $color={color}
              $backgroundColor={backgroundColor}
            >
              {skill.label}
            </SkillsChipWrapper>
          );
        })}
      </SkillsListWrapper>
      {skillsOverflow && (
        <Tooltip className="skills-tooltip" message={skills} />
      )}
    </>
  ) : (
    "-"
  );
}
export default SkillsChip;
