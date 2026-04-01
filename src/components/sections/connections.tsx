"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, Linkedin01Icon, NewTwitterIcon, Mail01Icon, Calendar01Icon } from "@hugeicons/core-free-icons";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Node Data ─── */

const NODES = [
    { id: "github", label: "github", href: "https://github.com/harshistaken", icon: GithubIcon, x: 15, y: 30 },
    { id: "linkedin", label: "linkedin", href: "https://linkedin.com/in/harshistaken", icon: Linkedin01Icon, x: 42, y: 72 },
    { id: "x", label: "x / twitter", href: "https://x.com/justharshbtw", icon: NewTwitterIcon, x: 70, y: 25 },
    { id: "mail", label: "mail", href: "mailto:harshyadav.build@gmail.com", icon: Mail01Icon, x: 30, y: 55 },
    { id: "cal", label: "cal.com", href: "https://cal.com/harshistaken", icon: Calendar01Icon, x: 78, y: 65 },
] as const;

/* Edges between nodes (index pairs) */
const EDGES: [number, number][] = [
    [0, 3], [0, 2], [1, 3], [1, 4], [2, 4], [3, 4], [0, 1],
];

/* ─── Constellation Canvas ─── */

function SignalBoard() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mouse, setMouse] = useState({ x: 50, y: 50 });
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [hasMounted, setHasMounted] = useState(false);
    const rafRef = useRef<number>(0);
    const mouseRef = useRef({ x: 50, y: 50 });

    useEffect(() => {
        setHasMounted(true);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mouseRef.current = { x, y };

        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            setMouse({ x, y });
        });
    }, []);

    /* Distance from mouse to a point (in % coords) */
    const distTo = (px: number, py: number) => {
        const dx = mouse.x - px;
        const dy = mouse.y - py;
        return Math.sqrt(dx * dx + dy * dy);
    };

    return (
        <div
            ref={containerRef}
            className="relative h-[340px] w-full min-[480px]:h-[380px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                setMouse({ x: 50, y: 50 });
                setHoveredNode(null);
            }}
        >
            {/* SVG edges */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
                {EDGES.map(([a, b], i) => {
                    const na = NODES[a];
                    const nb = NODES[b];
                    const midX = (na.x + nb.x) / 2;
                    const midY = (na.y + nb.y) / 2;
                    const d = distTo(midX, midY);
                    const glow = hasMounted ? Math.max(0, 1 - d / 50) : 0;

                    return (
                        <line
                            key={`e-${i}`}
                            x1={`${na.x}%`}
                            y1={`${na.y}%`}
                            x2={`${nb.x}%`}
                            y2={`${nb.y}%`}
                            stroke="var(--accent-primary)"
                            strokeWidth="1"
                            strokeDasharray="4 6"
                            style={{
                                opacity: 0.08 + glow * 0.25,
                                transition: "opacity 0.3s ease-out",
                            }}
                        />
                    );
                })}
            </svg>

            {/* Nodes */}
            {NODES.map((node, i) => {
                const d = distTo(node.x, node.y);
                const isClose = hasMounted && d < 25;
                const isHovered = hoveredNode === node.id;
                const scale = isHovered ? 1.15 : isClose ? 1.05 : 1;
                const glowOpacity = isHovered ? 0.15 : isClose ? 0.06 : 0;

                return (
                    <motion.div
                        key={node.id}
                        className="absolute"
                        style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease }}
                    >
                        {/* Glow ring */}
                        <div
                            className="absolute inset-0 -m-4 rounded-full bg-accent-primary"
                            style={{
                                opacity: glowOpacity,
                                transform: `scale(${scale * 1.8})`,
                                transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
                                filter: "blur(12px)",
                            }}
                        />

                        {/* Node button */}
                        <a
                            href={node.href}
                            target={node.id === "mail" ? undefined : "_blank"}
                            rel={node.id === "mail" ? undefined : "noopener noreferrer"}
                            className="relative flex h-12 w-12 items-center justify-center border border-border-default bg-bg-secondary transition-all duration-300 hover:border-accent-primary min-[480px]:h-14 min-[480px]:w-14"
                            style={{
                                transform: `scale(${scale})`,
                                transition: "transform 0.3s ease-out, border-color 0.3s ease-out",
                            }}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                        >
                            <HugeiconsIcon
                                icon={node.icon}
                                size={20}
                                className={`transition-colors duration-300 ${isHovered ? "text-accent-primary" : "text-text-secondary"}`}
                            />
                        </a>

                        {/* Label — visible on hover */}
                        <div
                            className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap font-fragment text-[10px] text-text-tertiary transition-all duration-200"
                            style={{
                                opacity: isHovered ? 1 : 0,
                                transform: `translate(-50%, ${isHovered ? 0 : -4}px)`,
                            }}
                        >
                            {node.label}
                        </div>
                    </motion.div>
                );
            })}

            {/* Ambient particles — small dots that drift */}
            {hasMounted &&
                [
                    { x: 55, y: 48 },
                    { x: 25, y: 42 },
                    { x: 85, y: 45 },
                    { x: 50, y: 18 },
                    { x: 60, y: 80 },
                    { x: 10, y: 65 },
                    { x: 90, y: 30 },
                ].map((p, i) => {
                    const d = distTo(p.x, p.y);
                    const brightness = Math.max(0.05, 0.3 - d / 120);
                    return (
                        <div
                            key={`p-${i}`}
                            className="pointer-events-none absolute h-[2px] w-[2px] rounded-full bg-accent-primary"
                            style={{
                                left: `${p.x}%`,
                                top: `${p.y}%`,
                                opacity: brightness,
                                transition: "opacity 0.5s ease-out",
                            }}
                        />
                    );
                })}
        </div>
    );
}

/* ─── Mobile Layout — clean fallback ─── */

function MobileConnections() {
    return (
        <div className="flex flex-wrap justify-center gap-3">
            {NODES.map((node, i) => (
                <motion.a
                    key={node.id}
                    href={node.href}
                    target={node.id === "mail" ? undefined : "_blank"}
                    rel={node.id === "mail" ? undefined : "noopener noreferrer"}
                    className="flex flex-col items-center gap-2 border border-border-default bg-bg-secondary p-4 transition-colors duration-200 hover:border-accent-primary"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06, ease }}
                >
                    <HugeiconsIcon icon={node.icon} size={20} className="text-text-secondary" />
                    <span className="font-fragment text-[10px] text-text-tertiary">{node.label}</span>
                </motion.a>
            ))}
        </div>
    );
}

/* ─── Connections Section ─── */

export function Connections() {
    const sectionRef = useRef<HTMLElement>(null);
    const inView = useInView(sectionRef, { once: true, margin: "-40px" });

    return (
        <section ref={sectionRef} className="mt-24">
            <motion.h2
                className="font-micro text-[40px] leading-none text-text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease }}
            >
                CONNECTIONS
            </motion.h2>

            <p className="mt-3 font-fragment text-[13px] text-text-tertiary">
                hover the constellation. find a signal.
            </p>

            {/* Desktop: signal board */}
            <div className="mt-6 hidden min-[480px]:block">
                <SignalBoard />
            </div>

            {/* Mobile: grid fallback */}
            <div className="mt-6 block min-[480px]:hidden">
                <MobileConnections />
            </div>

            {/* CTA line */}
            <motion.p
                className="mt-4 font-fragment text-sm text-text-secondary"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6, ease }}
            >
                say hi or book a call on{" "}
                <a
                    href="https://cal.com/harshistaken"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-primary underline-offset-2 transition-colors hover:text-accent-primary-hover hover:underline"
                >
                    cal.com ↗
                </a>
            </motion.p>
        </section>
    );
}
