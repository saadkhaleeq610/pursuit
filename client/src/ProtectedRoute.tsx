import { Navigate } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";
import Sidebar from "@/components/Navbar";
import TopBar from "./components/Topbar";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, restaurant } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Sidebar logoText={restaurant?.name || "Pursuit"} />
      <TopBar/>
      <main className="pl-64">{children}</main>
    </div>
  );
};
