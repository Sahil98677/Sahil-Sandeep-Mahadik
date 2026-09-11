import React, { useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  BarChart3, 
  Terminal,
  ShieldAlert
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300/90 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 border-b border-zinc-300/80 dark:border-zinc-800/80 bg-zinc-200/70 dark:bg-zinc-950/40 relative">
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-5 right-5 p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-300/60 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-300/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-400/40 dark:border-zinc-700">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-indigo-100/90 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60">
                Featured Case Study
              </span>
            )}
          </div>

          <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {project.title}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-zinc-700 dark:text-zinc-400 font-medium">
            {project.tagline}
          </p>

          {project.metrics && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/40 border border-emerald-300/80 dark:border-emerald-800/60 text-xs font-semibold text-emerald-900 dark:text-emerald-300">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Impact: {project.metrics}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto bg-zinc-100 dark:bg-zinc-900">
          {/* Executive Summary */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Project Overview
            </h3>
            <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Architecture & Engineering Highlights */}
          {project.architectureDetails && project.architectureDetails.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Architecture & Engineering Decisions</span>
              </h3>
              <div className="space-y-2.5 bg-zinc-200/60 dark:bg-zinc-950/50 p-4 rounded-xl border border-zinc-300/80 dark:border-zinc-800/80">
                {project.architectureDetails.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-400">
                    <span className="font-mono text-zinc-500 dark:text-zinc-500 text-xs mt-0.5">0{idx + 1}.</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Core Capabilities & Features</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-zinc-200/50 dark:bg-zinc-800/40 border border-zinc-300/80 dark:border-zinc-800/60 flex items-start gap-2 text-xs text-zinc-800 dark:text-zinc-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2.5 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>Technologies Utilized</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-mono border border-zinc-300/80 dark:border-zinc-700/60 inline-block transition-transform duration-200 hover:scale-108 hover:-translate-y-0.5 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-zinc-300/80 dark:border-zinc-800/80 bg-zinc-200/70 dark:bg-zinc-950/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              >
                <span>Live Repository / Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg bg-zinc-200/90 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-medium flex items-center gap-1.5 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors border border-zinc-300/80 dark:border-zinc-700 cursor-pointer shadow-2xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
