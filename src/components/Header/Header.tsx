import HeaderWrapper from "./header.ts";
import StyledLink from "./../StyledLink";
import Tooltip from "../Tooltip/Tooltip.tsx";

function Header() {

  return (
    <HeaderWrapper>
      <div className="header-content global-width">
        <StyledLink to="/">
          <span className="logo-wrapper">
            <img className="logo" src="/favicon.png" alt="" />
            <Tooltip className="header-tooltip" message="Go to homepage" />
          </span>
        </StyledLink>
      </div>
    </HeaderWrapper>
  );
}
export default Header;
