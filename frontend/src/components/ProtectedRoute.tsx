import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "admin";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  // console.log("aca?");
  
  const { isAuth, user } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
