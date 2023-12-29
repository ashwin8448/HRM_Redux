import { useEffect, useRef, useState } from "react";
import { ISelectOptionProps } from "../../core/interfaces/interface";
import { SkillsChipWrapper, SkillsListWrapper } from "./skillsChip";
import Tooltip from "../Tooltip/Tooltip.tsx";

function SkillsChip({ skills }: { skills:  ISelectOptionProps[]| undefined }) {
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

  if (skills && !skills.length) {
    // No skills, nothing to render
    return null;
  }

  return Array.isArray(skills) && skills.length > 0 ? (
    <>
      <SkillsListWrapper className="overflow-ellipsis" ref={skillsContainerRef}>
        {skills.map((skill: ISelectOptionProps)  => {
          return (
            <SkillsChipWrapper key={skill.value}>{skill.label}</SkillsChipWrapper>
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
