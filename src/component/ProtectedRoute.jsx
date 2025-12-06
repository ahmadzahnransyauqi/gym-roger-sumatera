import { Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, role: userRole, isLoading } = useAuth();

  // Optionally, show a loading state while verifying token
  if (isLoading) return <div>Loading...</div>;

  // Not logged in → redirect to login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Role check (if provided)
  if (role && userRole !== role) return <Navigate to="/login" replace />;

  // User is allowed → render the children
  return children;
}
