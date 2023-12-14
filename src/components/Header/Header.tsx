import HeaderWrapper from "./header.ts";
import StyledLink from "./../StyledLink";
import { useState } from "react";
import Tooltip from "../Tooltip/Tooltip.tsx";
import { useMediaQuery } from "usehooks-ts";

function Header() {
    const matches = useMediaQuery('(min-width: 768px)')
    //tooltip on hovering skills
    const [hover, setHover] = useState(false);
    const handleMouseEnter = () => {
        setHover(true);
    };
    const handleMouseLeave = () => {
        setHover(false);
    };

    return (
        <HeaderWrapper>
            <div className="header-content">
                <StyledLink to="/">
                    <span className="logo" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <h1 className={matches ? `page-title` : `page-title-mobile`}>Employee Management</h1>
                        {hover && <Tooltip message="Go to homepage" />}
                    </span>
                </StyledLink>
            </div>
        </HeaderWrapper>
    );
}
export default Header;
