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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Logo />
        <SocialLinks />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Logo() {
  const location = useLocation();
  const [isVisible, setIsVisible] = React.useState(false);
  const isHome = location.pathname === "/";
  const containerRef = React.useRef<HTMLDivElement>(null);

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

  // Hide on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
    };

    if (isVisible) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      setIsVisible(!isVisible);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-4 left-4 z-50 flex items-center"
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
          <span className="text-xs sm:text-sm text-[#3a3a3a] font-medium whitespace-nowrap">
            You are here
          </span>
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
