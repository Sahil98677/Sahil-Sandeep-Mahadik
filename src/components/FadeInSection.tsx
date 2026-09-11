import React, { useEffect, useRef, useState } from 'react';

export interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: 'sm' | 'md' | 'lg' | number; // Travel distance
  duration?: 'fast' | 'normal' | 'slow' | number; // Transition duration in ms
  threshold?: number; // IntersectionObserver threshold (0 to 1)
  rootMargin?: string; // Viewport margin for trigger point
  once?: boolean; // Trigger only once or reset on scroll out
  as?: React.ElementType; // Container element tag name (div, section, article, etc.)
  id?: string;
}

/**
 * FadeInSection
 * Subtle, high-performance scroll fade-in and slide entrance animation
 * powered by Tailwind CSS utility transitions and IntersectionObserver.
 */
export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 'md',
  duration = 'normal',
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  once = true,
  as: Component = 'div',
  id,
}) => {
  const domRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if prefers-reduced-motion is active
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const element = domRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  // Direction transform Tailwind classes
  const getDirectionClasses = () => {
    if (direction === 'none') return '';
    
    // Distance offsets
    if (direction === 'up') {
      if (distance === 'sm') return isVisible ? 'translate-y-0' : 'translate-y-3';
      if (distance === 'lg') return isVisible ? 'translate-y-0' : 'translate-y-8';
      return isVisible ? 'translate-y-0' : 'translate-y-6';
    }
    if (direction === 'down') {
      if (distance === 'sm') return isVisible ? 'translate-y-0' : '-translate-y-3';
      if (distance === 'lg') return isVisible ? 'translate-y-0' : '-translate-y-8';
      return isVisible ? 'translate-y-0' : '-translate-y-6';
    }
    if (direction === 'left') {
      if (distance === 'sm') return isVisible ? 'translate-x-0' : 'translate-x-3';
      if (distance === 'lg') return isVisible ? 'translate-x-0' : 'translate-x-8';
      return isVisible ? 'translate-x-0' : 'translate-x-6';
    }
    if (direction === 'right') {
      if (distance === 'sm') return isVisible ? 'translate-x-0' : '-translate-x-3';
      if (distance === 'lg') return isVisible ? 'translate-x-0' : '-translate-x-8';
      return isVisible ? 'translate-x-0' : '-translate-x-6';
    }
    return '';
  };

  // Duration Tailwind classes
  const getDurationClass = () => {
    if (duration === 'fast') return 'duration-400';
    if (duration === 'slow') return 'duration-1000';
    if (typeof duration === 'number') return '';
    return 'duration-700';
  };

  // Custom inline style for precise millisecond duration or delay if specified as numbers
  const customStyles: React.CSSProperties = {
    ...(delay > 0 ? { transitionDelay: `${delay}ms` } : {}),
    ...(typeof duration === 'number' ? { transitionDuration: `${duration}ms` } : {}),
  };

  return (
    <Component
      ref={domRef}
      id={id}
      style={customStyles}
      className={`
        transform transition-all ease-out will-change-[opacity,transform]
        motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:translate-x-0
        ${getDurationClass()}
        ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.99]'}
        ${getDirectionClasses()}
        ${className}
      `.trim()}
    >
      {children}
    </Component>
  );
};
