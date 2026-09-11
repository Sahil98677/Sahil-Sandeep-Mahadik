import React, { useState } from 'react';
import { 
  Shield, 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight,
  Cpu,
  Lock,
  Layers
} from 'lucide-react';
import { SecurityPartner } from '../types';
import { FadeInSection } from './FadeInSection';

interface PartnersProps {
  partners: SecurityPartner[];
}

type PartnerFilter = 'All' | 'Autonomous AI SecOps' | 'Privileged Access (PAM)';

export const Partners: React.FC<PartnersProps> = ({ partners }) => {
  const [activeFilter, setActiveFilter] = useState<PartnerFilter>('All');

  const scrollToContact = (companyName: string) => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredPartners = partners.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Autonomous AI SecOps') return p.id.includes('cycraft');
    if (activeFilter === 'Privileged Access (PAM)') return p.id.includes('wallix');
    return true;
  });

  return (
    <section id="partners" className="py-10 md:py-14 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" delay={40} direction="up" distance={20}>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 dark:text-zinc-400">
              Professional Network & Collaborations
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Industry Connections & Enterprise Solutions
            </h2>
            <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Enterprise cybersecurity platforms connected through previous professional networks, solution evaluations, and collaborative industry engagements.
            </p>
          </div>

          {/* Quick Domain Filters */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Connection categories">
            <button
              onClick={() => setActiveFilter('All')}
              role="tab"
              aria-selected={activeFilter === 'All'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeFilter === 'All'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs font-semibold'
                  : 'bg-zinc-200/70 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 border border-zinc-300/80 dark:border-zinc-800/60 shadow-2xs'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Connections ({partners.length})</span>
            </button>
            <button
              onClick={() => setActiveFilter('Autonomous AI SecOps')}
              role="tab"
              aria-selected={activeFilter === 'Autonomous AI SecOps'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeFilter === 'Autonomous AI SecOps'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs font-semibold'
                  : 'bg-zinc-200/70 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 border border-zinc-300/80 dark:border-zinc-800/60 shadow-2xs'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>CyCraft (AI SecOps & Red Teaming)</span>
            </button>
            <button
              onClick={() => setActiveFilter('Privileged Access (PAM)')}
              role="tab"
              aria-selected={activeFilter === 'Privileged Access (PAM)'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeFilter === 'Privileged Access (PAM)'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs font-semibold'
                  : 'bg-zinc-200/70 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 border border-zinc-300/80 dark:border-zinc-800/60 shadow-2xs'
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-indigo-700 dark:text-indigo-400" />
              <span>WALLIX (PAM & Zero Trust)</span>
            </button>
          </div>
        </div>

        {/* Partners Grid - Balanced 2-Column Presentation */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPartners.map((partner, idx) => (
            <FadeInSection
              key={partner.id}
              delay={idx * 100}
              direction="up"
              distance={16}
              className="p-5 sm:p-6 rounded-2xl bg-zinc-200/50 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800/90 hover:border-zinc-400/90 dark:hover:border-zinc-700 hover:bg-zinc-200/70 dark:hover:bg-zinc-900/80 hover:scale-[1.015] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 ease-out flex flex-col justify-between"
            >
              <div>
                {/* Header Meta Bar */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-md bg-zinc-200/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-300/70 dark:border-zinc-700/70 inline-block transition-transform duration-200 hover:scale-105">
                      {partner.badge}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
                      Industry Connection
                    </span>
                  </div>

                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                      title={`Visit ${partner.name} portal`}
                    >
                      <span>Visit site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Company Title & Brand Logo */}
                <div className="mt-3.5 flex items-center gap-3">
                  {partner.logoDark && partner.logoLight ? (
                    <div className="h-10 px-3 py-1.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800/90 border border-zinc-300/80 dark:border-zinc-700/80 flex items-center justify-center shrink-0 shadow-2xs transition-transform duration-200 hover:scale-105">
                      <img
                        src={partner.logoDark}
                        alt={`${partner.name} logo`}
                        className="h-5.5 sm:h-6 w-auto max-w-[130px] object-contain dark:hidden"
                        loading="lazy"
                      />
                      <img
                        src={partner.logoLight}
                        alt={`${partner.name} logo`}
                        className="h-5.5 sm:h-6 w-auto max-w-[130px] object-contain hidden dark:block"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {partner.name}
                  </h3>
                </div>

                {/* Brief Summary */}
                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {partner.description}
                </p>

                {/* Solution Suite as Clean Inline Tags */}
                {partner.products && partner.products.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mr-1">
                      Solutions:
                    </span>
                    {partner.products.map((prod, pIdx) => (
                      <span
                        key={pIdx}
                        title={prod.description}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60 hover:border-zinc-400 dark:hover:border-zinc-600 inline-block transition-all duration-200 ease-out hover:scale-108 hover:-translate-y-0.5 cursor-default"
                      >
                        {prod.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Focused Technical Deliverables */}
                <div className="mt-3.5 space-y-1.5">
                  {partner.keyDeliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
                {partner.metrics ? (
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                    ⚡ {partner.metrics}
                  </span>
                ) : (
                  <span />
                )}

                <button
                  onClick={() => scrollToContact(partner.name)}
                  className="text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Discuss Architecture</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </FadeInSection>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
};

