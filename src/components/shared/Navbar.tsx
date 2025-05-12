'use client';
import { useUser } from '@/context/UserContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoCodeReview } from 'react-icons/go';
import { HiMenu, HiX } from 'react-icons/hi'; // Import icons for menu toggle
import UserMenu from '../customs/NavHelpers/UserMenu';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import {toast} from "sonner";
import {log_out_user_action} from "@/services/AuthService";

const Navbar = () => {
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();
  const [showSearch, setShowSearch] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSearch(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Navigation links array
  const navLinks = [
    { href: '/product', label: 'Products' },
    { href: '/company', label: 'Company' },
    { href: '/blogs', label: "Blog's" },
    { href: '/services', label: 'Services' },
    { href: '/plans', label: 'Plans' },
  ];
  // logout user
  const handle_logout = async () => {
    const id = toast.loading('Logging out...');
    const res = await log_out_user_action();
    if (res) {
      toast.success('Logout successful.', { id });
      setIsLoading(true);
      window.location.replace('/');
    } else {
      toast.error('Logout failed!', { id });
    }
  };

  return (
    <nav className="sticky top-0 z-50 drop-shadow-xl bg-[#FAF8F5]">
      <div className="container mx-auto px-4 w-full py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div >
          <Link href={'/'} className="flex justify-center items-center gap-2 text-amber-500">
            <GoCodeReview size={32} className="md:text-4xl text-3xl" />
            <span className="font-bold text-xl md:text-3xl">ReviewHub</span>
          </Link>
        </div>

        {/* Desktop Search - Hidden on mobile */}
        {showSearch && (
          <div className="hidden md:flex flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full rounded-md pl-10 pr-4 py-2 border border-gray-500 text-gray-700 placeholder-gray-500 focus:outline-none"
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

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-medium">

          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={` whitespace-nowrap ${
                pathname === href ? 'border-amber-500 text-amber-500 text-md' : ''
              }`}
            >
              {label}
            </Link>
          ))}

          {user?.email ? (
            <div className={"flex items-center gap-2"}>
              {user?.role === 'ADMIN' ? (
                <Link href="/dashboard/admin">
                  <Button  className="whitespace-nowrap bg-amber-500 hover:bg-amber-600 cursor-pointer">
                    Dashboard
                  </Button>
                </Link>
              ) : user?.role === 'USER' ? (
                <UserMenu setIsLoading={setIsLoading} user={user} />
              ) : (
                user.role === 'COMPANY' && (
                  <Link href="/dashboard/company">
                    <Button  className="whitespace-nowrap bg-amber-500 hover:bg-amber-600 cursor-pointer">
                      Dashboard
                    </Button>
                  </Link>
                )
              )}
              <Button onClick={handle_logout} variant={"outline"}  className={"cursor-pointer border-black hover:bg-black hover:text-white border bg-none"}>Log Out <LogOut /></Button>
            </div>
          ) : (
            <Link
              href="/login"
            >
              <Button  className={`bg-amber-500 hover:bg-amber-600 cursor-pointer`}>Join us</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu - Expanded when isMenuOpen is true */}
      <div
        className={`md:hidden ${
          isMenuOpen ? 'max-h-screen py-4' : 'max-h-0 overflow-hidden'
        } transition-all duration-300 ease-in-out bg-[#FAF8F5]`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          {/* Mobile Search */}
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search here..."
              className="w-full rounded-md pl-10 pr-4 py-2 border border-gray-500 text-gray-700 placeholder-gray-500 focus:outline-none"
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


          {/* Navigation Links */}
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`py-2 block border-b border-gray-200 ${
                pathname === href ? 'border-amber-500 text-amber-500 text-md' : ''
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Authentication */}
          <div className="pt-2">
            {user?.email ? (
              <div className="flex items-center gap-2">
                {user?.role === 'ADMIN' ? (
                  <Link href="/dashboard/admin">
                    <Button className=" bg-amber-500 hover:bg-amber-600 cursor-pointer">Dashboard</Button>
                  </Link>
                ) : user?.role === 'USER' ? (
                  <div className="flex items-center justify-center">
                    <UserMenu setIsLoading={setIsLoading} user={user} />
                  </div>
                ) : (
                  user.role === 'COMPANY' && (
                    <Link href="/dashboard/company">
                      <Button className="bg-amber-500 hover:bg-amber-600 cursor-pointer">Dashboard</Button>
                    </Link>
                  )
                )}
                <Button onClick={handle_logout} className={"cursor-pointer bg-red-600 hover:bg-red-700"}><LogOut /></Button>
              </div>
            ) : (
                <Link
                    href="/login"
                >
                  <Button  className={`bg-amber-500 hover:bg-amber-600 cursor-pointer`}>Join us</Button>
                </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
