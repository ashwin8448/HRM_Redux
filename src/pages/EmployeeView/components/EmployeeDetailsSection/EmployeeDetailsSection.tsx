import { useMediaQuery } from "usehooks-ts";
import DetailsSection from "../../../../components/Details/Details.tsx";
import { ISelectOptionProps } from "../../../../core/interfaces/interface.ts";
import EmployeeDetailsSectionWrapper from "./employeeDetailsSection.ts";

function EmployeeDetailsSection({
  title,
  details,
}: {
  title: string;
  details: { title: string; content: string | ISelectOptionProps[] }[];
}) {
  const responsive_matches = useMediaQuery("(min-width: 400px)");

  return (
    <EmployeeDetailsSectionWrapper>
      <h2 className="details-heading">{title}</h2>
      <div className="detail-element common-flex">
        {details.map((detail) => (
          <DetailsSection
            key={detail.title}
            title={detail.title}
            content={detail.content}
            newline={!responsive_matches}
            matches
          />
        ))}
      </div>
    </EmployeeDetailsSectionWrapper>
  );
}

export default EmployeeDetailsSection;
