import React, { useState, useEffect } from 'react';
import SearchSidebar from '../SearchSideBar/SearchSideBar';

const Header = ({ enableHoverEffect = true }) => { // Default to true if not provided
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuSidebarOpen, setIsMenuSidebarOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Standard mobile breakpoint
    };

    // Initial checks
    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenuSidebar = () => {
    setIsMenuSidebarOpen(!isMenuSidebarOpen);
    if (isCartSidebarOpen) setIsCartSidebarOpen(false);
  };

  const navigationLinks = [
    { name: 'NEW PRODUCTS', href: '#' },
    { name: 'MIX AND MATCH OF THE MONTH', href: '#' },
    { name: 'DECORATION', href: '#' },
    {
      name: 'HOME FRAGRANCES',
      href: '#',
      subcategories: [
        { name: 'Scented Candles', href: '#' },
        { name: 'Diffusers and Fragrance Oils', href: '#' },
        // Add other subcategories as needed
      ],
    },
    {
      name: 'LIFESTYLE',
      href: '#',
      subcategories: [
        { name: 'Jewelry', href: '#' },
        { name: 'Bags and Accessories', href: '#' },
        // Add other subcategories as needed
      ],
    },
    {
      name: 'INSPIRATIONS',
      href: '#',
      subcategories: [
        { name: 'Our Table Suggestions', href: '#' },
        { name: 'Gifts', href: '#' },
        // Add other subcategories as needed
      ],
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  // Determine text and background colors based on hover effect and scroll state
  const textColor = (isScrolled || (enableHoverEffect && isHovered)) ? 'text-primary-dark' : enableHoverEffect ? 'text-white' : 'text-primary-dark';
  
  // FIX: Set different background colors based on conditions
  const backgroundColor = (isScrolled || (enableHoverEffect && isHovered)) 
    ? 'bg-background-light' 
    : enableHoverEffect ? 'bg-transparent' : 'bg-background-light';

  return (
    <>
      {/* Main header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md ${
          isScrolled ? 'py-2' : 'pt-4 pb-8 border-b border-white'
        } ${backgroundColor}`}
        onMouseEnter={() => enableHoverEffect && setIsHovered(true)} // Only enable hover if `enableHoverEffect` is true
        onMouseLeave={() => enableHoverEffect && setIsHovered(false)} // Only enable hover if `enableHoverEffect` is true
        style={{
          transition: 'background 0.5s ease'
        }}
      >
        <div className={`container mx-auto px-4 flex items-center justify-between ${textColor}`}>
          {/* Burger Menu - visible when scrolled OR on mobile */}
          {(isScrolled || isMobile) && (
            <button
              className="p-2 focus:outline-none"
              onClick={toggleMenuSidebar}
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          )}

          {/* Logo - centered when scrolled or on mobile */}
          <div className={`${(isScrolled || isMobile) ? 'mx-auto' : ''}`}>
            <a href="/"> 
              <img
                src="/images/logos/2.png"
                alt="CHABI CHIC"
                className={`inline-block transition-all duration-300 ${
                  isScrolled ? 'h-12' : (isMobile ? 'h-14' : 'h-20')
                }`}
              />
            </a>
          </div>

          {/* Navigation - only visible when not scrolled AND not on mobile */}
          {!isScrolled && !isMobile && (
            <nav className="mt-8">
              <ul className={`flex flex-wrap justify-center space-x-4 text-sm font-medium ${textColor}`}>
                {navigationLinks.map((link) => (
                  <li key={link.name} className="relative group">
                    <a href={link.href} className="hover:text-gray-500 px-2 py-1 flex items-center">
                      {link.name}
                      {link.subcategories && (
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      )}
                    </a>
                    {/* Subcategories Dropdown */}
                    {link.subcategories && (
                      <ul className="absolute z-50 left-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {link.subcategories.map((sub) => (
                          <li key={sub.name}>
                            <a href={sub.href} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                              {sub.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Search - always visible */}
          <div className={`flex items-center space-x-4 ${textColor}`}>
            <button className="p-1" onClick={toggleSidebar}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>

          <SearchSidebar 
            searchTerm={searchTerm}
            isOpen={isOpen}
            toggleSidebar={toggleSidebar}
            setIsOpen={setIsOpen}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      {/* Menu Sidebar - opens when menu icon is clicked */}
      <div
        className={`fixed top-0 left-0 h-full w-64 md:w-80 bg-background-light text-primary-dark shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">Menu</h3>
            <button onClick={toggleMenuSidebar} className="p-2" aria-label="Close menu">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <nav className="p-4">
          <ul className="space-y-4 text-sm font-medium">
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-gray-900 py-2 flex items-center justify-between"
                >
                  {link.name}
                  {link.subcategories && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  )}
                </a>
                {/* Subcategories Dropdown */}
                {link.subcategories && (
                  <ul className="ml-4 mt-2 space-y-2 z-50">
                    {link.subcategories.map((sub) => (
                      <li key={sub.name}>
                        <a href={sub.href} className="block text-gray-700 hover:text-gray-900">
                          {sub.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay when any sidebar is open */}
      {(isMenuSidebarOpen || isCartSidebarOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setIsMenuSidebarOpen(false);
            setIsCartSidebarOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default Header;