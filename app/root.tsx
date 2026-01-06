import * as React from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
  useLocation,
} from "react-router";
import { Linkedin, Github } from "lucide-react";

import type { Route } from "./+types/root";
import "./app.css";
import { EasterEgg } from "./components/easter-egg";

const SITE_URL = "https://sep.dev";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/logo.svg", type: "image/svg+xml" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap",
  },
];

export const meta: Route.MetaFunction = ({ data, matches }) => {
  const routeMatch = matches.find((match) => match?.meta);
  const routeMeta = routeMatch?.meta || [];
  
  // Extract title and description from route meta, handling different meta descriptor types
  let title = "Sep Keuchenius - Software Engineer & AI Engineer";
  let description = "Sep Keuchenius - Full-stack Software Engineer & AI Engineer. Expert in React, TypeScript, Python, AI/ML, and cloud infrastructure.";
  let url = SITE_URL;
  
  for (const meta of routeMeta) {
    if ("title" in meta && typeof meta.title === "string") {
      title = meta.title;
    }
    if ("name" in meta && meta.name === "description" && "content" in meta && typeof meta.content === "string") {
      description = meta.content;
    }
    if ("property" in meta && meta.property === "og:url" && "content" in meta && typeof meta.content === "string") {
      url = meta.content;
    }
  }
  
  const image = `${SITE_URL}/images/sep.jpg`;

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: "Sep Keuchenius, Software Engineer, AI Engineer, Full-stack Developer, React, TypeScript, Python, Machine Learning, NLP, Kubernetes, DevOps, Lead Developer" },
    { name: "author", content: "Sep Keuchenius" },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    
    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: "Sep Keuchenius - Software Engineer & AI Engineer" },
    { property: "og:site_name", content: "Sep Keuchenius" },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: "Sep Keuchenius - Software Engineer & AI Engineer" },
    
    // Additional SEO
    { name: "theme-color", content: "#89986D" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const canonicalUrl = `${SITE_URL}${location.pathname === "/" ? "" : location.pathname}`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />
        <Meta />
        <Links />
        <StructuredData />
      </head>
      <body>
        <Logo />
        <SocialLinks />
        <EasterEgg />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sep Keuchenius",
    "jobTitle": "Lead Developer & AI Engineer",
    "url": SITE_URL,
    "sameAs": [
      "https://www.linkedin.com/in/sep-k-10065a141/",
      "https://github.com/sepkeuchenius"
    ],
    "image": `${SITE_URL}/images/sep.jpg`,
    "description": "Full-stack Software Engineer & AI Engineer. Expert in React, TypeScript, Python, AI/ML, Kubernetes, and cloud infrastructure.",
    "knowsAbout": [
      "Software Engineering",
      "Artificial Intelligence",
      "Machine Learning",
      "Natural Language Processing",
      "Full-stack Development",
      "React",
      "TypeScript",
      "Python",
      "Kubernetes",
      "DevOps",
      "Cloud Computing"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Utrecht",
      "degree": "Bachelor's in AI"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Y. Digital"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

function Logo() {
  const location = useLocation();
  const [isVisible, setIsVisible] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);
  const isHome = location.pathname === "/";
  const isAboutOrProjects = location.pathname === "/about" || location.pathname === "/projects";
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Track scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Hide indicator on scroll
      setIsVisible(false);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setScrollY(window.scrollY); // Set initial scroll position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Hide on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isVisible]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      setIsVisible(!isVisible);
    }
  };

  // Hide logo when on about/projects pages and scrolled to top
  const shouldHideLogo = isAboutOrProjects && scrollY < 10;

  return (
    <div
      ref={containerRef}
      className={`fixed top-4 left-4 z-50 flex items-center transition-opacity duration-300 ${
        shouldHideLogo ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <Link
        to="/"
        onClick={handleLogoClick}
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 p-2 rounded-full hover:bg-[#C5D89D]/20"
        aria-label="Home"
      >
        <img
          src="/logo.svg"
          alt="Logo"
          className="w-6 h-6"
        />
      </Link>
      {/* "You are here" indicator - shown when on home page and clicked */}
      {isHome && (
        <div className={`flex items-center gap-2 ml-2 z-20 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          
          {/* Arrow pointing left to logo */}
          <svg 
            className="w-4 h-4 sm:w-5 sm:h-5 text-[#89986D]"
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M20 12L4 12M4 12L8 8M4 12L8 16" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>

          <span className="text-xs sm:text-sm text-[#3a3a3a] font-medium whitespace-nowrap">
            You are here already!
          </span>
        </div>
      )}
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <a
        href="https://www.linkedin.com/in/sep-k-10065a141/"
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 p-2 rounded-full hover:bg-[#C5D89D]/20"
        aria-label="LinkedIn"
      >
        <Linkedin className="w-5 h-5 text-[#3a3a3a]" />
      </a>
      <a
        href="https://github.com/sepkeuchenius"
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 p-2 rounded-full hover:bg-[#C5D89D]/20"
        aria-label="GitHub"
      >
        <Github className="w-5 h-5 text-[#3a3a3a]" />
      </a>
    </div>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
