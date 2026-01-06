import * as React from "react";
import { Brain, Code, Rocket, Server } from "lucide-react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Dots } from "../components/dots";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sep Keuchenius" },
    { name: "description", content: "Sep Keuchenius" },
  ];
}

export default function Home() {
  return (
    <main className="flex flex-col items-center py-4 sm:py-6 md:py-10 px-4 sm:px-6 mt-10 sm:mx-10 md:mt-30 sm:gap-20 md:gap-0">
    <div className="flex flex-col items-center justify-end min-h-[20vh] sm:min-h-[20vh] md:h-1/2 gap-10 sm:gap-10 md:gap-10 mb-4 sm:mb-6 md:mb-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">Sep Keuchenius</h1>
      <HoverableImage />
      {/* <PortraitSVG /> */}
      <h1 className="text-sm sm:text-base md:text-lg text-center px-4 italic">Software Engineer - AI Engineer - Dev Lead</h1>
    
    </div>
    <SoftwareChain />
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 md:gap-20 mt-6 sm:mt-8 md:mt-10 w-full max-w-7xl">
      <Article>
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">About me</h1>
        <p className="text-sm sm:text-base md:text-lg text-center sm:text-left">A skilled, quick-learning full-stack & AI engineer. Comfortable behind a screen and in front of an audience, taking energy from building complete tools that help people.</p>
        <Link to="/about" className="w-full sm:w-auto">
          <ArticleButton>Why</ArticleButton>
        </Link>
      </Article>

      <Article>
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">My work</h1>
        <p className="text-sm sm:text-base md:text-lg text-center sm:text-left">From leading AI platform development to freelance automation projects and personal ventures. Building scalable solutions modern technologies, and cutting-edge AI technologies.</p>
        <Link to="/projects" className="w-full sm:w-auto">
          <ArticleButton>Show me</ArticleButton>
        </Link>
      </Article>
    </div>
    {/* <Dots /> */}
    </main>
  )
}

function Article({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center sm:items-start justify-start gap-6 sm:gap-8 md:gap-10 w-full sm:w-80 md:w-96 border-[#C5D89D] rounded-lg p-6 sm:p-8 md:p-10 border-draw-hover">
      {children}
    </div>
  )
}

function ArticleButton({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 bg-[#89986D] rounded-lg p-3 sm:p-4 md:p-5 text-sm sm:text-base text-white cursor-pointer hover:bg-[#6D7A55] active:bg-[#6D7A55] transition-all duration-300 w-full sm:w-auto">
      {children}
    </div>
  )
}

function SoftwareChain() {
  return (
    <div className="flex flex-row flex-nowrap items-center justify-center min-h-[40vh] md:h-1/3 w-full gap-2 sm:gap-6 md:gap-8 lg:gap-12 px-2 sm:px-6 md:px-0">
      {/* Dotted line from left edge to first item */}
      <div className="w-2 sm:flex-1 sm:min-w-[20px] h-[1px] sm:h-px bg-[#3a3a3a] opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3a3a3a 1px, transparent 1px)', backgroundSize: '8px 2px', backgroundPosition: 'center' }} />
      
      <Backend />
      
      {/* Dotted line between items */}
      <div className="h-[1px] sm:h-px w-2 sm:w-4 md:w-5 bg-[#3a3a3a] opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3a3a3a 1.5px, transparent 1.5px)', backgroundSize: '6px 2px', backgroundPosition: 'center' }} />
      
      <Frontend />
      
      <div className="h-[1px] sm:h-px w-2 sm:w-4 md:w-5 bg-[#3a3a3a] opacity-80 sm:opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3a3a3a 1.5px, transparent 1.5px)', backgroundSize: '6px 2px', backgroundPosition: 'center' }} />
      
      <AI />
      
      <div className="h-[1px] sm:h-px w-2 sm:w-4 md:w-5 bg-[#3a3a3a] opacity-80 sm:opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3a3a3a 1.5px, transparent 1.5px)', backgroundSize: '6px 2px', backgroundPosition: 'center' }} />
      
      <DevOps />
      
      {/* Dotted line from last item to right edge */}
      <div className="w-2 sm:flex-1 sm:min-w-[20px] h-[1px] sm:h-px bg-[#3a3a3a] opacity-80 sm:opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #3a3a3a 1px, transparent 1px)', backgroundSize: '8px 2px', backgroundPosition: 'center' }} />
    </div>
  )
}

function SoftwareChainItem({ title, description, icon, subItems }: { title: string, description: string, icon: React.ReactNode, subItems?: string[] }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isTouched, setIsTouched] = React.useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);

  const showSubItems = isHovered || isTouched;

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setIsTouched(false);
      }
    };

    if (isTouched) {
      // Use both mousedown and touchstart to catch all interactions
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isTouched]);

  const handleTouch = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsTouched(!isTouched);
  };

  return (
    <div 
      ref={itemRef}
      className="relative flex flex-col items-center justify-center p-6 sm:p-10 md:p-12 lg:p-15 gap-3 sm:gap-4 md:gap-5 rounded cursor-pointer border-draw-hover rounded-full w-20 h-20 sm:w-16 sm:h-16 md:w-16 md:h-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouch}
    >
      <p className="text-xs sm:text-sm md:text-base lg:text-lg">{description}</p>
      <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 [&>svg]:w-full [&>svg]:h-full">
        {icon}
      </div>
      
      {showSubItems && subItems && subItems.length > 0 && (
        <div className="absolute top-full mt-2 sm:mt-4 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-1.5 sm:gap-2 justify-center min-w-[300px] sm:min-w-[300px] max-w-[300px] sm:max-w-[500px] z-10 px-2">
          {subItems.map((item, index) => (
            <div 
              key={index}
              className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a] whitespace-nowrap opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Backend() {
  return (
    <SoftwareChainItem 
      title="Backend" 
      description="Backend" 
      icon={<Server />} 
      subItems={["Python", "C#", "Rust", "Kubernetes", "Docker", "PostgreSQL", "Redis"]}
    />
  )
}

function Frontend() {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* "You are here" indicator - positioned above on all screen sizes */}
      <div className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-5 flex flex-col items-center gap-2 z-20 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <span className="text-xs sm:text-sm md:text-base text-[#3a3a3a] font-medium whitespace-nowrap">
          You are here
        </span>
        {/* Arrow pointing down to Frontend */}
        <svg 
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#89986D]"
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 4L12 20M12 20L8 16M12 20L16 16" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <SoftwareChainItem 
        title="Frontend" 
        description="Frontend" 
        icon={<Code />} 
        subItems={["React", "TypeScript", "Tailwind CSS", "Vite", "Prisma", "GraphQL", "REST", "WebSocket"]}
      />
    </div>
  )
}

function AI() {
  return (
    <SoftwareChainItem 
      title="AI" 
      description="AI" 
      icon={<Brain />} 
      subItems={["NLP", "Knowledge Graphs", "RAG", "OpenAI", "LangChain", "LLMs", "MLOps", "Huggingface", "Transformers"]}
    />
  )
}

function DevOps() {
  return (
    <SoftwareChainItem 
      title="DevOps" 
      description="DevOps" 
      icon={<Rocket />} 
      subItems={["AWS", "Azure", "CI/CD", "Ansible", "GitHub Actions", "Monitoring"]}
    />
  )
}

function PortraitSVG() {
  return (
    <svg
      width="120"
      height="140"
      viewBox="0 0 120 140"
      className="w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Face outline - oval shape */}
      <ellipse
        cx="60"
        cy="75"
        rx="35"
        ry="42"
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Hair - styled and swept to the side */}
      <path
        d="M 30 50 Q 25 35, 35 30 Q 50 25, 60 28 Q 70 25, 85 30 Q 95 35, 90 50 Q 88 45, 85 48 Q 75 52, 60 50 Q 45 52, 35 48 Q 32 45, 30 50 Z"
        fill="#D4A574"
        stroke="#3a3a3a"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      
      {/* Hair texture lines */}
      <path
        d="M 40 35 Q 50 32, 60 34"
        fill="none"
        stroke="#B8945F"
        strokeWidth="1"
        opacity="0.6"
      />
      <path
        d="M 50 38 Q 60 36, 70 38"
        fill="none"
        stroke="#B8945F"
        strokeWidth="1"
        opacity="0.6"
      />
      <path
        d="M 45 42 Q 55 40, 65 42"
        fill="none"
        stroke="#B8945F"
        strokeWidth="1"
        opacity="0.5"
      />
      
      {/* Left eye (viewer's left) */}
      <ellipse
        cx="50"
        cy="70"
        rx="5"
        ry="6"
        fill="#4A90E2"
        stroke="#3a3a3a"
        strokeWidth="1.5"
      />
      <circle
        cx="50"
        cy="70"
        r="2.5"
        fill="#3a3a3a"
      />
      <ellipse
        cx="51"
        cy="69"
        rx="1"
        ry="1.5"
        fill="#fff"
        opacity="0.8"
      />
      
      {/* Right eye (viewer's right) */}
      <ellipse
        cx="70"
        cy="70"
        rx="5"
        ry="6"
        fill="#4A90E2"
        stroke="#3a3a3a"
        strokeWidth="1.5"
      />
      <circle
        cx="70"
        cy="70"
        r="2.5"
        fill="#3a3a3a"
      />
      <ellipse
        cx="71"
        cy="69"
        rx="1"
        ry="1.5"
        fill="#fff"
        opacity="0.8"
      />
      
      {/* Eye crinkles - smile lines */}
      <path
        d="M 45 70 Q 42 68, 40 70"
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M 75 70 Q 78 68, 80 70"
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      
      {/* Nose */}
      <path
        d="M 60 75 L 58 85 L 60 87 L 62 85 Z"
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Nostrils */}
      <ellipse
        cx="58"
        cy="85"
        rx="1"
        ry="1.5"
        fill="#3a3a3a"
        opacity="0.6"
      />
      <ellipse
        cx="62"
        cy="85"
        rx="1"
        ry="1.5"
        fill="#3a3a3a"
        opacity="0.6"
      />
      
      {/* Smile - wide and genuine */}
      <path
        d="M 45 92 Q 50 98, 60 99 Q 70 98, 75 92"
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Upper teeth visible in smile */}
      <path
        d="M 52 92 Q 55 95, 58 92 Q 60 95, 62 92 Q 65 95, 68 92"
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.7"
      />
      
      {/* Jawline with slight stubble */}
      <path
        d="M 30 95 Q 35 105, 45 110 Q 55 112, 60 112 Q 65 112, 75 110 Q 85 105, 90 95"
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      
      {/* Light stubble texture */}
      <g opacity="0.3">
        <circle cx="40" cy="100" r="0.8" fill="#3a3a3a" />
        <circle cx="50" cy="105" r="0.8" fill="#3a3a3a" />
        <circle cx="70" cy="105" r="0.8" fill="#3a3a3a" />
        <circle cx="80" cy="100" r="0.8" fill="#3a3a3a" />
        <circle cx="45" cy="108" r="0.8" fill="#3a3a3a" />
        <circle cx="75" cy="108" r="0.8" fill="#3a3a3a" />
      </g>
      
      {/* Shoulders/upper body outline */}
      <path
        d="M 20 115 Q 15 125, 20 135 Q 30 140, 60 140 Q 90 140, 100 135 Q 105 125, 100 115"
        fill="none"
        stroke="#3a3a3a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  );
}

function HoverableImage() {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="p-3 rounded-lg border-draw-hover">
    <div
      className="relative w-100 h-40 rounded-lg opacity-80 p-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        {/* Base image (sepcevtor.jpg) */}
        <img
          src="/images/sepcevtor.jpg"
          alt="Sep Keuchenius"
          className={`absolute inset-0 w-full h-full object-cover object-[50%_40%] rounded-lg transition-opacity duration-700 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* Hover image (sep.jpg) */}
        <img
          src="/images/sep.jpg"
          alt="Sep Keuchenius"
          className={`absolute inset-0 w-full h-full object-cover object-[50%_41%] rounded-lg transition-opacity duration-700 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      </div>
    </div>
  );
}

