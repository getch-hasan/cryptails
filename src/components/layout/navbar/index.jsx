"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const pathName = usePathname();

  // ✅ Define menu items
  const navList = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Reviews", href: "/reviews" },
    { name: "Chef", href: "/chef"  },
    { name: "Services", href: "/service" },
  ];



  // ✅ Function to check active link
  const isActive = (href) => pathName === href;

  return (
    <div
      className={`w-full fixed  bg-primary  top-0 z-50 transition-all duration-500 `}
    >
      <nav className="py-3 flex container-custom justify-between items-center font-openSans">
        {/* ✅ Logo */}
        <Link href={"/"} className="flex  items-center md:gap-4 gap-1">
          <img className="h-16 w-16 ml-4 rounded-md" src="/images/logo.png" alt="Logo" />
          <p className="text-3xl font-bubblegum ">Cryptails</p>
        </Link>

        {/* ✅ Mobile menu button */}
        <button onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="lg:hidden absolute right-4 text-xl">
          <FaBars />
        </button>

        {/* ✅ Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {navList.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`font-bold font-poppins text-md leading-7 relative ${
                isActive(item.href)
                  ? "text-green-700 border-b-2 border-green-700 font-bold":''
                  
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* ✅ Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 flex lg:hidden ${
          isDrawerOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-opacity duration-700 ease-in-out`}
      >
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsDrawerOpen(false)}></div>
        <div
          className={`absolute top-0 right-0 bg-white w-64 h-full shadow-lg flex flex-col p-4 font-poppins transform transition-transform duration-700 ease-in-out ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button onClick={() => setIsDrawerOpen(false)} className="self-end mb-4 mt-2">
            <FaTimes size={24} />
          </button>

          {/* ✅ Mobile Menu */}
          {navList.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`font-bold mb-2 font-poppins text-md leading-7 relative ${
                isActive(item.href) ? "text-primary font-bold" : "text-black"
              }`}
              onClick={() => setIsDrawerOpen(false)} // Close drawer on click
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
