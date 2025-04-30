"use client";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSearch(window.scrollY > 50); // Show search after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className="sticky top-0 z-50 bg-black text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Left: Logo + Search */}
      <div className="flex items-center gap-4 flex-1">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span className="text-green-500 text-2xl">★</span>
          <span className="text-lg font-bold">Trustpilot</span>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="flex-1 max-w-lg">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for a company or category…"
                className="w-full rounded-md pl-10 pr-4 py-2 bg-white text-gray-700 placeholder-gray-500 focus:outline-none"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Right: Links */}
      <div className="flex items-center gap-6 text-sm font-medium ml-6">
        <a href="#" className="hover:underline">
          Write a review
        </a>
        <a href="#" className="hover:underline">
          Categories
        </a>
        <a href="#" className="hover:underline">
          Blog
        </a>
        <a href="#" className="hover:underline">
          Log in
        </a>
        <a
          href="#"
          className="bg-indigo-300 hover:bg-indigo-400 text-black font-semibold px-4 py-2 rounded-full"
        >
          For businesses
        </a>
      </div>
    </nav>
  );
};
export default Navbar;
