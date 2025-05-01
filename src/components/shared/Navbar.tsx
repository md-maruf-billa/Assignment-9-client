"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoCodeReview } from "react-icons/go";

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
    <nav className="sticky top-0 z-50   drop-shadow-xl bg-[#FAF8F5]">
      <div className="container mx-auto w-full py-4 flex items-center justify-between">
        {/* Left: Logo + Search */}
        <div className="flex items-center gap-10 flex-1">
          {/* Logo */}
          <Link href={"/"} className="flex items-center space-x-2">
            <GoCodeReview size={40} />
            <span className="font-bold text-3xl ">ReviewHub</span>
          </Link>

          {/* Search */}
          {showSearch && (
            <div className="flex-1 max-w-xs">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search hare..."
                  className="w-full rounded-md pl-10 pr-4 py-2 border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none"
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
          <Link href="/services">Services</Link>
          <Link href="/plans">Plans</Link>
          <Link href="/login">Join us</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
