import { FaRobot, FaClipboardCheck, FaEye, FaChartLine, FaUserAlt, FaFileAlt } from "react-icons/fa"; // React Icons

const features = [
    {
        title: "AI-Powered Question Generation",
        icon: <FaRobot className="w-12 h-12 text-green-600" />,
    },
    {
        title: "Automated Grading System",
        icon: <FaClipboardCheck className="w-12 h-12 text-yellow-600" />,
    },
    {
        title: "CLO-Based Performance Analysis",
        icon: <FaChartLine className="w-12 h-12 text-blue-600" />,
    },
    {
        title: "Real-Time Monitoring",
        icon: <FaEye className="w-12 h-12 text-red-600" />,
    },
    {
        title: "User-Friendly Interface",
        icon: <FaUserAlt className="w-12 h-12 text-purple-600" />,
    },
    {
        title: "Comprehensive Reports",
        icon: <FaFileAlt className="w-12 h-12 text-orange-600" />,
    },
];

const FeaturesAndContact = () => {
    return (
        <div className="font-inter">
            {/* Features Section */}
            <section id="features" className="py-12 px-6 bg-gradient-to-br from-[#79A3FF] to-[#A8D8F0]">
                <div>
                    <h1 className="text-lg lg:text-xl font-semibold uppercase mb-4 text-black tracking-wider text-center">
                        Our Features
                    </h1>
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold w-full md:max-w-lg lg:max-w-xl xl:max-w-3xl mx-auto text-white mb-10 text-center">
                        Revolutionizing Assessments with AI-Powered Outcome-Based System
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="w-48 h-48 bg-white rounded-lg shadow-xl flex flex-col items-center text-center transition-all ease-in-out duration-500 hover:shadow-2xl transform hover:scale-105 p-6"
                            >
                                {/* Icon in Card */}
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="py-12 bg-white px-2">
                <div className="text-center mb-10">
                    <h1 className="text-lg lg:text-xl font-semibold uppercase mb-4 text-blue-600">
                        Contact Us
                    </h1>
                    <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto text-gray-900">
                        Get In Touch For Quick Support And Personalized Assistance Today
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between px-6 lg:px-24">
                    {/* Left Section - Form */}
                    <div className="w-full lg:w-1/2 md:px-6 lg:px-16 space-y-5">
                        <form className="space-y-5">
                            <div className="space-y-1">
                                <label htmlFor="name" className="block text-sm font-semibold text-blue-600">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none transition-all text-gray-800"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Your Email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none transition-all text-gray-800"
                                />
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="message" className="block text-sm font-semibold text-blue-600">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    placeholder="Your Message"
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none transition-all text-gray-800"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="relative px-10 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold text-lg rounded-full overflow-hidden shadow-md transition-all hover:shadow-lg hover:text-white group"
                            >
                                <span
                                    className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
                                ></span>
                                <span className="relative z-10 group-hover:text-white">Submit</span>
                            </button>
                        </form>
                    </div>

                    {/* Right Section - Image */}
                    <div className="w-full lg:w-1/2 mt-8 md:-mt-6">
                        <img
                            src="Contact.svg"
                            alt="Contact illustration"
                            className="w-full max-w-md mx-auto"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeaturesAndContact;
