import React, { useEffect, useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ExternalLink, 
  Mail, 
  MapPin, 
  Phone,
  Calendar,
  Globe, 
  CheckCircle2, 
  Copy, 
  Check,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Wrench,
  Award
} from 'lucide-react';
import { ProfileData, Experience, Certification, Education, SkillCategory } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  experiences: Experience[];
  certifications: Certification[];
  education: Education[];
  skillCategories: SkillCategory[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  experiences,
  certifications,
  education,
  skillCategories,
}) => {
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPlainText = () => {
    const text = `
SAHIL SANDEEP MAHADIK
• Mumbai • +91 8652671098 • mahadiksahil17@gmail.com
• www.linkedin.com/in/sahil-sandeep-mahadik-56b646166
• github.com/Sahil98677
• DOB - 31st DEC 2001

SUMMARY
Security Architect and IT Professional with deep experience in enterprise security architecture, network monitoring, infrastructure troubleshooting, and incident management. Skilled in Zero Trust architecture, VAPT, OWASP Top 10, API Security Testing, enterprise routing & switching, and SOC Operations.

PROFESSIONAL EXPERIENCE
Security Architect, Crescent Technologies, Mumbai, India (March 2026 – Current)
- Designed and enforced Zero Trust access control models and network micro-segmentation.
- Conducted VAPT and threat modeling across web applications and API endpoints.
- Developed automated detection playbooks and incident response protocols.
- Reviewed network changes and firewall policies to safeguard infrastructure integrity.

Network Engineer, Allied Global Pvt. Ltd., Mumbai, India (Nov 2024 – Feb 2026)
- Monitored multi-site network infrastructure using PRTG and MRTG to ensure continuous uptime.
- Provided L1/L2 incident resolution for packet loss, link flap, and connectivity faults.
- Coordinated with field engineers and telecom vendors to resolve outages within SLA.
- Configured VLANs, NAT, ACLs, and dynamic routing (OSPF, EIGRP, RIP) on Huawei switches.

EDUCATION
B.E. Electronics and Telecommunication Engineering
Mumbai University - Bharati Vidyapeeth College of Engineering, Navi Mumbai
• CGPA-6.63/10.

Diploma in Electronics and Telecommunication Engineering
Maharashtra state Board - Vidyalankar Polytechnic, Wadala
• 91.29%.

SKILLS
Cyber Security: VAPT, OWASP Top 10, API Security Testing, SOC Operations.
Networking: TCP/IP, OSI Model, Routing & Switching, VLAN, NAT, ACL Security.
Tools: Nmap, Burp Suite, Wireshark, Nuclei, Nessus.

CERTIFICATIONS
Certified Ethical Hacker (CEHv13) - Credential ID ECC4169783052
Certified API Hacking Junior (CAPIJ) - pGOF1lV6
Cybersecurity Program v5.0 - Credential ID TN47717
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Bar */}
        <div className="px-6 py-4 border-b border-zinc-300/80 dark:border-zinc-800/80 bg-zinc-200/80 dark:bg-zinc-950/60 flex items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-zinc-300/80 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-400/50 dark:border-zinc-700">
              Verified Curriculum Vitae
            </span>
            <span className="text-xs text-zinc-600 dark:text-zinc-400 hidden sm:inline">
              Official Resume Format
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPlainText}
              className="px-3 py-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-300 bg-zinc-200/90 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copiedText ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Plain Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              id="btn-print-cv"
              className="px-3.5 py-1.5 text-xs font-semibold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-100 rounded-lg hover:bg-zinc-800 dark:hover:bg-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-300/60 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-7 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-sans print:p-0 print:space-y-5 print:overflow-visible">
          {/* Header Block exactly matching resume */}
          <div className="text-center pb-6 border-b border-zinc-200 dark:border-zinc-800 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider uppercase text-zinc-950 dark:text-zinc-50">
              {profile.name}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              <span>• Mumbai</span>
              <span>•</span>
              <a 
                href={`tel:${profile.phone ? profile.phone.replace(/\s+/g, '') : '+918652671098'}`}
                className="hover:underline font-mono"
              >
                {profile.phone || '+91 8652671098'}
              </a>
              <span>•</span>
              <a 
                href={`mailto:${profile.email}`}
                className="hover:underline font-mono text-indigo-600 dark:text-indigo-400"
              >
                {profile.email}
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              {profile.socialLinks.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-indigo-600 dark:text-indigo-400 font-mono text-xs flex items-center gap-1"
                >
                  <span>• {profile.socialLinks.linkedin.replace('https://', '')}</span>
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
              )}
              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline text-indigo-600 dark:text-indigo-400 font-mono text-xs flex items-center gap-1"
                >
                  <span>• {profile.socialLinks.github.replace('https://', '')}</span>
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
              )}
              {profile.dob && (
                <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
                  • DOB - {profile.dob}
                </span>
              )}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 pb-1 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span>SUMMARY</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {profile.bio}
            </p>
          </div>

          {/* PROFESSIONAL EXPERIENCE */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 pb-1 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-500" />
              <span>PROFESSIONAL EXPERIENCE</span>
            </h2>
            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {exp.role}, <span className="font-semibold text-zinc-800 dark:text-zinc-200">{exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-zinc-500 font-medium">
                      ({exp.period})
                    </span>
                  </div>

                  <ul className="space-y-1.5 pl-1">
                    {exp.achievements.map((ach, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-2">
                        <span className="text-zinc-400 dark:text-zinc-500 font-bold">-</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-1 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">Stack: </span>
                    {exp.technologies.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EDUCATION */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 pb-1 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              <span>EDUCATION</span>
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-start gap-3 text-xs sm:text-sm">
                  {edu.logoUrl && (
                    <div className={`shrink-0 rounded border flex items-center justify-center overflow-hidden ${
                      edu.id === 'edu-diploma-extc'
                        ? 'w-16 h-10 p-1 bg-black border-zinc-800 dark:border-zinc-700'
                        : 'w-10 h-10 p-0.5 bg-white border-zinc-200/80 dark:border-zinc-700'
                    }`}>
                      <img src={edu.logoUrl} alt={edu.institution} className="w-full h-full object-contain object-center" />
                    </div>
                  )}
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="font-bold text-zinc-900 dark:text-zinc-100">
                      {edu.degree}
                    </div>
                    <div className="text-zinc-600 dark:text-zinc-400">
                      {edu.institution}
                    </div>
                    {edu.score && (
                      <div className="font-semibold text-zinc-800 dark:text-zinc-200 font-mono text-xs">
                        • {edu.score}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SKILLS */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 pb-1 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-indigo-500" />
              <span>SKILLS</span>
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                <span className="font-bold text-zinc-900 dark:text-zinc-100 sm:min-w-[140px]">
                  Cyber Security:
                </span>
                <span className="text-zinc-700 dark:text-zinc-300">
                  VAPT, OWASP Top 10, API Security Testing, SOC Operations.
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                <span className="font-bold text-zinc-900 dark:text-zinc-100 sm:min-w-[140px]">
                  Networking:
                </span>
                <span className="text-zinc-700 dark:text-zinc-300">
                  TCP/IP, OSI Model, Routing & Switching, VLAN, NAT, ACL Security.
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1">
                <span className="font-bold text-zinc-900 dark:text-zinc-100 sm:min-w-[140px]">
                  Tools:
                </span>
                <span className="text-zinc-700 dark:text-zinc-300 font-mono text-xs">
                  Nmap, Burp Suite, Wireshark, Nuclei, Nessus, PRTG, MRTG.
                </span>
              </div>
            </div>
          </div>

          {/* CERTIFICATIONS */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 pb-1 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-500" />
              <span>CERTIFICATIONS</span>
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">
                      {cert.name}
                    </span>
                    {cert.credentialId && (
                      <span className="ml-2 font-mono text-xs text-zinc-500">
                        - Credential ID <span className="text-indigo-600 dark:text-indigo-400">{cert.credentialId}</span>
                      </span>
                    )}
                  </div>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
