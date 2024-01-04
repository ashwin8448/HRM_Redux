import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <>
      {user.isAuthenticated ? (
        <>{children}</>
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};
export default ProtectedRoute;
