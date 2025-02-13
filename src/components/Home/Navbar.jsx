import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? "text-gray-900 underline" : "text-white hover:text-gray-900";

    return (
        <nav className="border-b fixed z-50 w-full bg-gradient-to-b from-[#0066CC] to-[#6699FF] shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 text-white text-2xl font-extrabold tracking-widest hover:text-gray-900 transition-colors duration-300">
                        <Link to="/">LOGO</Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className={`font-medium transition duration-300 ${isActive("/")}`}>Home</Link>
                        <Link to="/about" className={`font-medium transition duration-300 ${isActive("/about")}`}>About</Link>

                        {/* Login and Register Buttons */}
                        <div className="ml-6 space-x-4">
                            <Link to="/login">
                                <button className="relative px-5 py-2 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out hover:shadow-xl hover:text-white group">
                                    <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
                                    <span className="relative z-10 group-hover:text-white">Login</span>
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="relative px-5 py-2 text-white bg-gradient-to-r from-blue-600 to-blue-700 border-2 border-blue-600 font-semibold rounded-lg overflow-hidden shadow-lg transition-all duration-500 ease-in-out hover:shadow-xl hover:text-white group">
                                    <span className="absolute inset-0 transform bg-white scale-x-0 text-blue-600 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
                                    <span className="relative z-50 group-hover:text-blue-600">Register</span>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                            <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden h-screen bg-gradient-to-b from-[#0066CC]  py-10 to-[#6699FF] shadow-inner justify-center">
                    <div className="flex flex-col justify-center items-center text-center">
                        <Link to="/" className={`block px-6 py-3 font-medium transition duration-300 ${isActive("/")}`}>Home</Link>
                        <Link to="/about" className={`block px-6 py-3 font-medium transition duration-300 ${isActive("/about")}`}>About</Link>
                    </div>

                    {/* Login and Register Buttons */}
                    <div className="px-6 py-3 space-y-3 flex flex-col gap-3 justify-center items-center text-center">
                        <Link to="/login">
                            <button className="block w-full px-5 py-2 bg-gradient-to-r from-white to-gray-200 text-blue-600 font-semibold  shadow-lg hover:from-gray-100 hover:to-white transition duration-300">
                                Login
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="block  px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold w-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition duration-300">
                                Register
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
