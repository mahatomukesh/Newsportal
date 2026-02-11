import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollPosition / docHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-8 right-8 z-40 group transition-all duration-300 ease-out">
          {/* Main Button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="relative w-14 h-14 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          >
            {/* Background blur effect */}
            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Circular Progress Background */}
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 shadow-xl shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-shadow duration-300">
              {/* Animated Glow Layer */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-30 blur-lg animate-pulse transition-opacity duration-300"></div>

              {/* Progress Ring */}
              <svg
                className="absolute inset-0 w-14 h-14 transform -rotate-90"
                viewBox="0 0 56 56"
              >
                {/* Background circle */}
                <circle
                  cx="28"
                  cy="28"
                  r="25"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="2"
                />
                {/* Progress circle */}
                <circle
                  cx="28"
                  cy="28"
                  r="25"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="2.5"
                  strokeDasharray={`${(scrollProgress / 100) * 157} 157`}
                  strokeLinecap="round"
                  className="transition-all duration-300 drop-shadow-lg"
                />
                <defs>
                  <linearGradient
                    id="progressGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Icon */}
              <div className="absolute inset-0 flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110">
                <svg
                  className={`w-6 h-6 transition-all duration-300 ${
                    isClicked ? "scale-75 opacity-50" : "scale-100 opacity-100"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 19V5M5 12l7-7 7 7"
                  />
                </svg>
              </div>

              {/* Ripple Effect on Click */}
              {isClicked && (
                <div className="absolute inset-0 rounded-full border-2 border-white animate-ping"></div>
              )}
            </div>

            {/* Tooltip */}
            <div className="absolute right-full mr-4 bottom-1/2 translate-y-1/2 bg-gray-900/90 backdrop-blur text-white px-3 py-2 rounded-lg whitespace-nowrap text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-white/10 shadow-lg">
              <span className="block font-medium">Back to top</span>
              <span className="block text-xs text-gray-400 mt-0.5">
                {Math.round(scrollProgress)}% scrolled
              </span>
              <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900/90"></div>
            </div>
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default ScrollToTopButton;
