"use client";

import { useRef, useState, useEffect, useCallback, type ComponentType, type SVGProps } from "react";
import { m as motion } from "framer-motion";
import { useTheme } from "next-themes";
import { GitHubDark, GitHubLight, LinkedIn, XDark, XLight, CalcomDark, CalcomLight, Gmail } from "@ridemountainpig/svgl-react";
import { SOCIAL } from "@/config/links";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Asks the server which gated profiles this visitor is allowed to see.
 *
 * The URLs are not in this bundle and not in the page source. They are fetched
 * at runtime and only returned when the referrer qualifies, so someone arriving
 * from Discord never receives them at all. The referrer is client-supplied and
 * therefore forgeable; this removes casual cross-discovery rather than
 * guaranteeing anything.
 */
function useGatedLinks() {
    const [links, setLinks] = useState<Record<string, string>>({});

    useEffect(() => {
        const from = document.referrer;
        if (!from) return;
        const controller = new AbortController();
        fetch(`/api/link?from=${encodeURIComponent(from)}`, { signal: controller.signal })
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => { if (d?.links) setLinks(d.links); })
            .catch(() => { /* stay closed if the lookup fails */ });
        return () => controller.abort();
    }, []);

    return links;
}

type SvgComponent = ComponentType<SVGProps<SVGSVGElement>>;

/* ─── Node Data ─── */

interface NodeDef {
    id: string;
    label: string;
    href?: string;
    tooltip?: string;
    iconLight: SvgComponent;
    iconDark: SvgComponent;
    x: number;
    y: number;
}

const NODES: NodeDef[] = [
    { id: "github", label: "github", href: SOCIAL.github, iconLight: GitHubLight, iconDark: GitHubDark, x: 15, y: 30 },
    { id: "linkedin", label: "linkedin", tooltip: "hehe private!", iconLight: LinkedIn, iconDark: LinkedIn, x: 42, y: 72 },
    { id: "x", label: "x / twitter", tooltip: "hehe private!", iconLight: XLight, iconDark: XDark, x: 70, y: 25 },
    { id: "mail", label: "gmail", href: `mailto:${SOCIAL.email}`, iconLight: Gmail, iconDark: Gmail, x: 30, y: 55 },
    { id: "cal", label: "cal.com", href: SOCIAL.cal, iconLight: CalcomLight, iconDark: CalcomDark, x: 78, y: 65 },
];

const EDGES: [number, number][] = [
    [0, 3], [0, 2], [1, 3], [1, 4], [2, 4], [3, 4], [0, 1],
];

/* ─── Node Icon Renderer ─── */


/** Overlays whatever the gate allowed onto the static node list. */
function useResolvedNodes(): NodeDef[] {
    const gated = useGatedLinks();
    return NODES.map((n) => {
        const href = n.href ?? gated[n.id];
        return href ? { ...n, href, tooltip: undefined } : n;
    });
}

function NodeIcon({ node, size }: { node: NodeDef; size: number }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    // Hydration guard, not a cascade: the server has no resolved theme, so the
    // icon variant can only be picked after mount. Flipping this flag exactly
    // once is the entire purpose of the effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div style={{ width: size, height: size }} />;

    const Icon = resolvedTheme === "dark" ? node.iconDark : node.iconLight;
    const w = node.id === "cal" ? size * 2 : size;
    return <Icon width={w} height={size} />;
}

/* ─── Constellation Canvas ─── */

function SignalBoard() {
    const nodes = useResolvedNodes();
    const containerRef = useRef<HTMLDivElement>(null);
    const [mouse, setMouse] = useState({ x: 50, y: 50 });
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [hasMounted, setHasMounted] = useState(false);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        // Hydration guard, not a cascade: the proximity glow and the ambient
        // particles stay off until the client is live so the first paint
        // matches the server HTML. Flipping it once on mount is the intent.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHasMounted(true);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            setMouse({ x, y });
        });
    }, []);

    const distTo = (px: number, py: number) => {
        const dx = mouse.x - px;
        const dy = mouse.y - py;
        return Math.sqrt(dx * dx + dy * dy);
    };

    return (
        <div
            ref={containerRef}
            className="relative h-[260px] w-full min-[480px]:h-[280px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                setMouse({ x: 50, y: 50 });
                setHoveredNode(null);
            }}
        >
            {/* SVG edges */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
                {EDGES.map(([a, b], i) => {
                    const na = nodes[a];
                    const nb = nodes[b];
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
                            stroke="var(--text-muted)"
                            strokeWidth="1"
                            strokeDasharray="4 6"
                            style={{
                                opacity: 0.4 + glow * 0.4,
                                transition: "opacity 0.3s ease-out",
                            }}
                        />
                    );
                })}
            </svg>

            {/* Nodes */}
            {nodes.map((node, i) => {
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
                        {node.href ? (
                            <a
                                href={node.href}
                                target={node.id === "mail" ? undefined : "_blank"}
                                rel={node.id === "mail" ? undefined : "noopener noreferrer"}
                                aria-label={node.label}
                                className={`relative flex items-center justify-center border border-border-default bg-bg-secondary transition-all duration-300 hover:border-accent-primary ${node.id === "cal" ? "h-12 w-16 min-[480px]:h-14 min-[480px]:w-20" : "h-12 w-12 min-[480px]:h-14 min-[480px]:w-14"}`}
                                style={{
                                    transform: `scale(${scale})`,
                                    transition: "transform 0.3s ease-out, border-color 0.3s ease-out",
                                }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                            >
                                <NodeIcon node={node} size={20} />
                            </a>
                        ) : (
                            <button
                                type="button"
                                aria-label={node.label}
                                className="relative flex h-12 w-12 cursor-default items-center justify-center border border-border-default bg-bg-secondary opacity-50 transition-all duration-300 hover:border-accent-primary hover:opacity-100 min-[480px]:h-14 min-[480px]:w-14"
                                style={{
                                    transform: `scale(${scale})`,
                                    transition: "transform 0.3s ease-out, border-color 0.3s ease-out, opacity 0.3s ease-out",
                                }}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                            >
                                <NodeIcon node={node} size={20} />
                            </button>
                        )}

                        {/* Label / Tooltip */}
                        <div
                            className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap font-space text-[12px] text-text-tertiary transition-all duration-200"
                            style={{
                                opacity: isHovered ? 1 : 0,
                                transform: `translate(-50%, ${isHovered ? 0 : -4}px)`,
                            }}
                        >
                            {node.tooltip ?? node.label}
                        </div>
                    </motion.div>
                );
            })}

            {/* Ambient particles */}
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

/* ─── Mobile Layout ─── */

function MobileConnections() {
    const nodes = useResolvedNodes();
    return (
        <div className="flex flex-wrap justify-center gap-3">
            {nodes.map((node, i) =>
                node.href ? (
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
                        <NodeIcon node={node} size={20} />
                        <span className="font-space text-[12px] text-text-tertiary">{node.label}</span>
                    </motion.a>
                ) : (
                    <motion.button
                        key={node.id}
                        type="button"
                        className="flex cursor-default flex-col items-center gap-2 border border-border-default bg-bg-secondary p-4 opacity-50 transition-colors duration-200 hover:border-accent-primary hover:opacity-100"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.06, ease }}
                        title={node.tooltip}
                    >
                        <NodeIcon node={node} size={20} />
                        <span className="font-space text-[12px] text-text-tertiary">{node.tooltip ?? node.label}</span>
                    </motion.button>
                )
            )}
        </div>
    );
}

/* ─── Connections Section ─── */

export function Connections() {
    return (
        <section id="contact" className="mt-16 scroll-mt-16 min-[480px]:mt-24" aria-label="Get in touch">
            <motion.h2
                className="font-micro text-[40px] leading-none text-text-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
            >
                GET IN TOUCH
            </motion.h2>

            <motion.p
                className="mt-4 max-w-md font-space text-[16px] leading-normal text-text-secondary"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease }}
            >
                whether you need a developer, a design partner, or someone to ship your next project, I&apos;m open to the right collaboration.
            </motion.p>

            {/* Desktop: signal board */}
            <div className="mt-8 hidden min-[480px]:block">
                <SignalBoard />
            </div>

            {/* Mobile: grid fallback */}
            <div className="mt-8 block min-[480px]:hidden">
                <MobileConnections />
            </div>
        </section>
    );
}
