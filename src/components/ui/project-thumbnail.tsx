"use client";

/**
 * Generative CSS/SVG thumbnails for project cards.
 * Zero images — each project gets a unique coded visual.
 */

/* ─── UDF Viewer: Concentric disc rings with sector lines ─── */
function UdfViewerThumb() {
    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-bg-tertiary">
            {/* Radial grid lines */}
            <svg
                className="absolute inset-0 h-full w-full opacity-35 transition-opacity duration-300 group-hover:opacity-50"
                viewBox="0 0 400 250"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* Concentric rings */}
                {[30, 55, 80, 105].map((r) => (
                    <circle key={r} cx="200" cy="125" r={r} fill="none" stroke="var(--accent-primary)" strokeWidth="0.5" />
                ))}
                {/* Sector lines */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                    const rad = (angle * Math.PI) / 180;
                    return (
                        <line
                            key={angle}
                            x1="200"
                            y1="125"
                            x2={200 + Math.cos(rad) * 110}
                            y2={125 + Math.sin(rad) * 110}
                            stroke="var(--accent-primary)"
                            strokeWidth="0.5"
                        />
                    );
                })}
                {/* Highlighted sector arc */}
                <path d="M 200 125 L 277.78 47.22 A 105 105 0 0 1 305 125 Z" fill="var(--accent-primary)" fillOpacity="0.06" />
                <path d="M 200 125 L 200 20 A 105 105 0 0 1 277.78 47.22 Z" fill="var(--accent-primary)" fillOpacity="0.03" />
            </svg>
            {/* Center label */}
            <div className="relative z-10 flex flex-col items-center gap-1.5">
                <span className="font-jetbrains text-[10px] font-semibold tracking-widest text-accent-primary opacity-80">UDF</span>
                <div className="h-px w-8 bg-accent-primary/30" />
                <span className="font-space text-[10px] tracking-widest text-text-muted">VIEWER</span>
            </div>
            {/* Scan line on hover */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_48%,var(--accent-primary)_49%,var(--accent-primary)_51%,transparent_52%,transparent_100%)] opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]" />
        </div>
    );
}

/* ─── Opal Consulting: Corporate wireframe ─── */
function OpalThumb() {
    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-bg-tertiary">
            <svg
                className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.02]"
                viewBox="0 0 400 250"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* Wireframe: nav bar */}
                <rect x="60" y="35" width="280" height="16" rx="2" fill="none" stroke="var(--border-strong)" strokeWidth="0.75" />
                <rect x="65" y="40" width="30" height="6" rx="1" fill="var(--accent-primary)" fillOpacity="0.5" />
                <rect x="280" y="40" width="16" height="6" rx="1" fill="var(--text-muted)" fillOpacity="0.5" />
                <rect x="300" y="40" width="16" height="6" rx="1" fill="var(--text-muted)" fillOpacity="0.5" />
                <rect x="320" y="40" width="16" height="6" rx="1" fill="var(--text-muted)" fillOpacity="0.5" />

                {/* Hero block */}
                <rect x="60" y="58" width="280" height="70" rx="2" fill="none" stroke="var(--border-strong)" strokeWidth="0.75" />
                <rect x="80" y="75" width="100" height="5" rx="1" fill="var(--text-muted)" fillOpacity="0.6" />
                <rect x="80" y="84" width="70" height="3" rx="1" fill="var(--text-muted)" fillOpacity="0.35" />
                <rect x="80" y="91" width="70" height="3" rx="1" fill="var(--text-muted)" fillOpacity="0.35" />
                <rect x="80" y="103" width="45" height="10" rx="2" fill="var(--accent-primary)" fillOpacity="0.15" stroke="var(--accent-primary)" strokeWidth="0.5" />
                {/* Hero image placeholder */}
                <rect x="260" y="68" width="65" height="50" rx="2" fill="var(--bg-secondary)" stroke="var(--border-default)" strokeWidth="0.5" />
                <line x1="260" y1="68" x2="325" y2="118" stroke="var(--border-default)" strokeWidth="0.5" />
                <line x1="325" y1="68" x2="260" y2="118" stroke="var(--border-default)" strokeWidth="0.5" />

                {/* 3-column cards */}
                {[0, 1, 2].map((i) => (
                    <g key={i}>
                        <rect x={60 + i * 97} y="138" width="86" height="55" rx="2" fill="none" stroke="var(--border-strong)" strokeWidth="0.75" />
                        <rect x={68 + i * 97} y="147" width="24" height="3" rx="1" fill="var(--text-muted)" fillOpacity="0.6" />
                        <rect x={68 + i * 97} y="154" width="60" height="2" rx="1" fill="var(--text-muted)" fillOpacity="0.35" />
                        <rect x={68 + i * 97} y="159" width="55" height="2" rx="1" fill="var(--text-muted)" fillOpacity="0.35" />
                        <rect x={68 + i * 97} y="164" width="45" height="2" rx="1" fill="var(--text-muted)" fillOpacity="0.35" />
                    </g>
                ))}

                {/* Footer */}
                <rect x="60" y="203" width="280" height="12" rx="2" fill="none" stroke="var(--border-strong)" strokeWidth="0.5" strokeDasharray="4 4" />
            </svg>

            {/* Center brand overlay */}
            <div className="relative z-10 flex flex-col items-center gap-1">
                <span className="font-jetbrains text-[10px] font-semibold tracking-widest text-accent-primary opacity-80">OPAL</span>
            </div>
        </div>
    );
}

/* ─── Kleenestar: Neural network / node graph ─── */
function KleenestarThumb() {
    const nodes = [
        { x: 80, y: 80, r: 4, label: "" },
        { x: 140, y: 50, r: 3, label: "" },
        { x: 160, y: 120, r: 5, label: "" },
        { x: 230, y: 70, r: 4, label: "" },
        { x: 250, y: 150, r: 3, label: "" },
        { x: 200, y: 170, r: 3, label: "" },
        { x: 300, y: 100, r: 5, label: "" },
        { x: 320, y: 160, r: 3, label: "" },
        { x: 110, y: 160, r: 3, label: "" },
        { x: 280, y: 40, r: 3, label: "" },
    ];

    const edges = [
        [0, 1], [0, 2], [1, 3], [2, 3], [2, 5],
        [3, 6], [4, 5], [4, 7], [5, 8], [6, 7],
        [6, 9], [1, 9], [3, 4],
    ];

    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-bg-tertiary">
            <svg
                className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.02]"
                viewBox="0 0 400 250"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* Edges */}
                {edges.map(([a, b], i) => (
                    <line
                        key={`e-${i}`}
                        x1={nodes[a].x}
                        y1={nodes[a].y}
                        x2={nodes[b].x}
                        y2={nodes[b].y}
                        stroke="var(--accent-primary)"
                        strokeWidth="0.5"
                        opacity="0.4"
                    />
                ))}

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <g key={`n-${i}`}>
                        {/* Glow */}
                        <circle cx={node.x} cy={node.y} r={node.r * 3} fill="var(--accent-primary)" fillOpacity="0.04" />
                        {/* Node */}
                        <circle cx={node.x} cy={node.y} r={node.r} fill="var(--bg-secondary)" stroke="var(--accent-primary)" strokeWidth="0.75" opacity="0.8" />
                        {/* Inner dot */}
                        <circle cx={node.x} cy={node.y} r="1" fill="var(--accent-primary)" fillOpacity="0.6" />
                    </g>
                ))}

                {/* Data flow particles — small dots along some edges */}
                {[0, 2, 5, 9].map((edgeIdx) => {
                    const [a, b] = edges[edgeIdx];
                    const mx = (nodes[a].x + nodes[b].x) / 2;
                    const my = (nodes[a].y + nodes[b].y) / 2;
                    return <circle key={`p-${edgeIdx}`} cx={mx} cy={my} r="1.5" fill="var(--accent-primary)" fillOpacity="0.6" />;
                })}
            </svg>

            {/* Center brand */}
            <div className="relative z-10 flex flex-col items-center gap-1.5">
                <span className="font-jetbrains text-[10px] font-semibold tracking-widest text-accent-primary opacity-90">KLEENE</span>
                <div className="flex items-center gap-1">
                    <div className="h-px w-4 bg-accent-primary/30" />
                    <span className="font-space text-[10px] tracking-widest text-text-muted">STAR</span>
                    <div className="h-px w-4 bg-accent-primary/30" />
                </div>
            </div>
        </div>
    );
}

/* ─── Codesnippify: Code editor with syntax lines ─── */
function CodesnippifyThumb() {
    const lines = [
        { indent: 0, widths: [28, 50], colors: ["var(--accent-primary)", "var(--text-muted)"] },
        { indent: 1, widths: [22, 65, 30], colors: ["var(--accent-primary)", "var(--text-muted)", "var(--accent-primary)"] },
        { indent: 2, widths: [40, 35], colors: ["var(--text-muted)", "var(--accent-primary)"] },
        { indent: 2, widths: [55], colors: ["var(--text-muted)"] },
        { indent: 1, widths: [12], colors: ["var(--accent-primary)"] },
        { indent: 0, widths: [0], colors: [] },
        { indent: 0, widths: [35, 45], colors: ["var(--accent-primary)", "var(--text-muted)"] },
        { indent: 1, widths: [48, 30], colors: ["var(--text-muted)", "var(--accent-primary)"] },
        { indent: 1, widths: [60], colors: ["var(--text-muted)"] },
        { indent: 0, widths: [12], colors: ["var(--accent-primary)"] },
    ];

    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-bg-tertiary">
            <svg
                className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.02]"
                viewBox="0 0 400 250"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* Editor chrome — tab bar */}
                <rect x="70" y="30" width="260" height="14" rx="2" fill="var(--bg-secondary)" stroke="var(--border-strong)" strokeWidth="0.5" />
                <rect x="75" y="33" width="40" height="8" rx="1" fill="var(--accent-primary)" fillOpacity="0.12" stroke="var(--accent-primary)" strokeWidth="0.4" />
                <circle cx="82" cy="37" r="1.5" fill="var(--accent-primary)" fillOpacity="0.5" />
                <rect x="120" y="33" width="35" height="8" rx="1" fill="var(--bg-tertiary)" />

                {/* Editor body */}
                <rect x="70" y="44" width="260" height="170" rx="0" fill="var(--bg-secondary)" stroke="var(--border-strong)" strokeWidth="0.5" />

                {/* Line numbers gutter */}
                <rect x="70" y="44" width="22" height="170" fill="var(--bg-tertiary)" />
                {lines.map((_, i) => (
                    <text key={`ln-${i}`} x="80" y={62 + i * 16} fontSize="6" fill="var(--text-muted)" fillOpacity="0.4" textAnchor="middle" fontFamily="monospace">
                        {i + 1}
                    </text>
                ))}

                {/* Code lines */}
                {lines.map((line, i) => {
                    let xOffset = 100 + line.indent * 12;
                    return (
                        <g key={`cl-${i}`}>
                            {line.widths.map((w, j) => {
                                if (w === 0) return null;
                                const el = (
                                    <rect
                                        key={`cl-${i}-${j}`}
                                        x={xOffset}
                                        y={59 + i * 16}
                                        width={w}
                                        height="3"
                                        rx="1"
                                        fill={line.colors[j]}
                                        fillOpacity="0.45"
                                    />
                                );
                                xOffset += w + 6;
                                return el;
                            })}
                        </g>
                    );
                })}

                {/* Highlight active line */}
                <rect x="92" y="53" width="238" height="16" fill="var(--accent-primary)" fillOpacity="0.04" />
            </svg>

            {/* Center brand */}
            <div className="relative z-10 flex flex-col items-center gap-1">
                <span className="font-jetbrains text-[10px] font-semibold tracking-widest text-accent-primary opacity-80">CODESNIPPIFY</span>
            </div>
        </div>
    );
}

/* ─── QRestro: QR code + menu layout ─── */
function QRestroThumb() {
    /* 7x7 simplified QR pattern — corners have finder patterns, rest is pseudo-random */
    const qrSize = 7;
    const cellSize = 8;
    const qrOrigin = { x: 155, y: 75 };
    const finderCells = [
        /* top-left 3x3 */
        [0, 0], [1, 0], [2, 0], [0, 1], [2, 1], [0, 2], [1, 2], [2, 2],
        /* top-right 3x3 */
        [4, 0], [5, 0], [6, 0], [4, 1], [6, 1], [4, 2], [5, 2], [6, 2],
        /* bottom-left 3x3 */
        [0, 4], [1, 4], [2, 4], [0, 5], [2, 5], [0, 6], [1, 6], [2, 6],
    ];
    const dataCells = [
        [3, 1], [3, 3], [4, 3], [5, 3], [3, 5], [4, 5], [6, 4], [5, 5], [6, 6], [3, 6], [1, 3], [5, 4],
    ];

    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-bg-tertiary">
            <svg
                className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-[1.02]"
                viewBox="0 0 400 250"
                preserveAspectRatio="xMidYMid slice"
            >
                {/* QR code */}
                <rect
                    x={qrOrigin.x - 4}
                    y={qrOrigin.y - 4}
                    width={qrSize * cellSize + 8}
                    height={qrSize * cellSize + 8}
                    rx="2"
                    fill="var(--bg-secondary)"
                    stroke="var(--border-strong)"
                    strokeWidth="0.5"
                />
                {/* Finder pattern cells */}
                {finderCells.map(([cx, cy]) => (
                    <rect
                        key={`f-${cx}-${cy}`}
                        x={qrOrigin.x + cx * cellSize}
                        y={qrOrigin.y + cy * cellSize}
                        width={cellSize - 1}
                        height={cellSize - 1}
                        fill="var(--accent-primary)"
                        fillOpacity="0.7"
                    />
                ))}
                {/* Data cells */}
                {dataCells.map(([cx, cy]) => (
                    <rect
                        key={`d-${cx}-${cy}`}
                        x={qrOrigin.x + cx * cellSize}
                        y={qrOrigin.y + cy * cellSize}
                        width={cellSize - 1}
                        height={cellSize - 1}
                        fill="var(--accent-primary)"
                        fillOpacity="0.4"
                    />
                ))}

                {/* Menu items to the right */}
                {[0, 1, 2].map((i) => (
                    <g key={`menu-${i}`}>
                        <rect x="240" y={78 + i * 28} width="90" height="22" rx="2" fill="var(--bg-secondary)" stroke="var(--border-strong)" strokeWidth="0.5" />
                        <rect x="248" y={84 + i * 28} width={35 - i * 5} height="3" rx="1" fill="var(--text-muted)" fillOpacity="0.6" />
                        <rect x="248" y={90 + i * 28} width={50 - i * 8} height="2" rx="1" fill="var(--text-muted)" fillOpacity="0.3" />
                        <rect x="310" y={84 + i * 28} width="14" height="8" rx="1.5" fill="var(--accent-primary)" fillOpacity="0.15" stroke="var(--accent-primary)" strokeWidth="0.4" />
                    </g>
                ))}

                {/* Connecting dashed line from QR to menu */}
                <line x1="215" y1="105" x2="235" y2="105" stroke="var(--accent-primary)" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.5" />
            </svg>

            {/* Center brand */}
            <div className="relative z-10 flex flex-col items-center gap-1">
                <span className="font-jetbrains text-[10px] font-semibold tracking-widest text-accent-primary opacity-80">QRESTRO</span>
            </div>
        </div>
    );
}

/* ─── Thumbnail Router ─── */

const THUMBNAILS: Record<string, () => React.JSX.Element> = {
    "udf-viewer": UdfViewerThumb,
    "opal-consulting": OpalThumb,
    kleenestar: KleenestarThumb,
    codesnippify: CodesnippifyThumb,
    qrestro: QRestroThumb,
};

export function ProjectThumbnail({ slug }: { slug: string }) {
    const Thumb = THUMBNAILS[slug];

    if (!Thumb) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-bg-tertiary">
                <span className="font-jetbrains text-[10px] uppercase tracking-widest text-text-muted">{slug}</span>
            </div>
        );
    }

    return <Thumb />;
}
