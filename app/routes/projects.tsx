import { Link } from "react-router";
import type { Route } from "./+types/projects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects - Sep Keuchenius | Software Engineer & AI Engineer" },
    { name: "description", content: "Explore projects by Sep Keuchenius - Software Engineer & AI Engineer. Including Spotter, MoneyFlow, Politics Navigator, and professional work on AI platforms and automation solutions." },
    { property: "og:url", content: "https://sep.dev/projects" },
    { property: "og:type", content: "website" },
  ];
}

export default function Projects() {
  return (
    <main className="flex flex-col items-center min-h-screen py-4 sm:py-6 md:py-10 px-4 sm:px-6">
      <div className="w-full max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#89986D] hover:text-[#6D7A55] transition-colors mb-6 sm:mb-8"
        >
          ← Back to home
        </Link>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">My work</h1>
        
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
          <section className="border-[#C5D89D] rounded-lg p-6 sm:p-8 md:p-10 border-draw-hover">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Current Projects</h2>
            
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">Spotter</h3>
                  <span className="text-sm sm:text-base text-[#6D7A55]">In development</span>
                </div>
                <p className="text-sm sm:text-base mb-3 leading-relaxed">
                  A platform for finding and saving interesting spots that don't have an address.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">React</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">Prisma</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">Postgres</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">Docker</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">Kubernetes</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">ORY Auth</span>
                </div>
                <a 
                  href="https://spotter.sep.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#89986D] hover:text-[#6D7A55] transition-colors text-sm sm:text-base"
                >
                  Live at https://spotter.sep.dev →
                </a>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">MoneyFlow</h3>
                  <span className="text-sm sm:text-base text-[#6D7A55]">In development</span>
                </div>
                <p className="text-sm sm:text-base mb-3 leading-relaxed">
                  A tool for visualizing your money flow (incoming, outgoing, etc).
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">React</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">Prisma</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">Postgres</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">Docker</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">Kubernetes</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">ORY Auth</span>
                </div>
                <a 
                  href="https://moneyflow.sep.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#89986D] hover:text-[#6D7A55] transition-colors text-sm sm:text-base"
                >
                  Live at https://moneyflow.sep.dev →
                </a>
                <p className="text-xs sm:text-sm text-[#6D7A55] mt-2">(very buggy atm)</p>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">Politics Navigator</h3>
                  <span className="text-sm sm:text-base text-[#6D7A55]">Next gen in development</span>
                </div>
                <p className="text-sm sm:text-base mb-3 leading-relaxed">
                  A tool for researching what Dutch political parties SAY vs DO.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">Algolia</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">Python</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">HTML/JS/CSS</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">LLM</span>
                </div>
                <a 
                  href="https://politics-navigator.web.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#89986D] hover:text-[#6D7A55] transition-colors text-sm sm:text-base"
                >
                  Live at https://politics-navigator.web.app/ →
                </a>
              </div>
            </div>
          </section>

          <section className="border-[#C5D89D] rounded-lg p-6 sm:p-8 md:p-10 border-draw-hover">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Open Source & Tools</h2>
            
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">MultiCopy Clipboard</h3>
                  <span className="text-sm sm:text-base text-[#6D7A55]">Chrome Extension</span>
                </div>
                <p className="text-sm sm:text-base mb-3 leading-relaxed">
                  Your infinite clipboard manager for Chrome. Copy unlimited text, organize with tags, pin favorites, search instantly, and never lose a snippet again.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">JavaScript</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">Chrome Extension</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">IndexedDB</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    to="/multicopy"
                    className="text-[#89986D] hover:text-[#6D7A55] transition-colors text-sm sm:text-base"
                  >
                    Learn more →
                  </Link>
                  <a 
                    href="https://chromewebstore.google.com/detail/multicopy-clipboard-copy/fahoojlhneomlloahghepkcegggkpahh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#89986D] hover:text-[#6D7A55] transition-colors text-sm sm:text-base"
                  >
                    Chrome Web Store →
                  </a>
                </div>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">Vibe-coded decorator</h3>
                </div>
                <p className="text-sm sm:text-base mb-3 leading-relaxed">
                  A Python decorator library (joke project).
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">Python</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a 
                    href="https://github.com/sepkeuchenius/vibe-coded-decorator" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#89986D] hover:text-[#6D7A55] transition-colors text-sm sm:text-base"
                  >
                    GitHub →
                  </a>
                  <a 
                    href="https://pypi.org/project/vibe-coded-decorator/0.1.1/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#89986D] hover:text-[#6D7A55] transition-colors text-sm sm:text-base"
                  >
                    PyPI →
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="border-[#C5D89D] rounded-lg p-6 sm:p-8 md:p-10 border-draw-hover">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Past Projects</h2>
            
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">Sep.Dev</h3>
                  <span className="text-sm sm:text-base text-[#6D7A55]">Portfolio website</span>
                </div>
                <p className="text-sm sm:text-base mb-3 leading-relaxed">
                  Portfolio website created in 2021, showcasing reviews from customers during my time as a freelancer. Needs an update.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">HTML</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">JS</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">Github Pages</span>
                </div>
                <a 
                  href="https://sep.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#89986D] hover:text-[#6D7A55] transition-colors text-sm sm:text-base"
                >
                  Live at https://sep.dev →
                </a>
              </div>

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-semibold">WXNDER</h3>
                  <span className="text-sm sm:text-base text-[#6D7A55]">No longer live</span>
                </div>
                <p className="text-sm sm:text-base mb-3 leading-relaxed">
                  Website for exploring and ordering products made by our company, WXNDER. 
                  Automation with PHP to our SQL database and to our email, Slack, and self-built admin system.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">PHP</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">SQL</span>
                  <span className="px-3 py-1 bg-[#C5D89D] rounded-full text-xs sm:text-sm text-[#3a3a3a]">HTML/JS/CSS</span>
                </div>
              </div>
            </div>
          </section>

          <section className="border-[#C5D89D] rounded-lg p-6 sm:p-8 md:p-10 border-draw-hover">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Professional Work</h2>
            
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Y. Digital AI Platform</h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  As Lead Developer and previously AI Engineer, I've been building an intelligent, 
                  highly configurable, scalable, and secure text-focused AI platform. This involves 
                  developing features, testing & validating in production, finetuning AI solutions, 
                  training models, creating synthetic data, and ensuring smooth infrastructure across 
                  Development, Testing, and Production environments.
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Freelance Automation Projects</h3>
                <p className="text-sm sm:text-base leading-relaxed">
                  As a freelance software developer, I've helped many clients with various issues. 
                  The biggest project was as an automation engineer at an accounting firm, where I 
                  was responsible for automating manual processes in HubSpot using efficient, secure 
                  serverless scripts.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

