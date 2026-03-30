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
    role: string;
}

export const projects: Project[] = [
    {
        slug: "udf-viewer",
        title: "UDF Viewer",
        description:
            "A lightweight web-based viewer for Universal Disk Format files. Parses and renders UDF file system structures directly in the browser with zero server-side processing.",
        liveUrl: undefined,
        repoUrl: undefined,
        source: "open",
        status: "in-dev",
        stack: ["TypeScript", "React", "Tailwind CSS", "Web APIs"],
        role: "Full-Stack Developer",
    },
    {
        slug: "auxy",
        title: "Auxy",
        description:
            "A unified social platform that brings all your social feeds into one place. Designed the complete product experience from research to final UI, focusing on seamless cross-platform content aggregation.",
        liveUrl: undefined,
        repoUrl: undefined,
        source: "closed",
        status: "in-dev",
        stack: ["Figma", "Product Design", "UI/UX", "Design Systems"],
        role: "Product Designer",
    },
    {
        slug: "opal-consulting",
        title: "Opal Consulting",
        description:
            "Corporate website for a visa and migration consulting agency. Built the Next.js frontend with WordPress CMS integration for blog content, along with full technical SEO optimization.",
        liveUrl: undefined,
        repoUrl: undefined,
        source: "closed",
        status: "online",
        stack: ["Next.js", "WordPress", "Tailwind CSS", "SEO"],
        role: "Frontend Developer",
    },
    {
        slug: "kleenestar",
        title: "Kleenestar",
        description:
            "AI-powered marketing analytics platform. Owned the entire frontend development and product design — from initial wireframes through to a production React application serving marketing teams.",
        liveUrl: undefined,
        repoUrl: "https://github.com/harshistaken/kleenestar",
        source: "open",
        status: "archived",
        stack: ["React", "TypeScript", "Tailwind CSS", "Figma", "REST APIs"],
        role: "Frontend Engineer & Designer",
    },
];
