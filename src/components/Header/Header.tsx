import HeaderWrapper from "./header.ts";
import Button from "../Button/Button.tsx";
import useAuth from "../../pages/Login/useAuth.ts";
import dummyImg from "../../assets/userAvatar.svg";
import logo from "../../assets/favicon.png";
import { useNavigate } from "react-router-dom";
import TooltipComponent from "../Tooltip/Tooltip.tsx";
import { H1Styles } from "../../core/constants/components/text/textStyledComponents.ts";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const logoElement = (
    <H1Styles>
      <img className="logo" src={logo} alt="" onClick={() => navigate("/")} />
    </H1Styles>
  );

  return (
    <HeaderWrapper>
      <div className="header-content global-width">
        {user.isAuthenticated ? (
          <>
            <TooltipComponent title="Go to homepage">
              {logoElement}
            </TooltipComponent>
            <div className="user-container">
              <div
                className="image-container"
                onClick={() => {
                  navigate(`view-employee/${user.employeeDetails?.id}`);
                }}
              >
                <img
                  src={user.employeeDetails?.photoId || dummyImg}
                  alt="user image"
                />
                {user.employeeDetails?.isNew && (
                  <span
                    className="material-symbols-outlined profile-error"
                    title="Please complete your profile"
                  >
                    report
                  </span>
                )}
              </div>
              <Button
                icon="logout"
                onClick={() => {
                  logout();
                }}
              />
            </div>
          </>
        ) : (
          logoElement
        )}
      </div>
    </HeaderWrapper>
  );
}
export default Header;
