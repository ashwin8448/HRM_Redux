import FooterWrapper from "./footer";

function Footer() {
    //Function to get the current Year
    const getYear = () => {
        const now = new Date();
        return now.getFullYear().toString();
    };

    return (
        <FooterWrapper>
            <span className="copyright-content">
                Copyright @{getYear()} HRM, All Rights Reserved
            </span>
        </FooterWrapper>
    );
}
export default Footer;
