export interface Testimonial {
    name: string;
    role: string;
    quote: string;
}

export const testimonials: Testimonial[] = [
    {
        name: "Alex Chen",
        role: "CEO, TechStartup",
        quote: "We needed someone who could take a vague product brief and turn it into a working application. Harsh did exactly that, ahead of schedule, and the code quality was solid enough to build on.",
    },
    {
        name: "Sarah Mitchell",
        role: "Product Manager, SaaSCo",
        quote: "Most developers need hand-holding through the design phase. Harsh came with wireframes ready before our second call. His frontend work is pixel-perfect and his communication is clear.",
    },
    {
        name: "David Park",
        role: "CTO, DataFlow",
        quote: "Harsh handled our entire frontend rewrite while we focused on the backend migration. Zero handholding required. He flagged issues before they became problems and shipped clean code consistently.",
    },
    {
        name: "Priya Sharma",
        role: "Founder, DesignLab",
        quote: "Working with Harsh felt like having a technical co-founder for three months. He understood the product vision and made smart technical decisions without needing approval for every detail.",
    },
];
