import HeaderWrapper from "./header.ts";
import StyledLink from "./../StyledLink";
import Tooltip from "../Tooltip/Tooltip.tsx";
import { useMediaQuery } from "usehooks-ts";

function Header() {
    const matches = useMediaQuery('(min-width: 768px)')

    return (
        <HeaderWrapper>
            <div className="header-content global-width">
                <StyledLink to="/">
                    <span className="logo">
                    <h1 className={matches ? `page-title` : `page-title-mobile`}>Employee Management</h1>
                        <Tooltip className="header-tooltip" message="Go to homepage" />
                    </span>
                </StyledLink>
            </div>
        </HeaderWrapper>
    );
}
export default Header;
