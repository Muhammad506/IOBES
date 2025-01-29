const AboutHero = () => (
  <header
    className="relative bg-cover bg-center max-h-screen 2xl:h-[400px] font-inter pt-24 lg:pt-32 xl:pt-36 2xl:mt-40 flex items-start justify-start py-10 p-6"
    style={{ backgroundImage: "url('/AboutHero.jpg')" }}
  >
    {/* Overlay gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 opacity-50"></div>

    {/* Content aligned to the left */}
    <div className="relative z-10 text-left text-white max-w-3xl mx-auto md:max-w-7xl w-full">
      <h1 className="text-2xl text-left text-nowrap md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold font-inter mb-4 leading-tight text-white animate__animated animate__fadeIn animate__delay-2s">
        About Us
      </h1>
      <p className=" text-lg xl:text-xl mb-6 leading-relaxed max-w-xl text-white text-justify  animate__animated animate__fadeIn animate__delay-2s md:w-[50%]">
        Discover the AI-Powered Outcome-Based Examination System by the University Institute of Information Technology,
        PMAS-Arid Agriculture University, Rawalpindi.
      </p>
      <button
        className="relative px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold  rounded-full overflow-hidden shadow-md transition-all duration-700 ease-in-out hover:shadow-lg hover:text-white group"
      >
        <span
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"
        ></span>
        <span
          className="relative z-10 group-hover:text-white"
        >
          Learn More!
        </span>
      </button>
    </div>
  </header>
);

export default AboutHero;
