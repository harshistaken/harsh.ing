export interface Testimonial {
    name: string;
    role: string;
    quote: string;
}

export const testimonials: Testimonial[] = [
    {
        name: "Seymen Ozcelik",
        role: "Co-founder, Hammurabi AI",
        quote: "Harsh doesn't need to be told what to do. He sees the problem, thinks it through, and ships it. We never had to micromanage him once.",
    },
    {
        name: "Murat Can Korkmaz",
        role: "Co-founder, Hammurabi AI",
        quote: "He picked up our entire frontend alone and ran with it. Deadlines were always met, communication was always clear. Exactly the kind of person you want on your team.",
    },
    {
        name: "Prabal",
        role: "Owner, Qognition Agency",
        quote: "Gave him the brief, got back a finished product. No back and forth, no missed deadlines. Just solid work delivered on time.",
    },
    {
        name: "Carl Dimik",
        role: "Founder, Kleenestar",
        quote: "Harsh handled both the design and the code. He brought ideas to the table without being asked and the final product was better because of it.",
    },
    {
        name: "Manish",
        role: "Backend Engineer, Hammurabi AI",
        quote: "Really easy to work with. He gets context fast, doesn't block you with questions, and always delivers what he says he will. Good teammate.",
    },
];
