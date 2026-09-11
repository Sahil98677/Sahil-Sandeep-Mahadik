import React, { useState, useMemo } from 'react';
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Network, 
  Code2, 
  Layers,
  Sparkles
} from 'lucide-react';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { FadeInSection } from './FadeInSection';

export type ProjectCategory = 'All' | 'Security' | 'Architecture' | 'Development';

interface CategoryFilterProps {
  categories: {
    id: ProjectCategory;
    label: string;
    icon: React.FC<{ className?: string }>;
    count: number;
  }[];
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Project categories">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            id={`filter-btn-${cat.id.toLowerCase()}`}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory(cat.id)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              isSelected
                ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs ring-1 ring-zinc-900/10 dark:ring-white/10 font-semibold'
                : 'bg-zinc-200/70 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-300/70 dark:hover:bg-zinc-800/80 border border-zinc-300/80 dark:border-zinc-800/60 shadow-2xs'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white dark:text-zinc-950' : 'text-zinc-600 dark:text-zinc-400'}`} />
            <span>{cat.label}</span>
            <span
              className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                isSelected
                  ? 'bg-zinc-700 text-zinc-100 dark:bg-zinc-300 dark:text-zinc-900 font-bold'
                  : 'bg-zinc-300/70 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-300 dark:border-transparent'
              }`}
            >
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

interface ProjectsProps {
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Category counts and configurations
  const categoryConfigs = useMemo(() => {
    const counts = {
      All: projects.length,
      Security: projects.filter((p) => p.category === 'Security').length,
      Architecture: projects.filter((p) => p.category === 'Architecture').length,
      Development: projects.filter((p) => p.category === 'Development').length,
    };

    return [
      { id: 'All' as ProjectCategory, label: 'All Projects', icon: Layers, count: counts.All },
      { id: 'Security' as ProjectCategory, label: 'Security', icon: ShieldCheck, count: counts.Security },
      { id: 'Architecture' as ProjectCategory, label: 'Architecture', icon: Network, count: counts.Architecture },
      { id: 'Development' as ProjectCategory, label: 'Development', icon: Code2, count: counts.Development },
    ];
  }, [projects]);

  // Filtered project list
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  const categoryDescriptions: Record<ProjectCategory, string> = {
    All: 'Architectural case studies, threat intelligence labs, network routing topologies, and security automation software.',
    Security: 'Offensive and defensive cybersecurity testing, OWASP API Top 10 assessments, and deep packet forensics.',
    Architecture: 'Enterprise network routing, multi-protocol core topology design, and continuous infrastructure telemetry.',
    Development: 'Custom Python/Bash automation pipelines, vulnerability triage CLI tools, and real-time observability dashboards.',
  };

  return (
    <section id="projects" className="py-10 md:py-14 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" delay={40} direction="up" distance={20}>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 dark:text-zinc-400">
              Technical Labs & Implementations
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Selected Projects & Case Studies
            </h2>
            <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {categoryDescriptions[selectedCategory]}
            </p>
          </div>

          {/* Category Filter Component */}
          <CategoryFilter
            categories={categoryConfigs}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Projects Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <FadeInSection
              key={project.id}
              delay={(idx % 3) * 80}
              direction="up"
              distance={16}
              className="p-5 rounded-xl bg-zinc-200/50 dark:bg-zinc-900/50 border border-zinc-300/80 dark:border-zinc-800/80 shadow-2xs hover:border-zinc-400/90 dark:hover:border-zinc-700 hover:bg-zinc-200/80 dark:hover:bg-zinc-900/80 hover:shadow-md hover:scale-[1.025] hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between cursor-pointer group"
              onClick={() => setActiveProject(project)}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 font-medium border border-zinc-300/80 dark:border-zinc-700/60 transition-transform duration-200 hover:scale-105 inline-block">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 transition-transform duration-200 hover:scale-105">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-base font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>

                <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  {project.tagline}
                </p>

                <p className="mt-2.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {project.metrics && (
                  <div className="mt-3 text-[11px] font-mono text-emerald-800 dark:text-emerald-400 bg-emerald-500/15 dark:bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-600/30 dark:border-emerald-800/40 transition-transform duration-200 hover:scale-[1.02]">
                    ⚡ {project.metrics}
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-300/60 dark:border-zinc-800/60">
                <div className="flex flex-wrap gap-1.5 mb-3" onClick={(e) => e.stopPropagation()}>
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 border border-zinc-300/80 dark:border-zinc-700 inline-block transition-transform duration-200 ease-out hover:scale-110 hover:-translate-y-0.5 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 text-zinc-500 dark:text-zinc-500">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProject(project);
                    }}
                    className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:underline flex items-center gap-1 cursor-pointer group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                  >
                    <span>View Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {/* Empty state safeguard */}
        {filteredProjects.length === 0 && (
          <div className="mt-12 text-center py-12 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              No projects found in this category.
            </p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="mt-3 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              Show All Projects
            </button>
          </div>
        )}
      </FadeInSection>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
};
