import { ParagraphStyles } from "../../core/constants/components/text/textStyledComponents";
import FooterWrapper from "./footer";

function Footer() {
  //Function to get the current Year
  const getYear = () => {
    const now = new Date();
    return now.getFullYear().toString();
  };

  return (
    <FooterWrapper>
      <ParagraphStyles className="copyright-content">
        Copyright @{getYear()} HRM, All Rights Reserved
      </ParagraphStyles>
    </FooterWrapper>
  );
}
export default Footer;
