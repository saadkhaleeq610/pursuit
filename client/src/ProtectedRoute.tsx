import { Navigate } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";
import Navbar from "@/components/Navbar";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar logoText="Pursuit" />
      <main className="py-12">{children}</main>
    </div>
  );
};
