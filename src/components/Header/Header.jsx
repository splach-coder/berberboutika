import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.webp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const imageSize = isScrolled ? "w-[75px] h-[75px]" : "w-[150px] h-[150px]";

  const NavIcons = () => {
    return (
      <div className="flex">
        <button aria-label="Search" className="text-xl">
          <span>Loop</span>
        </button>
        <button aria-label="Cart" className="text-xl">
          <span>Shopping cart</span>
        </button>
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`subheader ${
        isScrolled
          ? "fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-lg shadow-m z-50"
          : ""
      } w-full bg-white shadow-md transition-all duration-350`}>
      {/* desktop design */}
      <div
        className={`container flex items-center py-4 px-12 ${
          isScrolled ? " justify-between" : " flex-col "
        }`}>

        <div className="flex flex-col items-center">
          <img src={logo} alt="Logo" className={imageSize} />
        </div>

        <div className="hidden lg:w-full lg:flex justify-center py-1">
          <div className="space-x-4">
            <Link to="/" className="text-sm font-medium">
              SOLDES D'ÉTÉ
            </Link>
            <Link to="/mixmatch" className="text-sm font-medium">
              LE MIX&MATCH DU MOIS
            </Link>
            <Link to="/table" className="text-sm font-medium">
              ARTS DE LA TABLE
            </Link>
            <Link to="/sets" className="text-sm font-medium">
              NOS SETS&COFFRETS
            </Link>
            <Link to="/decoration" className="text-sm font-medium">
              DÉCORATION
            </Link>
            <Link to="/scents" className="text-sm font-medium">
              SENTEURS D'INTÉRIEURS
            </Link>
            <Link to="/lifestyle" className="text-sm font-medium">
              LIFE STYLE
            </Link>
            <Link to="/infos" className="text-sm font-medium">
              INFOS
            </Link>
          </div>

          <div className="absolute right-0">
            {!isScrolled && <NavIcons />}
          </div>
        </div>

        {isScrolled && <NavIcons />}

        {/* burger menu */}
        <div className="lg:hidden flex items-center">
          <button
            aria-label="Toggle Menu"
            onClick={toggleSidebar}
            className="text-xl">
            {isOpen ? <span>X</span> : <span>|||</span>}
          </button>
        </div>
      </div>

      {/* phone design */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={toggleSidebar}>
          <div className="fixed inset-y-0 left-0 w-64 bg-white p-4 shadow-lg z-50">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm font-medium"
                onClick={toggleSidebar}>
                SOLDES D'ÉTÉ
              </Link>
              <Link
                to="/mixmatch"
                className="text-sm font-medium"
                onClick={toggleSidebar}>
                LE MIX&MATCH DU MOIS
              </Link>
              <Link
                to="/table"
                className="text-sm font-medium"
                onClick={toggleSidebar}>
                ARTS DE LA TABLE
              </Link>
              <Link
                to="/sets"
                className="text-sm font-medium"
                onClick={toggleSidebar}>
                NOS SETS&COFFRETS
              </Link>
              <Link
                to="/decoration"
                className="text-sm font-medium"
                onClick={toggleSidebar}>
                DÉCORATION
              </Link>
              <Link
                to="/scents"
                className="text-sm font-medium"
                onClick={toggleSidebar}>
                SENTEURS D'INTÉRIEURS
              </Link>
              <Link
                to="/lifestyle"
                className="text-sm font-medium"
                onClick={toggleSidebar}>
                LIFE STYLE
              </Link>
              <Link
                to="/infos"
                className="text-sm font-medium"
                onClick={toggleSidebar}>
                Infos
              </Link>
              <div className="flex space-x-4">
                <button aria-label="Search" className="text-xl">
                  <span>Loop</span>
                </button>
                <button aria-label="Cart" className="text-xl">
                  <span>Shopping cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
