import * as React from "react";
import { Terminal, X } from "lucide-react";

export function EasterEgg() {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed bottom-4 left-4 z-50">
      {/* Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 p-2 rounded-full hover:bg-[#C5D89D]/20"
        aria-label="Infrastructure info"
      >
        <Terminal className="w-5 h-5 text-[#3a3a3a]" />
      </button>

      {/* Modal/Tooltip */}
      {isOpen && (
        <div className="absolute bottom-12 left-0 w-80 sm:w-96 bg-[#C5D89D] rounded-lg shadow-lg border border-[#C5D89D]/30 p-4 animate-fade-in">
          <div className="text-xs sm:text-sm text-[#3a3a3a] space-y-2">
            <p>
              This website is running inside a <span className="font-semibold">self-hosted Kubernetes cluster</span> using <span className="font-semibold">k3s</span>.
            </p>
            <p>
              Hosted on a <span className="font-semibold">Raspberry Pi</span> in my home in <span className="font-semibold">Zeist</span>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

