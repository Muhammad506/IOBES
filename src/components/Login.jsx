import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
    return (
        <main className="flex flex-col lg:flex-row font-inter h-screen bg-gradient-to-br from-[#79A3FF] to-[#A8D8F0]">
            {/* Back Button */}
            <Link to="/">
                <div className="absolute top-6 left-6 flex z-50 items-center gap-2 text-[#003C60] font-bold text-lg bg-white px-4 py-2 rounded-full shadow-md hover:bg-[#003C60] hover:text-white transition-all duration-500 ease-in-out cursor-pointer">
                    <FaArrowLeft />
                    <span>Back</span>
                </div>
            </Link>

            {/* Left Section - Image */}
            <div className="w-full lg:w-[60%] bg-cover bg-center relative rounded-l-3xl">
                <img
                    src="2.svg"
                    alt="Modern AI Technology"
                    className="h-full w-full object-cover animate-fadeIn rounded-l-3xl"
                />
            </div>

            {/* Right Section - Form */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center items-center p-8">
                <div className="max-w-md w-full bg-white shadow-xl border-4 border-[#003C60] rounded-3xl p-10 animate-slideInLeft">
                    <div className="text-center mb-6">
                        {/* Logo Placeholder */}
                        <span className="flex justify-center items-center text-5xl font-extrabold text-[#003C60] mb-6">LOGO</span>
                        <p className="text-gray-600 text-lg mb-6">
                            Log in to your Solar Intelli account to access your dashboard.
                        </p>
                    </div>
                    <form className="mt-4 space-y-6">
                        <div className="mb-6">
                            <label className="block text-[#003C60] font-semibold mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 border-2 border-[#003C60] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3F7AFF]"
                                />
                                <span className="absolute left-3 top-3 text-gray-400">
                                    <i className="fas fa-envelope"></i>
                                </span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#003C60] font-semibold mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 border-2 border-[#003C60] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3F7AFF]"
                                />
                                <span className="absolute left-3 top-3 text-gray-400">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <div className="mb-4 text-right">
                            <a
                                href="#"
                                className="text-[#003C60] text-sm font-semibold hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#3F7AFF] text-white font-bold py-3 rounded-full shadow-xl hover:scale-105 transition-all ease-in-out duration-700"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-center font-medium text-sm text-[#003C60] mt-4">
                        Don’t have an account?{" "}
                        <Link
                            to="/register"
                            className="text-[#003C60] font-semibold hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Login;
