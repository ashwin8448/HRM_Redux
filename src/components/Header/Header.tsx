import HeaderWrapper from "./header.ts";
import Button from "../Button/Button.tsx";
import useAuth from "../../pages/Login/useAuth.ts";
import logo from "../../assets/favicon.png";
import { useNavigate } from "react-router-dom";
import TooltipComponent from "../Tooltip/Tooltip.tsx";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  
const logoElement = (
  <img className="logo" src={logo} alt="" onClick={() => navigate("/")} />
);

  return (
    <HeaderWrapper>
      <div className="header-content global-width">
        {user.isAuthenticated ? (
          <TooltipComponent title="Go to homepage">{logoElement}</TooltipComponent>
        ) : (
           logoElement 
        )}
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
