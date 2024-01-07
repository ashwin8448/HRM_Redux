import { Navigate, useLocation } from "react-router-dom";
import useAuth from "./useAuth";
import { ReactNode } from "react";

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: string[];
}) => {

  const { user } = useAuth();
  const location = useLocation();
  
  return (
    <>
      {user.isAuthenticated && user.employeeDetails ? (
        allowedRoles.find(
          (role) => role === user.employeeDetails!.accessControlRole
        ) ? (
          <>{children}</>
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default ProtectedRoute;
