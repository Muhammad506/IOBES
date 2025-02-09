import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <main className="flex flex-col lg:flex-row font-inter bg-gradient-to-br from-[#79A3FF] to-[#A8D8F0]">
            {/* Back Button */}
            <Link to="/">
                <div className="absolute top-6 left-6 flex z-50 items-center gap-2 text-[#003C60] font-bold text-lg bg-white px-4 py-2 rounded-full shadow-md hover:bg-[#003C60] hover:text-white transition-all duration-500 ease-in-out cursor-pointer">
                    <FaArrowLeft />
                    <span>Back</span>
                </div>
            </Link>

            {/* Left Section - Image */}
            <div className="w-full lg:w-[60%] bg-cover bg-center max-h-screen relative rounded-l-3xl">
                <img
                    src="2.svg"
                    alt="Modern AI Technology"
                    className="h-full w-full object-cover animate-fadeIn rounded-l-3xl"
                />
            </div>

            {/* Right Section - Form */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center items-center px-8">
                <div className="max-w-md w-full bg-white shadow-xl border-4 border-[#003C60] rounded-3xl p-8 animate-slideInLeft">
                    <div className="text-center mb-4">
                        <span className="flex justify-center items-center text-4xl font-extrabold text-[#003C60] mb-4">LOGO</span>
                        <p className="text-gray-600 text-lg mb-6">
                            Create your AI-Powered Outcome Based Examination System account to get started.
                        </p>
                    </div>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-[#003C60] font-semibold mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full px-3 py-2 border-2 border-[#003C60] rounded-lg shadow-sm focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[#003C60] font-semibold mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border-2 border-[#003C60] rounded-lg shadow-sm focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-[#003C60] font-semibold mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full px-3 py-2 border-2 border-[#003C60] rounded-lg shadow-sm focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[#003C60] font-semibold mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className="w-full px-3 py-2 border-2 border-[#003C60] rounded-lg shadow-sm focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-2.5 text-gray-500"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#3F7AFF] text-white text-lg font-semibold py-3 rounded-xl shadow-lg hover:bg-[#2F5ECC] transition-all duration-300 transform "
                        >
                            Register
                        </button>
                    </form>
                    <p className="text-center font-medium text-sm text-[#003C60] mt-2">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-[#003C60] font-semibold hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Register;
