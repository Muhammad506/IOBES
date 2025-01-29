import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { SlBookOpen } from "react-icons/sl";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdAssignment } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { GiBookmark } from "react-icons/gi";



const Sidebar = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    // Reusable Links with different icons
    const links = [
        { to: "/dashboard", icon: <FaHome className="text-xl" />, label: "Home" },
        { to: "/dashboard/coarse-management", icon: <GiBookmark className="text-xl" />, label: "Coarse Management" },
        { to: "/dashboard/exam-management", icon: <SlBookOpen className="text-xl" />, label: "Exam Management" },
        { to: "/dashboard/quiz-management", icon: <IoNewspaperOutline className="text-xl" />, label: "Quiz Management" },
        { to: "/dashboard/assignment-management", icon: <MdAssignment className="text-xl" />, label: "Assignment Management" }, // New icon here
        { to: "/dashboard/settings", icon: <RiLogoutCircleLine className="text-xl" />, label: "Logout" },
    ];

    // Link rendering function
    const renderLinks = () => (
        links.map((link, index) => (
            <li key={index}>
                <NavLink
                    to={link.to}
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-4 p-2 rounded-lg hover:bg-[#4C8CFF] transition-all duration-300 transform ${isActive ? "bg-[#4C8CFF] shadow-lg"  : "hover:bg-opacity-70"}`
                    }
                >
                    {link.icon}
                    <span className="text-lg font-semibold">{link.label}</span>
                </NavLink>
            </li>
        ))
    );

    return (
        <>
            {/* Sidebar for Medium and Larger Devices */}
            <div className="hidden lg:block min-h-screen px-3 fixed ">
                <div className="flex items-center justify-center h-20 bg-gradient-to-r from-[#0066CC] to-[#6699FF] rounded-lg mb-6 shadow-lg">
                    <h1 className="text-2xl font-extrabold tracking-wide">LOGO</h1>
                </div>
                <nav className="flex-1 overflow-y-auto">
                    <ul className="space-y-3">
                        {renderLinks()}
                    </ul>
                </nav>
            </div>

            {/* Navbar for Small Devices */}
            <div className="hidden">
                <div className="flex items-center justify-between h-20 px-4 bg-gradient-to-r from-[#0066CC] to-[#6699FF] shadow-lg">
                    <h1 className="text-2xl font-extrabold tracking-wide text-white">LOGO</h1>
                    <button
                        className="text-3xl text-white"
                        onClick={toggleNavbar}
                    >
                        {isNavbarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                {isNavbarOpen && (
                    <nav className="bg-white shadow-lg">
                        <ul className="space-y-3 p-4">
                            {renderLinks()}
                        </ul>
                    </nav>
                )}
            </div>
        </>
    );
};

export default Sidebar;
