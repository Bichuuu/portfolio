import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  ChevronUp,
  Code,
  Database,
  Layout,
  Server,
} from "lucide-react";
import about from "./assets/image/about2.png";
import hero from "./assets/image/hero.png";
import project1 from "./assets/image/fashion.mp4";
import project2 from "./assets/image/project2.mp4";
import project3 from "./assets/image/STREAMBERRY.mp4";
import project4 from "./assets/image/project4.mp4";
import luminarLogo from "./assets/image/luminar logo.png"
import srinivasLogo from "./assets/image/srinivas logo.jpg"

// Rotating Text Component
const RotatingText = ({ texts, rotationInterval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsAnimating(false);
      }, 300);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  return (
    <div className="inline-block overflow-hidden h-12">
      <div
        className={`transition-all duration-300 ${
          isAnimating
            ? "transform -translate-y-full opacity-0"
            : "transform translate-y-0 opacity-100"
        }`}
      >
        {texts[currentIndex]}
      </div>
    </div>
  );
};


// 3D Tilt Card Component - Add this AFTER RotatingText component
const TiltCard = ({ children, className = "" }) => {
  const [transform, setTransform] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform,
        transition: isHovering
          ? "transform 0.1s ease-out"
          : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Multiple layered shadows for 3D depth */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-2xl blur-2xl"
        style={{
          transform: isHovering
            ? "translateZ(-80px) scale(0.95)"
            : "translateZ(-60px) scale(0.98)",
          transition: "transform 0.3s ease-out",
        }}
      />
      
      {/* Main content with 3D transform */}
      <div
        style={{
          transform: "translateZ(60px)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
      
      {/* Front glossy overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-2xl"
        style={{
          transform: "translateZ(80px)",
        }}
      />
      
      {/* Side highlight effects for 3D illusion */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          transform: "translateZ(70px)",
          boxShadow: isHovering
            ? "inset 0 0 60px rgba(139, 92, 246, 0.3)"
            : "inset 0 0 30px rgba(139, 92, 246, 0.1)",
          transition: "box-shadow 0.3s ease-out",
        }}
      />
    </div>
  );
};


// Main Portfolio Component
const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = ["home", "about", "skills", "projects", "contact"];

   const skills = [
    { name: "HTML", level: 95, icon: <Layout className="w-8 h-8" />, color: "#E34F26" },
    { name: "CSS", level: 90, icon: <Layout className="w-8 h-8" />, color: "#1572B6" },
    { name: "JavaScript", level: 60, icon: <Code className="w-8 h-8" />, color: "#F7DF1E" },
    { name: "React", level: 92, icon: <Code className="w-8 h-8" />, color: "#61DAFB" },
    { name: "Tailwind CSS", level: 73, icon: <Layout className="w-8 h-8" />, color: "#06B6D4" },
    { name: "MongoDB", level: 63, icon: <Database className="w-8 h-8" />, color: "#47A248" },
    { name: "Express", level: 73, icon: <Server className="w-8 h-8" />, color: "#000000" },
    { name: "Node.js", level: 63, icon: <Server className="w-8 h-8" />, color: "#339933" },
  ];
  const projects = [
    {
      title: "Fashion Store E-commerce",
      description:
        "A full-stack e-commerce application with user authentication, product management.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://ecommerce-platform-react-eight.vercel.app",
      media: project1, // Image or video path
      type: "video", // or 'video'
    },
    {
      title: "DevGallery",
      description:
        "Project Showcase Platform.",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      github: "https://github.com",
      demo: "https://dev-gallery-frontend.vercel.app",
      media: project2, // Image or video path
      type: "video", // or 'video'
    },
    {
      title: "STREAMBERRY",
      description: "Netflix-style MERN stack video streaming app",
      technologies: ["React", "Express", "MongoDB", "Firebase", "Node.js"],
      github: "https://github.com",
      demo: "https://streamberry-frontend.vercel.app/",
      media: project3, // Image or video path
      type: "video", // or 'video'
    },
    {
      title: "PLAYCAST",
      description:
        "Analytics dashboard for social media metrics with interactive charts and data visualization Media Player.",
      technologies: [
        "React",
        "JSON Server (mock REST API)",
        "Bootstrap",
        "React Hooks (useState, useEffect)",
      ],
      github: "https://github.com",
      demo: "https://play-cast.vercel.app",
      media: project4, // Image or video path
      type: "video", // or 'video'
    },
  ];

  // Color classes based on dark mode
  const bgClass = darkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    : "bg-gradient-to-br from-gray-50 via-white to-gray-100";

  const textClass = darkMode ? "text-white" : "text-gray-900";

  const navBgClass = isScrolled
    ? darkMode
      ? "bg-gray-900/80"
      : "bg-white/80"
    : "bg-transparent";

  const cardBgClass = darkMode ? "bg-gray-800/80" : "bg-white/80";
  const inputBgClass = darkMode ? "bg-gray-800/80" : "bg-white/80";
  const borderClass = darkMode ? "border-gray-600" : "border-gray-300";
  const textSecondaryClass = darkMode ? "text-gray-300" : "text-gray-700";
  const hoverTextClass = darkMode
    ? "hover:text-purple-400"
    : "hover:text-purple-600";
  const purpleTextClass = darkMode ? "text-purple-400" : "text-purple-600";
  const tagBgClass = darkMode ? "bg-purple-900/30" : "bg-purple-100";
  const tagTextClass = darkMode ? "text-purple-400" : "text-purple-600";
  const footerBorderClass = darkMode ? "border-gray-700" : "border-gray-200";
  const footerTextClass = darkMode ? "text-gray-400" : "text-gray-600";

  return (
    <div
      className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}
    >
      {/* Navbar */}
      <nav
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 w-11/12 max-w-6xl ${navBgClass} backdrop-blur-md ${
          isScrolled ? "shadow-lg" : ""
        } rounded-2xl px-6 py-4`}
      >
        <div className="flex items-center justify-between">
          <div
            className={`${
              darkMode ? "bg-gray-800/90" : "bg-white/90"
            } backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm`}
          >
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MB
            </h1>
          </div>

          <div
            className={`hidden md:flex ${
              darkMode ? "bg-gray-800/90" : "bg-white/90"
            } backdrop-blur-sm rounded-xl px-6 py-2 shadow-sm space-x-6`}
          >
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className={`capitalize ${hoverTextClass} transition-colors`}
              >
                {link}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`${
                darkMode ? "bg-gray-800/90" : "bg-white/90"
              } backdrop-blur-sm rounded-xl p-3 shadow-sm hover:scale-105 transition-transform`}
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden ${
                darkMode ? "bg-gray-800/90" : "bg-white/90"
              } backdrop-blur-sm rounded-xl p-3 shadow-sm`}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className={`md:hidden mt-4 ${
              darkMode ? "bg-gray-800/95" : "bg-white/95"
            } backdrop-blur-md rounded-xl p-4 shadow-lg`}
          >
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className={`block w-full text-left py-2 px-4 capitalize ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-purple-50"
                } rounded-lg transition-colors`}
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      <section
        id="home"
        className={`min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20 transition-opacity duration-1000 relative overflow-hidden ${
          visibleSections.has("home") ? "opacity-100" : "opacity-0"
        }`}
      >
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Desktop Layout (md and above) */}
        <div className="hidden md:block relative flex-1 w-full max-w-7xl mx-auto">
          <div className="relative h-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <h1 className="leading-none select-none text-center">
                <div
                  className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-extrabold uppercase ${
                    darkMode ? "text-white" : "text-black"
                  } tracking-tighter opacity-90`}
                >
                  MUHAMMED
                </div>
              </h1>
            </div>

            <div className="relative z-10 flex items-end justify-center w-full h-full">
              <div className="relative">
                <img
                  src={hero}
                  alt="Muhammed Bisharath"
                  className="w-[350px] sm:w-[450px] md:w-[550px] lg:w-[650px] xl:w-[750px] h-auto object-contain relative z-10"
                  style={{
                    filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
                    maxHeight: "70vh",
                  }}
                />

                <div className="absolute -bottom-22 left-1/2 transform -translate-x-1/2 w-[110%] z-20">
                  <svg
                    viewBox="0 0 300 60"
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                    style={{
                      filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))",
                    }}
                  >
                    <path
                      d="M -30 40 Q 150 10, 300 40"
                      stroke={darkMode ? "#8b5cf6" : "#7c3aed"}
                      strokeWidth="5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 mb-6 sm:mb-8 md:mb-12 lg:mb-10">
              <h1 className="leading-none select-none text-center flex items-center justify-center">
                <span
                  className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[12rem] font-extrabold uppercase ${
                    darkMode ? "text-white" : "text-black"
                  } tracking-tighter`}
                >
                  BIS
                </span>
                <span
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[12rem] font-extrabold uppercase tracking-tighter"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: darkMode ? "3px white" : "3px black",
                    textStroke: darkMode ? "3px white" : "3px black",
                  }}
                >
                  HAR
                </span>
                <span
                  className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[12rem] font-extrabold uppercase ${
                    darkMode ? "text-white" : "text-black"
                  } tracking-tighter`}
                >
                  ATH
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Rotating Text - Desktop */}
        <div className="hidden md:block relative z-30 mt-6">
          <div className="text-center">
            <div
              className={`text-xl md:text-2xl lg:text-3xl font-semibold ${textSecondaryClass}`}
            >
              <RotatingText
                texts={[
                  "MERN Stack Developer",
                  "Front-End Developer",
                  "UI/UX Designer",
                ]}
                rotationInterval={2000}
              />
            </div>
          </div>
        </div>

        {/* Mobile Layout (below md) */}
        <div className="md:hidden relative z-10 flex flex-col items-center justify-center w-full space-y-8">
          {/* MUHAMMED Text */}
          <h1 className="leading-none select-none text-center">
            <div
              className={`text-4xl xs:text-5xl sm:text-6xl font-extrabold uppercase ${
                darkMode ? "text-white" : "text-black"
              } tracking-tighter`}
            >
              MUHAMMED
            </div>
          </h1>

          {/* BISHARATH Text */}
          <h1 className="leading-none select-none text-center flex items-center justify-center">
            <span
              className={`text-4xl xs:text-5xl sm:text-6xl font-extrabold uppercase ${
                darkMode ? "text-white" : "text-black"
              } tracking-tighter`}
            >
              BIS
            </span>
            <span
              className="text-4xl xs:text-5xl sm:text-6xl font-extrabold uppercase tracking-tighter"
              style={{
                color: "transparent",
                WebkitTextStroke: darkMode ? "2px white" : "2px black",
                textStroke: darkMode ? "2px white" : "2px black",
              }}
            >
              HAR
            </span>
            <span
              className={`text-4xl xs:text-5xl sm:text-6xl font-extrabold uppercase ${
                darkMode ? "text-white" : "text-black"
              } tracking-tighter`}
            >
              ATH
            </span>
          </h1>

          {/* Rotating Text */}
          <div
            className={`text-lg xs:text-xl sm:text-2xl font-semibold ${textSecondaryClass} text-center`}
          >
            <RotatingText
              texts={[
                "MERN Stack Developer",
                "Front-End Developer",
                "UI/UX Designer",
              ]}
              rotationInterval={2000}
            />
          </div>

          {/* Hero Image */}
          <div className="relative w-full max-w-sm px-4">
            <img
              src={hero}
              alt="Muhammed Bisharath"
              className="w-full h-auto object-contain relative z-10"
              style={{
                filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.5))",
              }}
            />
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[110%] z-20">
              <svg
                viewBox="0 0 300 40"
                className="w-full h-auto"
                preserveAspectRatio="none"
                style={{
                  filter: "drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3))",
                }}
              >
                <path
                  d="M -30 40 Q 150 10, 300 40"
                  stroke={darkMode ? "#8b5cf6" : "#7c3aed"}
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Button - Common for both layouts */}
        <div className="relative z-20 flex flex-col items-center mt-8 space-y-6">
          <button
            onClick={() => scrollToSection("projects")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            View My Work
          </button>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-20 px-4 transition-opacity duration-1000 ${
          visibleSections.has("about") ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* <GrainCard
              className={`rounded-2xl overflow-hidden ${
                darkMode ? "bg-gray-800/50" : "bg-white/50"
              } backdrop-blur-sm shadow-xl`}
              isDark={darkMode}
            >
              <img
                src={about}
                alt="Muhammed Bisharath"
                className="w-full h-full object-cover"
              />
            </GrainCard> */}
            <TiltCard
              className={`rounded-2xl overflow-hidden ${
                darkMode ? "bg-gray-800/50" : "bg-white/50"
              } backdrop-blur-sm shadow-2xl`}
            >
              <div className="relative overflow-hidden rounded-2xl" style={{ transformStyle: "preserve-3d" }}>
                {/* Background layer with blur */}
                <div 
                  className="absolute inset-0 blur-sm opacity-50"
                  style={{ transform: "translateZ(-20px)" }}
                >
                  <img
                    src={about}
                    alt="Background layer"
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
                
                {/* Main image with 3D pop-out effect */}
                <div style={{ transform: "translateZ(40px)" }}>
                  <img
                    src={about}
                    alt="Muhammed Bisharath"
                    className="w-full h-full object-cover relative z-10"
                    style={{
                      filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))",
                    }}
                  />
                </div>
                
                {/* Gradient overlays for depth */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 pointer-events-none"
                  style={{ transform: "translateZ(50px)" }}
                />
                
                {/* Edge glow effect */}
                <div 
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{
                    transform: "translateZ(55px)",
                    boxShadow: "inset 0 0 80px rgba(139, 92, 246, 0.2), 0 0 40px rgba(139, 92, 246, 0.3)",
                  }}
                />
              </div>
            </TiltCard>

            <div className="space-y-6">
              <p className={`text-lg leading-relaxed ${textSecondaryClass}`}>
                I'm a passionate MERN Stack Developer with a keen eye for
                creating beautiful, functional, and user-friendly web
                applications. With expertise in MongoDB, Express.js, React, and
                Node.js, I bring ideas to life through clean code and innovative
                solutions.
              </p>
              <p className={`text-lg leading-relaxed ${textSecondaryClass}`}>
                I specialize in building scalable full-stack applications,
                focusing on performance optimization and exceptional user
                experiences. My goal is to create digital products that make a
                difference.
              </p>
              <a
                href="/public/Muhammed-Bisharath-B-K.pdf" // path inside 'public' folder
                download="Muhammed_Bisharath_Resume.pdf" // optional custom filename
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-20 px-4 transition-opacity duration-1000 ${
          visibleSections.has("skills") ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 uppercase tracking-wider">
            My Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {skills.map((skill) => {
              const radius = 50;
              const circumference = 2 * Math.PI * radius;
              const offset =
                circumference - (skill.level / 100) * circumference;

              return (
                <div
                  key={skill.name}
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="relative w-40 h-40">
                    <svg className="transform -rotate-90 w-40 h-40">
                      {/* Background circle */}
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke={darkMode ? "#374151" : "#e5e7eb"}
                        strokeWidth="12"
                        fill="none"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="url(#gradient)"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={
                          visibleSections.has("skills") ? offset : circumference
                        }
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#9333ea" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {/* Percentage text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-2xl font-bold ${textClass}`}>
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                  {/* Skill name */}
                  <h3
                    className={`text-sm md:text-base font-semibold uppercase tracking-wide ${textClass}`}
                  >
                    {skill.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Professional Experience Section */}
      <section
        id="experience"
        className={`py-20 px-4 transition-opacity duration-1000 ${
          visibleSections.has("experience") ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <div className={`${cardBgClass} backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div className="flex items-start space-x-4">
                <a 
                  href="https://www.luminartechnolab.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-shrink-0 hover:scale-110 transition-transform duration-300"
                >
                  <img 
                    src={luminarLogo} 
                    alt="Luminar Technolab Logo" 
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                </a>
                <div>
                  <h3 className={`text-2xl font-bold ${purpleTextClass} mb-2`}>
                    MERN Stack Developer Intern
                  </h3>
                  <p className={`text-xl ${textSecondaryClass} font-semibold`}>
                    Luminar Technolab
                  </p>
                </div>
              </div>
              <div className={`text-right mt-2 md:mt-0 ${textSecondaryClass}`}>
                <p className="font-semibold">Calicut, India</p>
                <p>2024</p>
              </div>
            </div>
            {/* <ul className={`space-y-3 ${textSecondaryClass} list-disc list-inside ml-20`}>
              <li>Developed responsive, dynamic interfaces with React, Bootstrap and Tailwind ensuring cross-browser support.</li>
              <li>Designed and implemented RESTful APIs with Node.js and Express.js, enabling seamless CRUD operations.</li>
              <li>Optimized database queries and backend logic, improving performance and data flow efficiency.</li>
            </ul> */}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        className={`py-20 px-4 transition-opacity duration-1000 ${
          visibleSections.has("education") ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Education
          </h2>
          <div className="space-y-6">
            <div className={`${cardBgClass} backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex items-start space-x-4">
                  <a 
                    href="https://srinivasuniversity.edu.in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-shrink-0 hover:scale-110 transition-transform duration-300"
                  >
                    <img 
                      src={srinivasLogo} 
                      alt="Srinivas University Logo" 
                      className="w-16 h-16 object-contain rounded-full"
                    />
                  </a>
                  <div>
                    <h3 className={`text-2xl font-bold ${purpleTextClass} mb-2`}>
                      Bachelor of Computer Applications (BCA)
                    </h3>
                    <p className={`text-xl ${textSecondaryClass} font-semibold`}>
                      Srinivas University
                    </p>
                  </div>
                </div>
                <div className={`text-right mt-2 md:mt-0 ${textSecondaryClass}`}>
                  <p className="font-semibold">Mangalore, India</p>
                  <p>2021 – 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-20 px-4 transition-opacity duration-1000 ${
          visibleSections.has("projects") ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`${cardBgClass} backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                {/*////////////////// */}
                {project.type === "image" ? (
                  <img
                    src={project.media}
                    alt={project.title}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                ) : (
                  <video
                    src={project.media}
                    muted
                    autoPlay
                    loop
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                )}

                <h3 className={`text-2xl font-bold mb-3 ${purpleTextClass}`}>
                  {project.title}
                </h3>
                <p className={`${textSecondaryClass} mb-4 leading-relaxed`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`${tagBgClass} ${tagTextClass} px-3 py-1 rounded-full text-sm`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    className={`flex items-center space-x-2 ${textSecondaryClass} ${hoverTextClass} transition-colors`}
                  >
                    <Github className="w-5 h-5" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    className={`flex items-center space-x-2 ${textSecondaryClass} ${hoverTextClass} transition-colors`}
                  >
                    <ExternalLink className="w-5 h-5" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-20 px-4 transition-opacity duration-1000 ${
          visibleSections.has("contact") ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              <a
                href="mailto:mhmdbeeee@gmail.com"
                className={`flex items-center space-x-4 ${textSecondaryClass} ${hoverTextClass} transition-colors`}
              >
                <Mail className="w-6 h-6" />
                <span>mhmdbeeee@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/bichu-ts033/"
                className={`flex items-center space-x-4 ${textSecondaryClass} ${hoverTextClass} transition-colors`}
              >
                <Linkedin className="w-6 h-6" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href="https://github.com/Bichuuu"
                className={`flex items-center space-x-4 ${textSecondaryClass} ${hoverTextClass} transition-colors`}
              >
                <Github className="w-6 h-6" />
                <span>GitHub Profile</span>
              </a>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className={`w-full px-4 py-3 rounded-xl ${inputBgClass} border ${borderClass} focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
              <input
                type="email"
                placeholder="Your Email"
                className={`w-full px-4 py-3 rounded-xl ${inputBgClass} border ${borderClass} focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className={`w-full px-4 py-3 rounded-xl ${inputBgClass} border ${borderClass} focus:outline-none focus:ring-2 focus:ring-purple-600`}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  alert("Message sent! (This is a demo)");
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 border-t ${footerBorderClass}`}>
        <div className={`max-w-6xl mx-auto text-center ${footerTextClass}`}>
          <p>
            © {new Date().getFullYear()} Muhammed Bisharath. All rights
            reserved.
          </p>
          <p className="mt-2">Built with passion and React</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Portfolio;
