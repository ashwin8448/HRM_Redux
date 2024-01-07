import HeaderWrapper from "./header.ts";
import Tooltip from "../Tooltip/Tooltip.tsx";
import Button from "../Button/Button.tsx";
import useAuth from "../../pages/Login/useAuth.ts";

import logo from "../../assets/favicon.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <HeaderWrapper>
      <div className="header-content global-width">
        <span className="logo-wrapper" onClick={() => navigate("/")}>
          <img className="logo" src={logo} alt="" />
          {user.isAuthenticated && (
            <Tooltip className="header-tooltip" message="Go to homepage" />
          )}
        </span>
        {user.isAuthenticated && (
          <Button
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </HeaderWrapper>
  );
}
export default Header;
