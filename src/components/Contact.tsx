import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github,
  CheckCircle2
} from 'lucide-react';
import { ProfileData, ContactMessage } from '../types';
import { FadeInSection } from './FadeInSection';

interface ContactProps {
  profile: ProfileData;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    if (!profile.phone) return;
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: `msg-${Date.now()}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: 'General Inquiry',
        serviceInterest: 'Security & Architecture',
        message: formData.message.trim(),
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };

      try {
        const stored = localStorage.getItem('sahil_portfolio_messages');
        const parsed = stored ? JSON.parse(stored) : [];
        localStorage.setItem('sahil_portfolio_messages', JSON.stringify([newMessage, ...parsed]));
      } catch (err) {
        console.error('Failed to save message', err);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(false);
    setErrorMessage('');
  };

  return (
    <section id="contact" className="py-10 md:py-14 border-b border-zinc-200/80 dark:border-zinc-800/80">
      <FadeInSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" delay={40} direction="up" distance={20}>
        {/* Section Header */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Get in Touch
        </h2>
        <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
          Available for security architecture consulting, VAPT audits, and full-time opportunities.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          {/* Direct Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-5 rounded-xl bg-zinc-200/50 dark:bg-zinc-900/50 border border-zinc-300/80 dark:border-zinc-800/80 shadow-2xs space-y-3 hover:border-zinc-400/90 dark:hover:border-zinc-700 hover:scale-[1.015] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 ease-out">
              {/* Email */}
              <div>
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Email
                </span>
                <div className="flex items-center justify-between">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline truncate"
                  >
                    {profile.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer transition-transform duration-200 hover:scale-115"
                    title="Copy email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Phone */}
              {profile.phone && (
                <div className="pt-2 border-t border-zinc-300/60 dark:border-zinc-800/60">
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 block mb-1">
                    Phone
                  </span>
                  <div className="flex items-center justify-between">
                    <a
                      href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                      className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline"
                    >
                      {profile.phone}
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      className="p-1 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-pointer transition-transform duration-200 hover:scale-115"
                      title="Copy phone"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="pt-2 border-t border-zinc-300/60 dark:border-zinc-800/60 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {profile.socialLinks.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  id="contact-link-linkedin"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-semibold shadow-xs transition-all duration-200 hover:scale-103 hover:shadow-sm cursor-pointer"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                  <span>Connect on LinkedIn</span>
                </a>
              )}
              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  id="contact-link-github"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-zinc-200/70 hover:bg-zinc-300/70 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 border border-zinc-300/80 dark:border-zinc-800 shadow-2xs transition-all duration-200 hover:scale-103 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3">
            {isSubmitted ? (
              <div className="p-6 rounded-xl bg-zinc-200/50 dark:bg-emerald-950/30 border border-emerald-500/40 dark:border-emerald-800/80 text-center shadow-2xs">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                  Message Sent
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
                  Thank you for reaching out. Sahil will review your inquiry and respond shortly.
                </p>
                <button
                  onClick={resetForm}
                  className="mt-4 px-4 py-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-medium shadow-xs cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-zinc-200/50 dark:bg-zinc-900/50 border border-zinc-300/80 dark:border-zinc-800/80 shadow-2xs space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-rose-100/70 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800/80 text-xs text-rose-800 dark:text-rose-400">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 rounded-lg text-xs bg-zinc-100/90 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:bg-zinc-50 dark:focus:bg-zinc-950 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-3 py-2 rounded-lg text-xs bg-zinc-100/90 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:bg-zinc-50 dark:focus:bg-zinc-950 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, role, or discussion topic..."
                    className="w-full px-3 py-2 rounded-lg text-xs bg-zinc-100/90 dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none focus:bg-zinc-50 dark:focus:bg-zinc-950 focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-950 font-medium text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
};
