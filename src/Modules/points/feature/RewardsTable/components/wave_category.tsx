const WaveBackground = ({ gradient }: { gradient: string }) => {
    return (
      <div className={`absolute inset-0 w-full h-full overflow-hidden`}>
        <div
          className={`absolute inset-0 ${`bg-gradient-to-br ${gradient}`} transition-all duration-300`}
        ></div>
  
        <svg
          className="absolute bottom-0 left-0 w-full"
          height="36"
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,10 C15,0 35,12 50,8 C65,4 85,14 100,4 L100,12 L0,12 Z"
            fill={"rgba(255,255,255,0.5)"}
            className="transition-all duration-300"
          />
        </svg>
  
        <svg
          className="absolute bottom-0 left-0 w-full"
          height="24"
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,4 C20,8 40,2 60,6 C80,10 90,2 100,6 L100,8 L0,8 Z"
            fill={"rgba(255,255,255,0.6)"}
            className="transition-all duration-300"
          />
        </svg>
      </div>
    );
  };
  
  export default WaveBackground;
  