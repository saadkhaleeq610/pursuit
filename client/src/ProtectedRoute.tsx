import { Navigate } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";
import Navbar from "@/components/Navbar";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, restaurant } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar logoText={restaurant?.name || "Pursuit"} />
      <main className="py-20">{children}</main>
    </div>
  );
};
