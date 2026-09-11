export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email: string;
  website?: string;
}

export interface MetricItem {
  label: string;
  value: string;
  subtext?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  location: string;
  phone?: string;
  dob?: string;
  availability: string;
  email: string;
  avatarUrl?: string;
  socialLinks: SocialLinks;
  metrics: MetricItem[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Cyber Security & VAPT' | 'Network Architecture' | 'SOC & Monitoring' | 'API Security' | string;
  description: string;
  fullDescription: string;
  architectureDetails: string[];
  keyFeatures: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: string;
  colorGradient?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote' | 'Internship' | 'Part-time';
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 1 to 100
  featured?: boolean;
  category: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  credentialUrl?: string;
  iconName?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score?: string;
  logoUrl?: string;
  highlights?: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  serviceInterest: string;
  message: string;
  createdAt: string;
}

export interface SecurityPartner {
  id: string;
  name: string;
  logoDark?: string;
  logoLight?: string;
  tagline: string;
  industry: string;
  productFocus: string;
  products?: { name: string; description: string }[];
  engagementType: 'Technical Collaboration' | 'Solution Evaluation' | 'VAPT Audit' | 'Architecture Review' | 'Security Advisory' | 'Product Integration' | 'Proof of Concept' | 'Professional Connection';
  badge: string;
  description: string;
  connectionContext?: string;
  keyDeliverables: string[];
  metrics?: string;
  website?: string;
  featured?: boolean;
}
