import React from 'react';
import { ShieldCheck, Network, Wrench } from 'lucide-react';
import { SkillCategory } from '../types';
import { FadeInSection } from './FadeInSection';

interface SkillsProps {
  categories: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ categories }) => {
  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('cyber') || category.toLowerCase().includes('security')) {
      return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
    }
    if (category.toLowerCase().includes('network')) {
      return <Network className="w-4 h-4 text-indigo-500" />;
    }
    return <Wrench className="w-4 h-4 text-amber-500" />;
  };

  return (
    <section id="skills" className="py-10 md:py-14 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" delay={40} direction="up" distance={20}>
        {/* Section Header */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Skills & Technical Expertise
        </h2>

        {/* Categories */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <FadeInSection
              key={cat.category}
              delay={idx * 80}
              direction="up"
              distance={16}
              className="p-5 rounded-xl bg-zinc-200/50 dark:bg-zinc-900/50 border border-zinc-300/80 dark:border-zinc-800/80 shadow-2xs hover:border-zinc-400/90 dark:hover:border-zinc-700 hover:bg-zinc-200/70 dark:hover:bg-zinc-900/80 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-out"
            >
              <div className="flex items-center gap-2 mb-3">
                {getCategoryIcon(cat.category)}
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  {cat.category}
                </h3>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`text-xs font-medium px-2.5 py-1 rounded-md border inline-block transition-all duration-200 ease-out hover:scale-108 hover:-translate-y-0.5 hover:shadow-xs cursor-default ${
                      skill.featured
                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 dark:border-zinc-100 font-semibold hover:bg-zinc-800 dark:hover:bg-white'
                        : 'bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border-zinc-300/80 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-300/70 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </FadeInSection>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
};

