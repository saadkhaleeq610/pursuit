import { FC, useState, useRef, useEffect } from "react";
import { Gear, UserCircle } from "phosphor-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

interface NavbarProps {
  logoText: string;
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ logoText, className }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettingsMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className={cn("fixed w-full flex items-center justify-between px-6 py-4 bg-white shadow-md", className)}>
      {/* Logo */}
      <Link to="/dashboard">
      <div className="text-xl font-semibold">{logoText}</div>
      </Link>

       {/* Right Section  */}
      <div className="flex items-center gap-4 relative">
        {/* Settings Icon */}
        <div className="relative" ref={settingsRef}>
          <Gear
            size={24}
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={() => setShowSettingsMenu((prev) => !prev)}
          />
          {showSettingsMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg p-2">
              <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Settings
              </Link>
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <div className="relative" ref={profileRef}>
          <UserCircle
            size={28}
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={() => setShowProfileMenu((prev) => !prev)}
          />
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2">
              <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              <Link to="/restaurant-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Restaurant Details
              </Link>
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login"; 
                }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
