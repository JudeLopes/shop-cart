import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
