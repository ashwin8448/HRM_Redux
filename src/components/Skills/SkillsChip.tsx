import { useEffect, useRef } from "react";
import { ISelectOptionProps, ISkill } from "../../core/interfaces/interface";
import { SkillsChipWrapper, SkillsListWrapper } from "./skillsChip";

function SkillsChip({
  skills,
  handleSkillsOverflow,
  className,
}: {
  skills: ISkill[] | ISelectOptionProps[];
  handleSkillsOverflow?: (isOverflow: boolean) => void;
  className?: string;
}) {
  const skillsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (handleSkillsOverflow) {
      const skillsContainer = skillsContainerRef.current;

      const handleResize = () => {
        if (skillsContainer) {
          const isOverflowing =
            skillsContainer.scrollWidth > skillsContainer.clientWidth;

          handleSkillsOverflow(isOverflowing);
        }
      };

      // Initial check
      handleResize();

      // Add event listener
      window.addEventListener("resize", handleResize); // calculate the scrollwidth whenever the window gets resized

      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    // TODO: Remove dependencies
  }, [skills, skillsContainerRef]);

  return (skills && 
    <SkillsListWrapper className={` ${className}`} ref={skillsContainerRef}>
      {skills.map((skill: ISkill | ISelectOptionProps) => {
        return (
          <SkillsChipWrapper key={"id" in skill ? skill.id : skill.value}>
            {"skill" in skill ? skill.skill : skill.label}
          </SkillsChipWrapper>
        );
      })}
    </SkillsListWrapper>
  );
}
export default SkillsChip;
