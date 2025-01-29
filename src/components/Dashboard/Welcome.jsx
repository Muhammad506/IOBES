const Welcome = () => {
    return (
        <main className="h-screen">
            <div className="w-full max-h-screen flex justify-center ">
                <div className="flex flex-col md:flex-row justify-center items-center gap-10 p-12 rounded-3xl bg-gradient-to-br from-[#79A3FF] to-[#A8D8F0] shadow-lg border-2 border-[#2E98FC]">

                    {/* Star (Left) */}
                    {/* <div className="flex justify-center items-center">
                    <img
                        src="star.png"
                        alt="stars"
                        className="w-28 h-28 "
                    />
                </div> */}

                    {/* Text */}
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl font-extrabold text-white tracking-wide">
                            Welcome To AI-Powered Outcome Based Examination System
                        </h1>
                        <p className="text-white text-xl  tracking-wide ">
                            An online exam system
                        </p>
                    </div>

                    {/* Star (Right) */}
                    {/* <div className="flex justify-center items-center">
                    <img
                        src="star.png"
                        alt="stars"
                        className="w-28 h-28"
                    />
                </div> */}
                </div>
            </div>
        </main>
    );
};

export default Welcome;
