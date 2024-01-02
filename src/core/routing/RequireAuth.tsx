import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import routerConfig from "./routerConfig";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { user } = useAuth();
  if (!user.isAuthenticated)
    return <Navigate to={routerConfig.defaultRedirect} state={{ from: location }} replace />;
  return <>{children}</>;
};

export default RequireAuth;
