import React, { useState } from 'react';
import { 
  ArrowRight, 
  FileText, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  MapPin,
  Terminal,
} from 'lucide-react';
import { ProfileData } from '../types';
import { FadeInSection } from './FadeInSection';

interface HeroProps {
  profile: ProfileData;
  onOpenResume: () => void;
  onOpenTerminal?: () => void;
  onOpenEditProfile?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenResume, onOpenTerminal, onOpenEditProfile }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-10 md:pt-28 md:pb-12 border-b border-zinc-200/80 dark:border-zinc-800/80"
    >
      <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" delay={40} direction="up" distance={20}>
        {/* Simple Role Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-300 mb-4 shadow-2xs">
          <img src="/assets/hacker-logo-v2.svg" alt="Cyber Emblem" className="w-3.5 h-3.5 object-contain" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Security Architect at Crescent Technologies</span>
        </div>

        {/* Name & Headline with Cyber Emblem */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 mb-2">
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-zinc-300/80 dark:border-zinc-800 shadow-2xs shrink-0 bg-zinc-900 flex items-center justify-center p-2.5"
          >
            <img
              src="/assets/hacker-logo-v2.svg"
              alt="Cyber Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg sm:text-xl font-medium text-zinc-700 dark:text-zinc-300">
              {profile.title}
            </p>
          </div>
        </div>

        {/* Short, clear bio */}
        <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          Specializing in enterprise security architecture, Zero Trust design, and Vulnerability Assessment & Penetration Testing (VAPT), with a strong operational background in 24/7 network monitoring, switch configuration, and incident management.
        </p>

        {/* Location & Quick Meta */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-zinc-400" />
            Mumbai, India
          </span>
          {profile.phone && (
            <a
              href={`tel:${profile.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-zinc-400" />
              {profile.phone}
            </a>
          )}
          <span className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-zinc-400" />
            {profile.email}
          </span>
        </div>

        {/* Clean Action Links */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenResume}
            id="hero-btn-resume"
            className="px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-medium text-sm flex items-center gap-2 transition-all duration-200 hover:scale-103 shadow-xs cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume</span>
          </button>

          <button
            onClick={copyEmail}
            id="hero-btn-copy-email"
            title="Click to copy email address"
            className="px-4 py-2.5 rounded-lg bg-zinc-200/70 hover:bg-zinc-300/70 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-300 text-xs border border-zinc-300/80 dark:border-zinc-700 flex items-center gap-2 transition-all duration-200 hover:scale-103 shadow-2xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          {/* Terminal Mode Quick Access Button */}
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              id="hero-btn-terminal"
              title="Launch Cyber Command Line Interface"
              className="px-4 py-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-mono font-semibold text-xs border border-emerald-600/30 dark:border-emerald-700/50 flex items-center gap-2 transition-all duration-200 hover:scale-103 cursor-pointer shadow-2xs group"
            >
              <Terminal className="w-4 h-4 group-hover:scale-110 transition-transform text-emerald-700 dark:text-emerald-400" />
              <span>Terminal CLI</span>
            </button>
          )}

          {/* Connect on LinkedIn Button */}
          {profile.socialLinks.linkedin && (
            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              id="hero-btn-linkedin"
              title="Connect with Sahil on LinkedIn"
              className="px-4 py-2.5 rounded-lg bg-zinc-200/70 hover:bg-zinc-300/70 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-medium text-xs border border-zinc-300/80 dark:border-zinc-800 flex items-center gap-2 transition-all duration-200 hover:scale-103 cursor-pointer shadow-2xs group"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#0A66C2] dark:text-[#70b5f9] group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
          )}

          {/* GitHub Profile Button */}
          {profile.socialLinks.github && (
            <a
              href={profile.socialLinks.github}
              target="_blank"
              rel="noreferrer"
              id="hero-link-github"
              title="View GitHub Profile"
              className="px-4 py-2.5 rounded-lg bg-zinc-200/70 hover:bg-zinc-300/70 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-medium text-xs border border-zinc-300/80 dark:border-zinc-800 flex items-center gap-2 transition-all duration-200 hover:scale-103 cursor-pointer shadow-2xs"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </FadeInSection>
    </section>
  );
};
