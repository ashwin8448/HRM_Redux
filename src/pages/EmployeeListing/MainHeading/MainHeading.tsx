import SectionWrapper from "./mainHeading.ts";
import StyledLink from './../../../components/StyledLink.ts';
import Button from "../../../components/Button/Button.tsx";
import { useMediaQuery } from "usehooks-ts";

function MainHeading() {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <SectionWrapper>
      <h1 className={matches?`page-title`:`page-title-mobile`}>Employees</h1>
      {/* navigating to add-employee page */}
      <StyledLink to="add-employee">
        <Button icon="add_circle">{matches?"Add New Employee":""}</Button>
      </StyledLink>
    </SectionWrapper>
  );
}
export default MainHeading;
