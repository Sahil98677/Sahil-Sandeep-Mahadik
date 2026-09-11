import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Partners } from './components/Partners';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ResumeModal } from './components/ResumeModal';
import { EditProfileModal } from './components/EditProfileModal';
import { TerminalMode } from './components/TerminalMode';
import { 
  initialProfile, 
  initialProjects,
  initialExperiences, 
  initialSkillCategories,
  initialCertifications, 
  initialEducation,
  initialSecurityPartners
} from './data/portfolioData';
import { ProfileData } from './types';

export default function App() {
  // Theme state - defaults to sleek dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sahil_portfolio_theme_v2');
    if (saved) return saved === 'dark';
    return true;
  });

  // Profile state with local storage persistence
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('sahil_portfolio_profile_v7');
      if (saved) return JSON.parse(saved);
      const v6 = localStorage.getItem('sahil_portfolio_profile_v6');
      if (v6) {
        const parsed = JSON.parse(v6);
        const migrated = {
          ...parsed,
          avatarUrl: initialProfile.avatarUrl,
        };
        localStorage.setItem('sahil_portfolio_profile_v7', JSON.stringify(migrated));
        return migrated;
      }
      return initialProfile;
    } catch {
      return initialProfile;
    }
  });

  // Modals state
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [editProfileOpen, setEditProfileOpen] = useState<boolean>(false);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Sync theme to document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sahil_portfolio_theme_v2', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sahil_portfolio_theme_v2', 'light');
    }
  }, [isDarkMode]);

  // Track active section for navigation highlighting
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'experience', 'projects', 'partners', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('sahil_portfolio_profile_v7', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save profile', err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-200/50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 selection:bg-indigo-500/20 selection:text-indigo-600 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-300 font-sans transition-colors duration-200">
      {/* Navigation */}
      <Navbar
        profile={profile}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onOpenResume={() => setResumeOpen(true)}
        onOpenEditProfile={() => setEditProfileOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <main id="main-content">
        <Hero
          profile={profile}
          onOpenResume={() => setResumeOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenEditProfile={() => setEditProfileOpen(true)}
        />

        <About
          profile={profile}
          certifications={initialCertifications}
          education={initialEducation}
          onOpenResume={() => setResumeOpen(true)}
        />

        <Experience
          experiences={initialExperiences}
        />

        <Projects
          projects={initialProjects}
        />

        <Partners
          partners={initialSecurityPartners}
        />

        <Contact
          profile={profile}
        />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Subtle Scroll to Top Button */}
      <ScrollToTop />

      {/* Interactive Terminal Mode (Retro Cyber CLI) */}
      <TerminalMode
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        profile={profile}
        projects={initialProjects}
        experiences={initialExperiences}
        certifications={initialCertifications}
        partners={initialSecurityPartners}
        education={initialEducation}
        skillCategories={initialSkillCategories}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Interactive Resume & CV Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profile}
        experiences={initialExperiences}
        certifications={initialCertifications}
        education={initialEducation}
        skillCategories={initialSkillCategories}
      />

      {/* Profile Customizer Modal */}
      <EditProfileModal
        isOpen={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
