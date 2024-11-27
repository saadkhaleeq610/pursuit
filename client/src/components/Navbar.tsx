import React, { useState } from 'react';
import PursuitLogo from "../assets/pursuit.svg";
import Menu from "../assets/menu.svg";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav className="bg-white shadow-sm w-full border-b-[1px] border-opacity-40 border-pursuit-black">
      <div className="flex justify-between items-center h-18 px-14">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img width={80} src={PursuitLogo} alt="Pursuit Logo" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <ul className="text-pursuit-black flex md:gap-9 font-medium text-sm">
            <li><Link to="/">Products</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/contact">Solutions</Link></li>
          </ul>
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="md:hidden sm:block cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          role="button"
          aria-label="Toggle menu"
        >
          <img width={22} src={Menu} alt="Menu Icon" />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-white shadow-lg md:hidden">
          <ul className="text-pursuit-black flex flex-col gap-3 font-bold px-8 py-4">
            <li><Link to="/">Products</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/contact">Solutions</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
