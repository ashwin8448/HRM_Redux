import { Navigate, useLocation, useParams } from "react-router-dom";
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
  const { employeeId } = useParams();

  return (
    <>
      {user.isAuthenticated && user.employeeDetails ? (
        allowedRoles.find(
          (role) => role === user.employeeDetails!.accessControlRole
        ) || employeeId === user.employeeDetails?.id ? (
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
