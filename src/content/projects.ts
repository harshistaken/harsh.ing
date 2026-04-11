export interface Project {
    slug: string;
    title: string;
    description: string;
    image?: string;
    liveUrl?: string;
    repoUrl?: string;
    source: "open" | "closed";
    status: "online" | "in-dev" | "archived";
    stack: string[];
}

export const projects: Project[] = [
    {
        slug: "udf-viewer",
        title: "UDF Viewer",
        description:
            "Web-based viewer for UYAP Data Format files used in Turkish legal and government systems. Replaces the government's desktop-only app with in-browser XML parsing, file structure extraction, and rendering.",
        liveUrl: undefined,
        repoUrl: undefined,
        source: "open",
        status: "in-dev",
        stack: ["TypeScript", "React", "Tailwind CSS", "XML Parsing"],
    },
    {
        slug: "opal-consulting",
        title: "Opal Consulting",
        description:
            "Corporate website for a visa and migration consulting agency. Built the Next.js frontend with WordPress CMS integration for blog content and handled the full technical SEO setup.",
        liveUrl: undefined,
        repoUrl: undefined,
        source: "closed",
        status: "online",
        stack: ["Next.js", "WordPress", "Tailwind CSS", "SEO"],
    },
    {
        slug: "kleenestar",
        title: "Kleenestar",
        description:
            "Marketing analytics platform with AI features. Owned the frontend development and product design, from initial wireframes to a production React app used by marketing teams.",
        liveUrl: undefined,
        repoUrl: undefined,
        source: "closed",
        status: "archived",
        stack: ["React", "TypeScript", "Tailwind CSS", "Figma", "REST APIs"],
    },
    {
        slug: "codesnippify",
        title: "Codesnippify",
        description:
            "Full-stack code snippet manager with authentication, Shiki.js syntax highlighting, folder organization, dark/light theming, and public sharing via unique links.",
        liveUrl: undefined,
        repoUrl: undefined,
        source: "open",
        status: "archived",
        stack: ["Next.js", "TypeScript", "Shiki.js", "Authentication"],
    },
    {
        slug: "qrestro",
        title: "QRestro",
        description:
            "SaaS platform for restaurant digitization — QR-based menus, real-time order management, and integrated payment processing via Razorpay.",
        liveUrl: undefined,
        repoUrl: undefined,
        source: "closed",
        status: "in-dev",
        stack: ["Next.js", "TypeScript", "Drizzle ORM", "PostgreSQL", "NextAuth.js", "Razorpay", "WebSockets"],
    },
];
