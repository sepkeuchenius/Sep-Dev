import * as React from "react";
import { Brain, Code, Rocket, Server } from "lucide-react";
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
    <main className="flex flex-col items-center h-full py-4 sm:py-6 md:py-10 px-4 sm:px-6">
    <div className="flex flex-col items-center justify-end min-h-[15vh] sm:min-h-[20vh] md:h-1/4 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-6 md:mb-8">
      {/* <img src="/images/sep-transparent.png" alt="Sep Keuchenius" className="w-64 rounded-full backdrop-opacity-15" /> */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">Sep Keuchenius</h1>
      <h1 className="text-sm sm:text-base md:text-lg text-center px-4">Software Engineer - AI Engineer - Dev Lead</h1>
    
    </div>
    <SoftwareChain />
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 md:gap-20 mt-6 sm:mt-8 md:mt-10 w-full max-w-7xl">
      <Article>
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">About me</h1>
        <p className="text-sm sm:text-base md:text-lg text-center sm:text-left">I am a software engineer with a passion for building products that help people live better lives.</p>
        <ArticleButton>Why</ArticleButton>
      </Article>

      <Article>
        <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">My work</h1>
        <p className="text-sm sm:text-base md:text-lg text-center sm:text-left">I have worked on a variety of projects, from small side projects to large scale products.</p>
        <ArticleButton>Show me</ArticleButton>
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
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[40vh] md:h-1/2 w-full gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-4 sm:px-6 md:px-0">
      {/* Dotted line from left edge to first item - hidden on mobile */}
      <div className="hidden md:block flex-1 h-0 border-t-2 border-dotted border-[#3a3a3a] opacity-30" />
      
      <Backend />
      
      {/* Dotted line between items - vertical on mobile, horizontal on desktop */}
      <div className="md:hidden w-0 h-4 sm:h-6 border-l-2 border-dotted border-[#3a3a3a] opacity-30" />
      <div className="hidden md:block h-0 w-3 sm:w-4 md:w-5 border-t-2 border-dotted border-[#3a3a3a] opacity-30" />
      
      <Frontend />
      
      <div className="md:hidden w-0 h-4 sm:h-6 border-l-2 border-dotted border-[#3a3a3a] opacity-30" />
      <div className="hidden md:block h-0 w-3 sm:w-4 md:w-5 border-t-2 border-dotted border-[#3a3a3a] opacity-30" />
      
      <AI />
      
      <div className="md:hidden w-0 h-4 sm:h-6 border-l-2 border-dotted border-[#3a3a3a] opacity-30" />
      <div className="hidden md:block h-0 w-3 sm:w-4 md:w-5 border-t-2 border-dotted border-[#3a3a3a] opacity-30" />
      
      <DevOps />
      
      {/* Dotted line from last item to right edge - hidden on mobile */}
      <div className="hidden md:block flex-1 h-0 border-t-2 border-dotted border-[#3a3a3a] opacity-30" />
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
      className="relative flex flex-col items-center justify-center p-6 sm:p-10 md:p-12 lg:p-15 gap-3 sm:gap-4 md:gap-5 rounded cursor-pointer border-draw-hover rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouch}
    >
      <p className="text-xs sm:text-sm md:text-base lg:text-lg hidden sm:block">{description}</p>
      <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 [&>svg]:w-full [&>svg]:h-full">
        {icon}
      </div>
      
      {showSubItems && subItems && subItems.length > 0 && (
        <div className="absolute top-full mt-2 sm:mt-4 left-1/2 transform -translate-x-1/2 flex flex-wrap gap-1.5 sm:gap-2 justify-center min-w-[150px] sm:min-w-[200px] max-w-[250px] sm:max-w-[300px] z-10 px-2">
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
  return (
    <SoftwareChainItem 
      title="Frontend" 
      description="Frontend" 
      icon={<Code />} 
      subItems={["React", "TypeScript", "Tailwind CSS", "Vite", "Prisma", "GraphQL", "REST", "WebSocket"]}
    />
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

