import { FC, useState, useRef, useEffect } from "react";
import { Gear, UserCircle, List, X } from "phosphor-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { useAuthStore } from "@/store/useAuthStore";

interface NavbarProps {
  logoText: string;
  className?: string;
}

const Navbar: FC<NavbarProps> = ({ logoText, className }) => {
  const { restaurant } = useAuthStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <nav className={cn("fixed w-full flex items-center justify-between px-6 py-4 bg-white shadow-lg z-50", className)}>
      <Link to="/dashboard">
        <div className="text-xl font-semibold">{logoText}</div>
      </Link>

      <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X size={28} /> : <List size={28} />}
      </button>

      <div className="hidden md:flex items-center gap-8 relative">
        {restaurant && (
          <div className="flex gap-6">
            <button className="py-2 relative text-sm font-bold before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">
              Sales
            </button>
            <button className="py-2 relative text-sm font-bold before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">
              Past Orders
            </button>
          </div>
        )}

        <div className="relative" ref={settingsRef}>
          <Gear
            size={28}
            className="cursor-pointer text-black hover:text-gray-800"
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

        <div className="relative" ref={profileRef}>
          <UserCircle
            size={32}
            className="cursor-pointer text-black hover:text-gray-800"
            onClick={() => setShowProfileMenu((prev) => !prev)}
          />
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2">
              <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              {restaurant ? (
                <>
                  <Link to="/restaurant-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Restaurant Details
                  </Link>
                  <Link to="/invite-staff" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Invite Staff
                  </Link>
                </>
              ) : (
                <Link to="/register-restaurant" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Register Restaurant
                </Link>
              )}
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

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col items-center gap-4 py-4">
          {restaurant && (
            <>
              <button className="py-2 relative text-sm font-bold before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">
                Sales
              </button>
              <button className="py-2 relative text-sm font-bold before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">
                Past Orders
              </button>
            </>
          )}

          <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Settings
          </Link>

          <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Profile
          </Link>

          {restaurant ? (
            <>
              <Link to="/restaurant-details" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Restaurant Details
              </Link>
              <Link to="/invite-staff" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Invite Staff
              </Link>
            </>
          ) : (
            <Link to="/register-restaurant" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Register Restaurant
            </Link>
          )}

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="block px-4 py-2 text-red-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
