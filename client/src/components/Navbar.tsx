import { FC } from "react";
import { Gear, UserCircle, Tag, Martini, House, ListBullets, UserPlus, ChartBar, SuitcaseSimple, Hamburger } from "phosphor-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

interface SidebarProps {
  logoText: string;
  className?: string;
}

const Sidebar: FC<SidebarProps> = ({ logoText, className }) => {
  const { restaurant } = useAuthStore();
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <House size={18} /> },
    { path: "/profile", label: "Profile", icon: <UserCircle size={18} /> },
    { path: "/orders", label: "Orders", icon: <Tag size={18} />, auth: true },
    { path: "/customers", label: "Customers", icon: <ListBullets size={18} />, auth: true },
    { path: "/analytics", label: "Analytics", icon: <ChartBar size={18} />, auth: true },
    { path: "/marketing", label: "Marketing", icon: <SuitcaseSimple size={18} />, auth: true },
    { path: "/menu", label: "Menu", icon: <Hamburger size={18} />, auth: true },
    { path: "/restaurant-details", label: "Restaurant Details", icon: <Martini size={18} />, auth: true },
    { path: "/settings", label: "Settings", icon: <Gear size={18} /> },
    { path: "/invite-staff", label: "Invite Staff", icon: <UserPlus size={18} />, auth: true },
    { path: "/register-restaurant", label: "Register Restaurant", auth: false },
  ];

  return (
    <div className={cn("fixed h-full flex", className)}>
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-[#22331D] shadow-lg px-4 py-8 flex flex-col">
        {/* Logo */}
        <div className="mb-6">
          <Link to="/dashboard" className="text-xl font-black text-[#F65A11] pl-2">{logoText}</Link>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2 flex-grow">
          {menuItems.map(({ path, label, icon, auth }) => {
            if (auth !== undefined && auth !== !!restaurant) return null;
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-2 py-2 rounded-lg text-sm pl-3",
                  isActive ? "bg-[#2a4024] text-white" : "text-[#EFEDE7] hover:text-white"
                )}
              >
                {icon} {label}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="flex items-center gap-2 text-sm text-red-400 hover:text-red-700 px-3 py-2 rounded-md mt-auto"
        >
          Logout
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;
