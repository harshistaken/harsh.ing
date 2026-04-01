export interface Service {
    number: string;
    title: string;
    description: string;
    includes: string[];
}

export const services: Service[] = [
    {
        number: "01",
        title: "CUSTOM DEVELOPMENT",
        description:
            "From landing pages to full-stack applications. You bring the idea, I write the code that ships it.",
        includes: [
            "Next.js / React applications",
            "API design and integration",
            "Database architecture",
            "Performance optimization",
            "Deployment and CI/CD setup",
        ],
    },
    {
        number: "02",
        title: "SEO + WEB PRESENCE",
        description:
            "Technical SEO that actually moves the needle. No fluff, no keyword stuffing, just structured data and fast pages.",
        includes: [
            "Technical SEO audits",
            "Core Web Vitals optimization",
            "Structured data / schema markup",
            "Analytics and tracking setup",
            "Content strategy guidance",
        ],
    },
    {
        number: "03",
        title: "CONTRACT HIRE",
        description:
            "Embed me in your team for a sprint or a quarter. I plug into your workflow, your stack, your codebase.",
        includes: [
            "Part-time or full-time availability",
            "Async-first communication",
            "Your tools, your process",
            "Weekly progress reports",
            "Flexible contract terms",
        ],
    },
];
