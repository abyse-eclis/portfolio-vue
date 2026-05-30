import type { SharedProps } from './index';

export interface ProfilePortfolio {
    name: string | null;
    headline: string | null;
    bio: string | null;
    avatar_url: string | null;
    years_experience: number | null;
    resume_url: string | null;
}

export interface SkillItem {
    id: number;
    name: string;
    level: number;
    icon_url: string | null;
}

export interface SkillCategoryBlock {
    id: number;
    category: {
        id: number;
        slug: string;
        name: string | null;
        icon: string | null;
    };
    items: SkillItem[];
}

export interface ProjectCardData {
    id: number;
    slug: string;
    title: string | null;
    description: string | null;
    role?: string | null;
    type: string;
    thumbnail_url: string | null;
    cover_url?: string | null;
    url: string | null;
    repo_url?: string | null;
    tech_stack: string[];
    is_featured?: boolean;
    completed_at?: string | null;
}

export interface ProjectDetailData extends ProjectCardData {
    gallery: Array<{ url: string | null; alt: string }>;
}

export interface CertificateCardData {
    id: number;
    title: string | null;
    issuer: string;
    image_url: string | null;
    credential_url: string | null;
    issued_at: string | null;
    orientation: 'landscape' | 'portrait';
}

export interface TestimonialData {
    id: number;
    client_name: string;
    client_role: string | null;
    client_company: string | null;
    content: string | null;
    rating: number;
    avatar_url: string | null;
    project?: { id: number; slug: string; title: string | null } | null;
}

export interface PortfolioHomeProps {
    profile: ProfilePortfolio;
    skills: SkillCategoryBlock[];
    projects: ProjectCardData[];
    certificates: CertificateCardData[];
    filters: { tech: string | null; type: string | null };
}

export interface PortfolioProjectDetailProps {
    project: ProjectDetailData;
    testimonials: TestimonialData[];
}

export interface ProfileFreelance {
    name: string | null;
    tagline: string | null;
    bio: string | null;
    years_experience: number | null;
    avatar_url: string | null;
}

export interface PackageFeature {
    id: number;
    feature: string | null;
    included: boolean;
}

export interface PackageData {
    id: number;
    slug: string;
    name: string | null;
    tagline: string | null;
    description: string | null;
    price: number;
    currency: string;
    is_recommended: boolean;
    features: PackageFeature[];
}

export interface ProcessStepData {
    id: number;
    step_number: number;
    title: string | null;
    description: string | null;
    icon: string | null;
}

export interface FreelanceHomeProps {
    profile: ProfileFreelance;
    packages: PackageData[];
    selectedProjects: ProjectCardData[];
    testimonials: TestimonialData[];
    processSteps: ProcessStepData[];
}

export type { SharedProps };
