export const en = {
    nav: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        certificates: 'Certificates',
        packages: 'Packages',
        process: 'Process',
        testimonials: 'Testimonials',
        contact: 'Contact',
    },
    footer: {
        builtWith: 'Built with',
        allRights: 'All rights reserved.',
        nav: 'Navigation',
        connect: 'Connect',
    },
    button: {
        viewProject: 'View Project',
        viewAll: 'View All',
        contactMe: 'Contact Me',
        hireMe: 'Hire Me',
        sendMessage: 'Send Message',
        learnMore: 'Learn More',
        selectPackage: 'Choose This Package',
        viewCertificate: 'View Credential',
        viewRepo: 'View Repo',
        liveDemo: 'Live Demo',
        downloadResume: 'Download Resume',
        backToProjects: 'Back to Projects',
    },
    hero: {
        scrollDown: 'Scroll Down',
        availableForWork: 'Available for work',
        portfolioGreeting: "Hi, I'm",
        freelanceGreeting: 'Need a developer?',
    },
    about: {
        title: 'About Me',
        yearsExperience: 'Years of Experience',
        projectsDelivered: 'Projects Delivered',
        clientsHelped: 'Clients Helped',
    },
    sections: {
        skills: { eyebrow: 'What I do', title: 'Tech Stack & Skills' },
        projects: { eyebrow: 'Selected work', title: 'Projects' },
        certificates: { eyebrow: 'Verified', title: 'Certificates' },
        packages: { eyebrow: 'Pricing', title: 'Packages' },
        process: { eyebrow: 'How I work', title: 'My Process' },
        testimonials: { eyebrow: 'Trusted by', title: 'Client Feedback' },
        contact: { eyebrow: "Let's talk", title: 'Get in Touch' },
    },
    filter: {
        all: 'All',
        type: 'Type',
        tech: 'Tech',
        clear: 'Clear',
    },
    contact: {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent — I will reply soon.',
        intro: 'Have a project in mind? Drop me a message.',
        thankYouTitle: 'Thank you!',
        thankYouBody: 'Your message has been received. I will get back to you soon.',
        backHome: 'Back to home',
    },
    common: {
        loading: 'Loading...',
        readMore: 'Read more',
        featured: 'Featured',
        recommended: 'Recommended',
        included: 'Included',
        notIncluded: 'Not included',
        startingAt: 'Starting at',
        from: 'from',
        perProject: 'per project',
    },
};

type SectionMeta = { eyebrow: string; title: string };

export interface Messages {
    nav: {
        home: string; about: string; skills: string; projects: string;
        certificates: string; packages: string; process: string;
        testimonials: string; contact: string;
    };
    footer: { builtWith: string; allRights: string; nav: string; connect: string };
    button: {
        viewProject: string; viewAll: string; contactMe: string; hireMe: string;
        sendMessage: string; learnMore: string; selectPackage: string;
        viewCertificate: string; viewRepo: string; liveDemo: string;
        downloadResume: string; backToProjects: string;
    };
    hero: {
        scrollDown: string; availableForWork: string;
        portfolioGreeting: string; freelanceGreeting: string;
    };
    about: {
        title: string; yearsExperience: string;
        projectsDelivered: string; clientsHelped: string;
    };
    sections: {
        skills: SectionMeta; projects: SectionMeta; certificates: SectionMeta;
        packages: SectionMeta; process: SectionMeta; testimonials: SectionMeta;
        contact: SectionMeta;
    };
    filter: { all: string; type: string; tech: string; clear: string };
    contact: {
        name: string; email: string; phone: string; subject: string; message: string;
        submit: string; sending: string; success: string; intro: string;
        thankYouTitle: string; thankYouBody: string; backHome: string;
    };
    common: {
        loading: string; readMore: string; featured: string; recommended: string;
        included: string; notIncluded: string; startingAt: string;
        from: string; perProject: string;
    };
}
