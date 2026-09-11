import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Experience as ExperienceType } from '../types';
import { FadeInSection } from './FadeInSection';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  return (
    <section id="experience" className="py-10 md:py-14 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" delay={40} direction="up" distance={20}>
        {/* Section Header */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Professional Experience
        </h2>

        {/* Timeline List */}
        <div className="mt-6 space-y-5">
          {experiences.map((exp, idx) => {
            const isCurrent = exp.period.toLowerCase().includes('current') || exp.period.toLowerCase().includes('present');
            return (
              <FadeInSection
                key={exp.id}
                delay={idx * 120}
                direction="up"
                distance={18}
                className="p-6 rounded-xl bg-zinc-200/50 dark:bg-zinc-900/50 border border-zinc-300/80 dark:border-zinc-800/80 shadow-2xs hover:border-zinc-400/90 dark:hover:border-zinc-700 hover:bg-zinc-200/70 dark:hover:bg-zinc-900/70 hover:scale-[1.015] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 ease-out"
              >
                {/* Role and Company */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {exp.role}
                    </h3>
                    <span className="text-zinc-400">·</span>
                    <span className="text-base font-medium text-zinc-700 dark:text-zinc-300">
                      {exp.company}
                    </span>
                    {isCurrent && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-600/30 dark:border-emerald-800/60 ml-1 transition-transform duration-200 hover:scale-105 inline-block">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400">
                    {exp.period} • {exp.location}
                  </div>
                </div>

                {/* Bullets */}
                <ul className="mt-4 space-y-2">
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 mt-2 flex-shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="mt-4 pt-3 border-t border-zinc-300/60 dark:border-zinc-800/60 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300/70 dark:border-zinc-700/60 inline-block transition-transform duration-200 ease-out hover:scale-108 hover:-translate-y-0.5 hover:text-zinc-950 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </FadeInSection>
    </section>
  );
};
