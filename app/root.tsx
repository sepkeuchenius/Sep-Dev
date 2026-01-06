import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link,
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
  return (
    <Link
      to="/"
      className="fixed top-4 left-4 z-50 opacity-50 hover:opacity-100 transition-opacity duration-300 p-2 rounded-full hover:bg-[#C5D89D]/20"
      aria-label="Home"
    >
      <img
        src="/logo.svg"
        alt="Logo"
        className="w-6 h-6"
      />
    </Link>
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
