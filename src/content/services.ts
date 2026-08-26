export interface Service {
    number: string;
    title: string;
    description: string;
    includes: string[];
}

export const services: Service[] = [
    {
        number: "01",
        title: "DESIGN + BUILD",
        description:
            "Blank page to production. Flows, wireframes, the interface, then the code that ships it. One person across both halves, so nothing gets lost in the handoff.",
        includes: [
            "Product and UI design in Figma",
            "Next.js and React front ends",
            "APIs and data models when the product needs them",
            "Performance, Core Web Vitals and technical SEO",
            "Deployment and CI/CD setup",
        ],
    },
    {
        number: "02",
        title: "DESIGN SYSTEMS",
        description:
            "Tokens, components and themes that survive contact with production. Authored in Figma, wired into the codebase, and generated rather than hand maintained.",
        includes: [
            "Token architecture, theming and density",
            "Component libraries with real variant coverage",
            "Figma to code pipelines with verification",
            "Contrast budgets and accessibility to AA",
            "Documented usage rules teams actually follow",
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
