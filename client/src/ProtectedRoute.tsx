import { useAuthStore } from "./store/useAuthStore";
import { Navigate } from "react-router";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
}