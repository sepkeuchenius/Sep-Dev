import * as React from "react";
import { Link } from "react-router";
import { 
  Shield, 
  Database, 
  Lock, 
  Eye, 
  Server,
  ArrowLeft
} from "lucide-react";
import type { Route } from "./+types/multicopy-privacy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Privacy Policy - MultiCopy Clipboard" },
    { name: "description", content: "Privacy Policy for MultiCopy Clipboard Chrome Extension. Learn how we protect your data and respect your privacy." },
    { property: "og:url", content: "https://sep.dev/multicopy-privacy" },
    { property: "og:type", content: "website" },
  ];
}

export default function MultiCopyPrivacy() {
  return (
    <main className="flex flex-col items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 relative min-h-screen">
      {/* Back Link */}
      <div className="w-full max-w-3xl mb-8 animate-slide-in">
        <Link 
          to="/multicopy" 
          className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#2563eb] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to MultiCopy
        </Link>
      </div>

      {/* Header */}
      <header className="w-full max-w-3xl text-center mb-12 animate-slide-in" style={{ animationDelay: '100ms' }}>
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-[#5a5a5a]">
          MultiCopy Clipboard Extension
        </p>
        <p className="text-sm text-[#7a7a7a] mt-2">
          Last updated: January 2026
        </p>
      </header>

      {/* Privacy Content */}
      <article className="w-full max-w-3xl space-y-8">
        {/* Summary Box */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-[#3b82f6]/10 to-[#8b5cf6]/10 border border-[#3b82f6]/20 animate-slide-in" style={{ animationDelay: '200ms' }}>
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#3b82f6]" />
            TL;DR – Your Privacy is Protected
          </h2>
          <p className="text-[#5a5a5a] leading-relaxed">
            <strong>MultiCopy stores all your data locally on your device.</strong> We don't collect, transmit, or have access to any of your copied text, tags, or browsing data. Your clipboard history never leaves your computer.
          </p>
        </div>

        {/* Section: Data Storage */}
        <PrivacySection 
          icon={<Database className="w-5 h-5" />}
          title="Data Storage"
          delay={300}
        >
          <p>
            All data saved by MultiCopy—including your copied text, tags, pins, and source URLs—is stored entirely on your local device using your browser's built-in storage mechanisms (IndexedDB and Chrome Storage API).
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 text-[#5a5a5a]">
            <li>Your copied text snippets</li>
            <li>Tags you create to organize copies</li>
            <li>Pin status for favorite items</li>
            <li>Source URLs and page titles</li>
            <li>Timestamps of when copies were made</li>
          </ul>
          <p className="mt-3">
            <strong>None of this data is ever sent to external servers.</strong>
          </p>
        </PrivacySection>

        {/* Section: Data Collection */}
        <PrivacySection 
          icon={<Eye className="w-5 h-5" />}
          title="What We Don't Collect"
          delay={400}
        >
          <p>MultiCopy does <strong>not</strong> collect:</p>
          <ul className="list-disc list-inside space-y-2 mt-3 text-[#5a5a5a]">
            <li>Personal information or identifiers</li>
            <li>Browsing history</li>
            <li>Analytics or usage data</li>
            <li>Cookies or tracking information</li>
            <li>Any data you copy to your clipboard</li>
          </ul>
          <p className="mt-3">
            We have no servers, no databases, and no way to access your information.
          </p>
        </PrivacySection>

        {/* Section: Permissions */}
        <PrivacySection 
          icon={<Lock className="w-5 h-5" />}
          title="Extension Permissions"
          delay={500}
        >
          <p>
            MultiCopy requests certain browser permissions to function. Here's why each permission is needed:
          </p>
          <div className="mt-4 space-y-4">
            <PermissionItem 
              permission="activeTab"
              reason="To copy selected text from the current page when you use keyboard shortcuts"
            />
            <PermissionItem 
              permission="storage"
              reason="To save your copies, tags, and preferences locally on your device"
            />
            <PermissionItem 
              permission="contextMenus"
              reason="To add right-click menu options for quick copy/paste"
            />
            <PermissionItem 
              permission="scripting"
              reason="To enable keyboard shortcuts and paste functionality on web pages"
            />
            <PermissionItem 
              permission="notifications"
              reason="To show confirmation messages when you copy or paste text"
            />
          </div>
        </PrivacySection>

        {/* Section: Third Parties */}
        <PrivacySection 
          icon={<Server className="w-5 h-5" />}
          title="Third Parties"
          delay={600}
        >
          <p>
            MultiCopy does not share data with any third parties because we don't collect any data in the first place. The extension operates entirely offline and locally.
          </p>
        </PrivacySection>

        {/* Section: Data Deletion */}
        <PrivacySection 
          icon={<Shield className="w-5 h-5" />}
          title="Deleting Your Data"
          delay={700}
        >
          <p>
            Since all data is stored locally, you have complete control:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3 text-[#5a5a5a]">
            <li>Delete individual copies directly in the extension</li>
            <li>Clear all data using the "Clear All" option in settings</li>
            <li>Uninstall the extension to remove all associated data</li>
            <li>Clear your browser's storage data through Chrome settings</li>
          </ul>
        </PrivacySection>

        {/* Disclaimer */}
        <div className="p-6 rounded-xl bg-amber-50/50 border border-amber-200/50 animate-slide-in" style={{ animationDelay: '800ms' }}>
          <h2 className="text-lg font-bold mb-3 text-amber-800">⚠️ Disclaimer</h2>
          <p className="text-amber-900/80 leading-relaxed">
            While MultiCopy stores your copies locally on your device, data loss can occasionally occur due to factors outside our control—such as browser updates, clearing browser data, system crashes, or hardware failures. MultiCopy is not responsible for any lost data. For important information, we recommend keeping separate backups.
          </p>
        </div>

        {/* Contact */}
        <div className="p-6 rounded-xl bg-white/50 border border-[#e5e0c8] text-center animate-slide-in" style={{ animationDelay: '900ms' }}>
          <h2 className="text-lg font-bold mb-3">Questions or Concerns?</h2>
          <p className="text-[#5a5a5a] mb-4">
            If you have any questions about this privacy policy or MultiCopy, feel free to reach out.
          </p>
          <Link 
            to="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#89986D] text-white rounded-xl font-semibold hover:bg-[#6D7A55] transition-colors"
          >
            Contact Sep
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-[#6a6a6a] animate-slide-in" style={{ animationDelay: '1000ms' }}>
        <p>
          <Link to="/multicopy" className="text-[#3b82f6] hover:underline">← Back to MultiCopy</Link>
          {" · "}
          <Link to="/" className="text-[#3b82f6] hover:underline">sep.dev</Link>
        </p>
      </footer>
    </main>
  );
}

function PrivacySection({ 
  icon, 
  title, 
  children,
  delay = 0
}: { 
  icon: React.ReactNode; 
  title: string; 
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <section 
      className="p-6 rounded-xl bg-white/50 border border-[#e5e0c8] animate-slide-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
        <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] flex items-center justify-center text-white">
          {icon}
        </span>
        {title}
      </h2>
      <div className="text-[#4a4a4a] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function PermissionItem({ permission, reason }: { permission: string; reason: string }) {
  return (
    <div className="flex gap-3 p-3 rounded-lg bg-[#F6F0D7]/50">
      <code className="px-2 py-1 bg-[#3b82f6]/10 text-[#2563eb] rounded font-mono text-sm h-fit">
        {permission}
      </code>
      <span className="text-[#5a5a5a] text-sm">{reason}</span>
    </div>
  );
}
