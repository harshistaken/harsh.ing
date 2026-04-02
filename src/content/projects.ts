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
            "Web-based viewer for UYAP Data Format files used in Turkish legal and government systems. Handles XML parsing, file structure extraction, and in-browser rendering.",
        liveUrl: undefined,
        repoUrl: undefined,
        source: "open",
        status: "in-dev",
        stack: ["TypeScript", "React", "Tailwind CSS", "XML Parsing"],
    },
    {
        slug: "auxy",
        title: "Auxy",
        description:
            "A unified social platform that pulls all your feeds into one place. Designed the full product experience from research to final UI, bringing content from different platforms into one feed.",
        liveUrl: undefined,
        repoUrl: undefined,
        source: "closed",
        status: "in-dev",
        stack: ["Figma", "Product Design", "UI/UX", "Design Systems"],
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
];
