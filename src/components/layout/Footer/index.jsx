import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaArrowRight,
  FaFacebookF,
  FaInstagramSquare,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className=" text-white  relative z-50  px-6 ">
   <hr className="border-primary border mt-10" />

      <div className="container-custom flex py-12 flex-col md:flex-row justify-between items-center">
        {/* Left Side - Links & Copyright */}
        <div className="md:text-lg text-gray-800 text-center md:text-left">
          <nav className="mb-2 md:mb-0 space-x-4">
            <Link href="/menu" className="hover:text-gray-300">
             Menu
            </Link>
            <a href="/chef" className="hover:text-gray-300">
Chef            </a>
            <a href="/service" className="hover:text-gray-300">
              Service
            </a>
            <a href="/reviews" className="hover:text-gray-300">
              Reviews
            </a>
            <a href="/policies" className="hover:text-gray-300">
              Policies
            </a>
          </nav>
          <p className="mt-1">
            © Copyright 2025 | All Rights Reserved | Powered by{" "}
            <Link
              href="https://zanvisionlabs.com/"
              className="text-blue-400 hover:underline"
            >
           Zan vision Labs
            </Link>
          </p>
        </div>

        {/* Right Side - Social Media Icons */}
        <div className="flex space-x-3 mt-4 md:mt-0">
          {[
            { href: "https://www.facebook.com/", icon: <FaFacebookF />, bg: "bg-blue-700" },
            { href: "#", icon: <FaInstagramSquare />, bg: "bg-pink-500" },
            { href: "#", icon: <FaYoutube />, bg: "bg-red-600" },

            { href: "mailto:support@gmail.com", icon: <MdEmail />, bg: "bg-blue-400" },
          ].map(({ href, icon, bg }, index) => (
            <a
              key={index}
              href={href}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${bg}`}
            >
              <i className="text-white text-lg">{icon}</i>
            </a>
          ))}
          <a
            href={`https://wa.me/`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500"
          >
            <i className="text-white text-lg">
              <FaWhatsapp />
            </i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
