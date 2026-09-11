import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';
import { ProfileData } from '../types';
import { FadeInSection } from './FadeInSection';

interface FooterProps {
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-8 md:py-10 bg-zinc-200/60 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400">
      <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" delay={20} direction="up" distance={16}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-5 border-b border-zinc-300/80 dark:border-zinc-800/80">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              {profile.name}
            </span>
            <span className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
              {profile.title}
            </span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            {profile.socialLinks.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-300/60 dark:hover:bg-zinc-900 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile.socialLinks.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-300/60 dark:hover:bg-zinc-900 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-300/60 dark:hover:bg-zinc-900 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              id="btn-back-to-top"
              aria-label="Back to top"
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-300/60 dark:hover:bg-zinc-900 transition-colors ml-2 cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 dark:text-zinc-500">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Clean Architecture • Fast • Accessible</span>
          </div>
        </div>
      </FadeInSection>
    </footer>
  );
};
