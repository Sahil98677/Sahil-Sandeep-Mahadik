import React, { useMemo } from 'react';
import { 
  Award, 
  GraduationCap, 
  ExternalLink, 
  ShieldCheck, 
  Network,
  Layers,
  Clock
} from 'lucide-react';
import { ProfileData, Certification, Education } from '../types';
import { FadeInSection } from './FadeInSection';

interface AboutProps {
  profile: ProfileData;
  certifications: Certification[];
  education: Education[];
  onOpenResume: () => void;
}

export const About: React.FC<AboutProps> = ({
  profile,
  certifications,
  education,
  onOpenResume,
}) => {
  // Calculate dynamic reading time based on narrative and credentials (~200 wpm)
  const readingTimeMinutes = useMemo(() => {
    const narrativeText = `
      I am a Security Architect at Crescent Technologies based in Mumbai, India, specializing in enterprise defense architecture, Zero Trust access frameworks, and Vulnerability Assessment & Penetration Testing (VAPT) across mission-critical API gateways and cloud assets.
      Previously, as a Network Engineer at Allied Global Pvt. Ltd. (Nov 2024 – Feb 2026), I managed 24/7 telemetry and incident response using PRTG/MRTG and configured Huawei switches, VLANs, ACLs, and routing protocols (OSPF, EIGRP, RIP)—giving me deep architectural insight across physical networking and application security.
      ${certifications.map(c => `${c.name} ${c.issuer}`).join(' ')}
      ${education.map(e => `${e.degree} ${e.institution}`).join(' ')}
    `;
    const words = narrativeText.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  }, [certifications, education]);

  return (
    <section id="about" className="py-12 md:py-16 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" delay={40} direction="up" distance={20}>
        
        {/* Narrative Section */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              About & Background
            </h2>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-200/70 dark:bg-zinc-900 px-2.5 py-1 rounded-full border border-zinc-300/80 dark:border-zinc-800 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>~{readingTimeMinutes} min read</span>
            </div>
          </div>

          <div className="w-full space-y-2.5 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
            <p>
              I am a <span className="font-semibold text-zinc-900 dark:text-zinc-100">Security Architect at Crescent Technologies</span> based in Mumbai, India, specializing in enterprise defense architecture, Zero Trust access frameworks, and Vulnerability Assessment & Penetration Testing (VAPT) across mission-critical API gateways and cloud assets.
            </p>
            <p>
              Previously, as a <span className="font-semibold text-zinc-900 dark:text-zinc-100">Network Engineer at Allied Global Pvt. Ltd.</span> (Nov 2024 – Feb 2026), I managed 24/7 telemetry and incident response using PRTG/MRTG and configured Huawei switches, VLANs, ACLs, and routing protocols (OSPF, EIGRP, RIP)—giving me deep architectural insight across physical networking and application security.
            </p>
          </div>

          {/* Core Domain Badges */}
          <div className="pt-1 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Zero Trust Architecture</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 shadow-2xs">
              <Network className="w-3.5 h-3.5 text-indigo-500" />
              <span>L1/L2 NOC Telemetry</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>VAPT & API Security</span>
            </span>
          </div>
        </div>

        {/* Certifications & Education Grid */}
        <div className="mt-12 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Certifications Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Certifications & Accreditations
                  </h3>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300/80 dark:border-zinc-700/80">
                  {certifications.length} Credentials
                </span>
              </div>

              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-xl bg-zinc-200/50 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 shadow-2xs flex items-start justify-between gap-3 transition-all duration-200 hover:border-zinc-400/90 dark:hover:border-zinc-700 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 hover:scale-[1.01] hover:shadow-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                          {cert.name}
                        </h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {cert.year}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        {cert.issuer}
                      </p>
                      {cert.credentialId && (
                        <div className="pt-1">
                          <span className="inline-block font-mono text-[10px] text-zinc-700 dark:text-zinc-400 bg-zinc-200/80 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-300/70 dark:border-zinc-700/60">
                            Credential ID: {cert.credentialId}
                          </span>
                        </div>
                      )}
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-300/50 dark:hover:bg-zinc-800 rounded-lg transition-transform duration-200 hover:scale-110 shrink-0"
                        title={`Verify ${cert.name} at ${cert.issuer}`}
                        aria-label={`Verify credential for ${cert.name}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    Academic Qualifications
                  </h3>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-300/80 dark:border-zinc-700/80">
                  {education.length} Programs
                </span>
              </div>

              <div className="space-y-3">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-4 rounded-xl bg-zinc-200/50 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 shadow-2xs flex items-start gap-3.5 transition-all duration-200 hover:border-zinc-400/90 dark:hover:border-zinc-700 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 hover:scale-[1.01] hover:shadow-xs"
                  >
                    {edu.logoUrl ? (
                      <div className={`shrink-0 rounded-xl border flex items-center justify-center overflow-hidden shadow-2xs ${
                        edu.id === 'edu-diploma-extc'
                          ? 'w-14 sm:w-16 h-14 sm:h-16 p-1.5 bg-black border-zinc-800 dark:border-zinc-700'
                          : 'w-14 sm:w-16 h-14 sm:h-16 p-1 bg-white border-zinc-200 dark:border-zinc-700'
                      }`}>
                        <img
                          src={edu.logoUrl}
                          alt={edu.institution}
                          className="w-full h-full object-contain object-center"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-200/80 dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700/80 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm leading-snug">
                          {edu.degree}
                        </h4>
                        {edu.score && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 font-bold shrink-0">
                            {edu.score}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                        {edu.institution}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                        Status: {edu.period}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </FadeInSection>
    </section>
  );
};

