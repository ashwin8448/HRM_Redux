import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return (
    <>
      {user.isAuthenticated ? (
        <>{children}</>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};
export default ProtectedRoute;
