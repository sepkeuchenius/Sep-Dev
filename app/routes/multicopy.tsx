import * as React from "react";
import { Link } from "react-router";
import { 
  Tags, 
  Pin, 
  Search, 
  Keyboard, 
  Link2, 
  Database,
  Clipboard,
  ArrowRight,
  Chrome
} from "lucide-react";
import type { Route } from "./+types/multicopy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MultiCopy Clipboard - Chrome Extension by Sep Keuchenius" },
    { name: "description", content: "MultiCopy Clipboard - Your infinite clipboard manager for Chrome. Copy unlimited text, organize with tags, pin favorites, and never lose a snippet again." },
    { property: "og:url", content: "https://sep.dev/multicopy" },
    { property: "og:type", content: "website" },
  ];
}

export default function MultiCopy() {
  return (
    <main className="flex flex-col items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6 mb-16 max-w-4xl text-center animate-slide-in">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Clipboard className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded-full text-sm font-medium text-[#2563eb]">
          <span>✨</span>
          <span>Version 5.0 Now Available</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          MultiCopy{" "}
          <span className="bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] bg-clip-text text-transparent">
            Clipboard
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl text-[#5a5a5a] max-w-2xl">
          Your infinite clipboard, reimagined. Copy smarter, paste faster, and keep all your snippets organized—even after closing Chrome.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a 
            href="https://chromewebstore.google.com/detail/multicopy-clipboard-copy/fahoojlhneomlloahghepkcegggkpahh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Chrome className="w-5 h-5" />
            Add to Chrome
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link 
            to="/multicopy-privacy"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#3b82f6]/30 text-[#3b82f6] rounded-xl font-semibold hover:border-[#3b82f6] hover:bg-[#3b82f6]/5 transition-all duration-300"
          >
            Privacy Policy
          </Link>
        </div>
      </section>

      {/* Mock UI Preview */}
      <section className="w-full max-w-3xl mb-16 animate-slide-in" style={{ animationDelay: '200ms' }}>
        <MockExtensionUI />
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 animate-slide-in" style={{ animationDelay: '300ms' }}>
          Everything you need to <span className="text-[#3b82f6]">copy smarter</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Tags className="w-6 h-6" />}
            title="Smart Tagging"
            description="Organize your copies with custom tags. Add labels like 'work', 'code', or 'links' to categorize and find snippets instantly."
            color="blue"
            delay={400}
          />
          <FeatureCard 
            icon={<Pin className="w-6 h-6" />}
            title="Pin Favorites"
            description="Keep your most-used text at the top. Pinned copies stay accessible so you never have to scroll for important snippets."
            color="amber"
            delay={500}
          />
          <FeatureCard 
            icon={<Search className="w-6 h-6" />}
            title="Instant Search"
            description="Find any copy in milliseconds. Search through text content and tags with real-time filtering."
            color="emerald"
            delay={600}
          />
          <FeatureCard 
            icon={<Keyboard className="w-6 h-6" />}
            title="Keyboard Shortcuts"
            description="Copy selections instantly with Alt+C. Paste everything at once with Alt+V. Maximum efficiency."
            color="purple"
            delay={700}
          />
          <FeatureCard 
            icon={<Link2 className="w-6 h-6" />}
            title="Source Tracking"
            description="See where text came from. MultiCopy saves the source URL and page title with each copy."
            color="pink"
            delay={800}
          />
          <FeatureCard 
            icon={<Database className="w-6 h-6" />}
            title="Unlimited Storage"
            description="Powered by IndexedDB for blazing-fast performance. Store thousands of copies without any limits."
            color="cyan"
            delay={900}
          />
        </div>
      </section>

      {/* Keyboard Shortcuts Section */}
      <section className="w-full max-w-3xl mb-16 animate-slide-in" style={{ animationDelay: '1000ms' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Lightning-fast <span className="text-[#3b82f6]">shortcuts</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          <ShortcutDisplay keys={["Alt", "C"]} label="Quick Copy" />
          <ShortcutDisplay keys={["Alt", "V"]} label="Paste All" />
          <ShortcutDisplay keys={["Right Click"]} label="Context Menu" />
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full max-w-4xl mb-16 animate-slide-in" style={{ animationDelay: '1100ms' }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Perfect for <span className="text-[#3b82f6]">everyone</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <UseCaseCard 
            emoji="👨‍💻"
            title="Developers"
            description="Gather code snippets, API keys, and documentation without losing track."
          />
          <UseCaseCard 
            emoji="🔬"
            title="Researchers"
            description="Collect quotes, references, and notes from multiple sources effortlessly."
          />
          <UseCaseCard 
            emoji="✍️"
            title="Writers"
            description="Keep drafts, templates, and commonly used phrases at your fingertips."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-2xl text-center animate-slide-in" style={{ animationDelay: '1200ms' }}>
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#3b82f6]/10 to-[#8b5cf6]/10 border border-[#3b82f6]/20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to copy smarter?
          </h2>
          <p className="text-[#5a5a5a] mb-6">
            Join thousands of users who've transformed their clipboard workflow.
          </p>
          <a 
            href="https://chromewebstore.google.com/detail/multicopy-clipboard-copy/fahoojlhneomlloahghepkcegggkpahh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Chrome className="w-6 h-6" />
            Install MultiCopy Free
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer Links */}
      <footer className="mt-16 text-center text-sm text-[#6a6a6a] animate-slide-in" style={{ animationDelay: '1300ms' }}>
        <p>Made with ❤️ by <Link to="/" className="text-[#3b82f6] hover:underline">Sep Keuchenius</Link></p>
        <p className="mt-2">
          <Link to="/multicopy-privacy" className="text-[#3b82f6] hover:underline">Privacy Policy</Link>
        </p>
      </footer>
    </main>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  color,
  delay = 0 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: 'blue' | 'amber' | 'emerald' | 'purple' | 'pink' | 'cyan';
  delay?: number;
}) {
  const colorClasses = {
    blue: 'from-[#3b82f6] to-[#1d4ed8] shadow-blue-500/20',
    amber: 'from-[#f59e0b] to-[#d97706] shadow-amber-500/20',
    emerald: 'from-[#10b981] to-[#059669] shadow-emerald-500/20',
    purple: 'from-[#8b5cf6] to-[#6d28d9] shadow-purple-500/20',
    pink: 'from-[#ec4899] to-[#be185d] shadow-pink-500/20',
    cyan: 'from-[#06b6d4] to-[#0891b2] shadow-cyan-500/20',
  };

  return (
    <div 
      className="p-6 rounded-xl bg-white/50 border border-[#e5e0c8] border-draw-hover hover:shadow-lg transition-all duration-300 animate-slide-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white mb-4 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-[#5a5a5a] leading-relaxed">{description}</p>
    </div>
  );
}

function ShortcutDisplay({ keys, label }: { keys: string[]; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-2">
        {keys.map((key, i) => (
          <span 
            key={i}
            className="inline-flex items-center justify-center min-w-[40px] h-10 px-3 bg-white border border-[#d5d0b8] rounded-lg text-sm font-semibold shadow-sm"
          >
            {key}
          </span>
        ))}
      </div>
      <span className="text-sm text-[#5a5a5a]">{label}</span>
    </div>
  );
}

function UseCaseCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/50 border border-[#e5e0c8] text-center border-draw-hover hover:shadow-lg transition-all duration-300">
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-[#5a5a5a]">{description}</p>
    </div>
  );
}

function MockExtensionUI() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#e5e0c8]">
      {/* Browser chrome */}
      <div className="bg-[#1e293b] px-4 py-3 flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-[#0f172a] rounded-lg px-4 py-2 text-xs text-[#94a3b8] font-mono">
          chrome-extension://multicopy
        </div>
      </div>
      
      {/* Extension UI */}
      <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
        <div className="bg-white rounded-xl max-w-sm mx-auto overflow-hidden shadow-xl">
          {/* Header */}
          <div className="bg-[#fafafa] px-4 py-3 flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8]" />
              <span className="text-sm font-semibold text-gray-900">MultiCopy Clipboard</span>
            </div>
          </div>
          
          {/* Body */}
          <div className="p-4 space-y-3">
            {/* Search bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100">
              <Search className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Search copies or tags...</span>
            </div>
            
            {/* Pinned item */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-50 to-amber-50/30 rounded-xl border border-amber-200/50">
              <span className="flex-1 text-sm font-medium text-gray-900 truncate">Weekly standup agenda items...</span>
              <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-semibold">work</span>
              <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>
            
            {/* Regular items */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <span className="flex-1 text-sm font-medium text-gray-900 truncate">const handleCopy = async () =&gt;</span>
              <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-semibold">code</span>
            </div>
            
            <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-100 shadow-sm">
              <span className="flex-1 text-sm font-medium text-gray-900 truncate">https://github.com/project/...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
