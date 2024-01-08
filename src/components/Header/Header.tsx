import HeaderWrapper from "./header.ts";
import Tooltip from "../Tooltip/Tooltip.tsx";
import Button from "../Button/Button.tsx";
import useAuth from "../../pages/Login/useAuth.ts";
import dummyImg from "../../assets/userAvatar.svg";
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
        <div className="user-container">
          {user.isAuthenticated && (
            <>
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
            </>
          )}
        </div>
      </div>
    </HeaderWrapper>
  );
}
export default Header;
