import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Sun, 
  Moon, 
  FileText, 
  Menu, 
  X, 
  Send, 
  Github, 
  Linkedin, 
  Mail
} from 'lucide-react';
import { ProfileData } from '../types';

interface NavbarProps {
  profile: ProfileData;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
  onOpenEditProfile: () => void;
  onOpenTerminal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  isDarkMode,
  onToggleTheme,
  onOpenResume,
  onOpenEditProfile,
  onOpenTerminal,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    setAvatarError(false);
  }, [profile.avatarUrl]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Connections', href: '#partners' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-100/90 dark:bg-zinc-950/85 backdrop-blur-md border-b border-zinc-300/80 dark:border-zinc-800/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a
          href="#"
          id="nav-logo"
          className="group flex items-center gap-3 text-zinc-900 dark:text-zinc-100 font-semibold tracking-tight hover:opacity-90 transition-opacity shrink-0"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-700/80 text-white flex items-center justify-center p-1.5 shadow-2xs group-hover:scale-105 transition-transform shrink-0">
            <img
              src="/assets/hacker-logo-v2.svg"
              alt="Cyber Emblem"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="leading-tight font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-50">{profile.name}</span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for hire
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-zinc-200/80 dark:bg-zinc-900/60 p-1 rounded-full border border-zinc-300/80 dark:border-zinc-800/60 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-zinc-50 dark:bg-zinc-800 dark:text-white shadow-xs font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 font-medium hover:bg-zinc-300/50 dark:hover:bg-zinc-800/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Clean, unified button cluster */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          {/* Terminal CLI Mode */}
          <button
            id="btn-toggle-terminal"
            onClick={onOpenTerminal}
            title="Switch to Interactive Terminal CLI Mode"
            className="h-8.5 px-3 rounded-lg text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-500/15 hover:bg-emerald-500/25 dark:bg-emerald-500/15 dark:hover:bg-emerald-500/25 border border-emerald-600/30 dark:border-emerald-500/30 flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer group"
          >
            <Terminal className="w-3.5 h-3.5 group-hover:scale-110 transition-transform text-emerald-700 dark:text-emerald-400" />
            <span>Terminal</span>
          </button>

          <div className="h-4 w-px bg-zinc-300/80 dark:bg-zinc-800 mx-0.5" />

          {/* Theme Toggle */}
          <button
            id="btn-toggle-theme"
            onClick={onToggleTheme}
            aria-label="Toggle dark/light mode"
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="h-8.5 w-8.5 rounded-lg text-zinc-700 dark:text-zinc-300 bg-zinc-200/70 dark:bg-zinc-900 hover:bg-zinc-300/70 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors border border-zinc-300/80 dark:border-zinc-800 shadow-2xs cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1.5 md:hidden">
          <button
            onClick={onOpenTerminal}
            aria-label="Toggle terminal mode"
            className="p-2 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg border border-emerald-500/30"
            title="Interactive Terminal Mode"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-zinc-700 dark:text-zinc-300 bg-zinc-200/70 dark:bg-zinc-900 hover:bg-zinc-300/70 dark:hover:bg-zinc-800 rounded-lg border border-zinc-300/80 dark:border-zinc-800 shadow-2xs"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-zinc-700 dark:text-zinc-200 bg-zinc-200/70 dark:bg-zinc-900 hover:bg-zinc-300/70 dark:hover:bg-zinc-800 rounded-lg border border-zinc-300/80 dark:border-zinc-800 shadow-2xs"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            {profile.socialLinks.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 text-sm text-center font-semibold text-[#0A66C2] dark:text-[#70b5f9] bg-[#0A66C2]/10 rounded-lg flex items-center justify-center gap-2 border border-[#0A66C2]/20"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full py-2 px-3 text-sm text-center font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 dark:bg-emerald-500/15 rounded-lg flex items-center justify-center gap-2 border border-emerald-500/30"
            >
              <Terminal className="w-4 h-4" />
              <span>Enter Terminal Mode (CLI)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2 px-3 text-sm text-center font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume / CV</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="w-full py-2 px-3 text-sm text-center font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 rounded-lg flex items-center justify-center gap-2 shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>Contact Sahil</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
