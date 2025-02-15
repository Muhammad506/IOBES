import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return (
    <footer className="bg-gradient-to-tr from-[#27569E] to-[#4A90E2] text-white py-10 font-inter">
      <div className="container mx-auto px-6 text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {/* Grid 1: Logo and Website Details */}
        <div className="flex flex-col items-center">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center gap-2 mb-2">
            <img src="Logo.jpg" alt="logo" className="size-14 sm:size-16" />
            {/* <p className="text-xl lg:text-2xl font-bold text-[#27569E] tracking-wide">
              OBE SYSTEM
            </p> */}
          </Link>
          <p className="text-sm text-white font-medium  px-8 mb-4">
            An AI-driven examination system ensuring fair, efficient, and data-driven assessments to enhance learning outcomes.
          </p>
        </div>

        {/* Grid 2: Links Section */}
        <div className="flex flex-col items-center space-y-4">
          <h2 className="font-bold text-xl">Links</h2>
          <Link
            to="/"
            className={` font-semibold transition text-white duration-300 ${location.pathname === "/" ? "text-gray-900 underline" : "hover:text-gray-900"}`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={` font-semibold text-white transition duration-300 ${location.pathname === "/about" ? "text-gray-900 underline" : "hover:text-gray-900"}`}
          >
            About
          </Link>
          <Link
            to="/dashboard"
            className={` font-semibold text-white transition duration-300 ${location.pathname === "/dashboard" ? "text-gray-900 underline" : "hover:text-gray-900"}`}
          >
            Dashboard
          </Link>
        </div>

        {/* Grid 3: Contact Info Section */}
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold mb-2">Contact Info</p>
          <p className="text-sm text-white font-medium">Phone: (123) 456-7890</p>
          <p className="text-sm text-white font-medium mb-4">Email: info@fypportal.com</p>
          <div className="flex space-x-6 mt-4 justify-center">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-blue-950 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-blue-950 transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-blue-950 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-blue-950 transition duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-t border-gray-200 my-8 w-3/4 mx-auto" />

      {/* Copyright Section */}
      <div className="text-center text-sm text-gray-100 font-medium mt-8">
        <p>&copy; {new Date().getFullYear()} FYP Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
