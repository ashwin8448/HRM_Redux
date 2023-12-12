import HeaderWrapper from "./header.ts";
import StyledLink from "./../StyledLink";
import { useState } from "react";
import Tooltip from "../Tooltip/Tooltip.tsx";

function Header() {
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
                        <h1 className="page-title">HRM</h1>
                        {hover && <Tooltip message="Go to homepage" />}
                    </span>
                </StyledLink>
            </div>
        </HeaderWrapper>
    );
}
export default Header;
