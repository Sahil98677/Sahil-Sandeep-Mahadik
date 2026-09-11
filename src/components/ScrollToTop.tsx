import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show when scrolled past hero section (~350px or hero element height)
      const heroEl = document.getElementById('hero');
      const threshold = heroEl ? heroEl.offsetHeight * 0.7 : 350;
      
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility(); // Initial check
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      id="btn-scroll-to-top"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={`fixed bottom-6 right-6 z-40 p-2.5 sm:p-3 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-zinc-200/90 dark:border-zinc-800/90 shadow-sm hover:shadow-md backdrop-blur-md transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 cursor-pointer ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
    </button>
  );
};
