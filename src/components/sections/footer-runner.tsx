"use client";

import { useRef, useEffect, useCallback, useState } from "react";

/* ─── Config ─── */

const PX = 3;
const GROUND_Y = 88;
const GRAVITY = 0.45;
const JUMP_FORCE = -8.2;
const SPEED_INIT = 2.5;
const SPEED_MAX = 5;
const SPAWN_MIN = 110;
const SPAWN_MAX = 200;
const TOOLTIP_DIST = 200;

/* ─── Color palette (fixed — game art, not theme-dependent) ─── */

const PAL = {
    /* Character */
    cap: "#d97757",
    skin: "#e8c8a0",
    dark: "#3d2b1f",
    /* Pipe */
    pipeLight: "#8eb868",
    pipeMid: "#6a9848",
    pipeDark: "#4a7830",
    /* Goomba */
    goombaBody: "#8b5e3c",
    goombaFace: "#dbb888",
    goombaDark: "#3d2b1f",
    /* Koopa shell */
    shellGreen: "#6a9848",
    shellLight: "#8eb868",
    shellDark: "#3a6828",
};

/* ─── Multi-color sprite drawing ─── */

type Sprite = number[][];
type ColorMap = Record<number, string>;

function drawSprite(ctx: CanvasRenderingContext2D, sprite: Sprite, x: number, y: number, colors: ColorMap) {
    for (let r = 0; r < sprite.length; r++) {
        for (let c = 0; c < sprite[r].length; c++) {
            const v = sprite[r][c];
            if (v && colors[v]) {
                ctx.fillStyle = colors[v];
                ctx.fillRect(Math.round(x + c * PX), Math.round(y + r * PX), PX, PX);
            }
        }
    }
}

/* ─── Character sprites — 12x16, Mario-inspired dev with cap ─── */
/* 1=cap/shirt(orange), 2=skin, 3=dark(hair,pants,shoes,eyes) */

const CHAR_COLORS: ColorMap = { 1: PAL.cap, 2: PAL.skin, 3: PAL.dark };

const CHAR_RUN_1: Sprite = [
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 3, 2, 2, 2, 2, 2, 2, 3, 0, 0],
    [0, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 0, 0],
    [0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0],
    [0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0],
];

const CHAR_RUN_2: Sprite = [
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 3, 2, 2, 2, 2, 2, 2, 3, 0, 0],
    [0, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 0, 0],
    [0, 0, 3, 3, 0, 0, 0, 0, 3, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0],
    [0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0],
];

const CHAR_JUMP: Sprite = [
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 3, 2, 2, 2, 2, 2, 2, 3, 0, 0],
    [0, 2, 2, 3, 2, 2, 2, 3, 2, 2, 2, 0],
    [0, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 0],
    [0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0],
    [0, 0, 0, 3, 3, 0, 0, 3, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/* ─── Pipe obstacle — 10x14, classic green Mario pipe ─── */
/* 4=light green, 5=medium, 6=dark outline */

const PIPE_COLORS: ColorMap = { 4: PAL.pipeLight, 5: PAL.pipeMid, 6: PAL.pipeDark };

const PIPE_TALL: Sprite = [
    [6, 4, 4, 4, 4, 4, 4, 4, 4, 6],
    [6, 4, 4, 5, 5, 5, 5, 4, 4, 6],
    [6, 6, 5, 5, 5, 5, 5, 5, 6, 6],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 6, 6, 6, 6, 6, 6, 6, 0],
];

const PIPE_SHORT: Sprite = [
    [6, 4, 4, 4, 4, 4, 4, 4, 4, 6],
    [6, 4, 4, 5, 5, 5, 5, 4, 4, 6],
    [6, 6, 5, 5, 5, 5, 5, 5, 6, 6],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 4, 4, 5, 5, 4, 4, 6, 0],
    [0, 6, 6, 6, 6, 6, 6, 6, 6, 0],
];

/* ─── Goomba — 12x12, angry mushroom enemy ─── */
/* 7=brown body, 8=light face, 3=dark */

const GOOMBA_COLORS: ColorMap = { 7: PAL.goombaBody, 8: PAL.goombaFace, 3: PAL.goombaDark };

const GOOMBA: Sprite = [
    [0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0],
    [0, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 0],
    [0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0],
    [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0],
    [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    [0, 8, 3, 3, 8, 8, 8, 8, 3, 3, 8, 0],
    [0, 8, 8, 3, 3, 8, 8, 3, 3, 8, 8, 0],
    [0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 0],
    [0, 0, 0, 8, 8, 7, 7, 8, 8, 0, 0, 0],
    [0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0],
    [0, 0, 3, 3, 3, 0, 0, 3, 3, 3, 0, 0],
    [0, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 0],
];

/* ─── Koopa shell — 10x10, green shell obstacle ─── */
/* 9=green, 10=light green, 6=dark */

const SHELL_COLORS: ColorMap = { 9: PAL.shellGreen, 10: PAL.shellLight, 6: PAL.shellDark };

const SHELL: Sprite = [
    [0, 0, 0, 6, 6, 6, 6, 0, 0, 0],
    [0, 0, 6, 9, 9, 9, 9, 6, 0, 0],
    [0, 6, 10, 9, 6, 6, 9, 10, 6, 0],
    [6, 10, 10, 9, 6, 6, 9, 10, 10, 6],
    [6, 10, 9, 9, 9, 9, 9, 9, 10, 6],
    [6, 10, 9, 6, 9, 9, 6, 9, 10, 6],
    [6, 10, 9, 6, 9, 9, 6, 9, 10, 6],
    [0, 6, 10, 9, 9, 9, 9, 10, 6, 0],
    [0, 0, 6, 6, 10, 10, 6, 6, 0, 0],
    [0, 0, 0, 6, 6, 6, 6, 0, 0, 0],
];

/* ─── Obstacle registry ─── */

const OBSTACLES = [
    { sprite: PIPE_TALL, colors: PIPE_COLORS, label: "pipe!" },
    { sprite: GOOMBA, colors: GOOMBA_COLORS, label: "bug!" },
    { sprite: PIPE_SHORT, colors: PIPE_COLORS, label: "pipe!" },
    { sprite: SHELL, colors: SHELL_COLORS, label: "shell!" },
];

/* ─── Game state ─── */

interface Obstacle {
    x: number;
    type: number;
    passed: boolean;
}

interface GameState {
    charY: number;
    velY: number;
    isJumping: boolean;
    obstacles: Obstacle[];
    frame: number;
    nextSpawn: number;
    score: number;
    speed: number;
    runFrame: number;
    gameOver: boolean;
}

/* ─── Component ─── */

export function FooterRunner() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const CHAR_H = 16 * PX;
    const CHAR_W = 12 * PX;
    const CHAR_X = 48;

    const stateRef = useRef<GameState>({
        charY: GROUND_Y,
        velY: 0,
        isJumping: false,
        obstacles: [],
        frame: 0,
        nextSpawn: 80,
        score: 0,
        speed: SPEED_INIT,
        runFrame: 0,
        gameOver: false,
    });
    const rafRef = useRef<number>(0);
    const [, forceRender] = useState(0);
    const mutedRef = useRef("#4a4a44");

    useEffect(() => {
        const style = getComputedStyle(document.documentElement);
        mutedRef.current = style.getPropertyValue("--text-muted").trim() || "#4a4a44";
    }, []);

    const jump = useCallback(() => {
        const s = stateRef.current;
        if (s.gameOver) {
            s.charY = GROUND_Y;
            s.velY = 0;
            s.isJumping = false;
            s.obstacles = [];
            s.frame = 0;
            s.nextSpawn = 80;
            s.score = 0;
            s.speed = SPEED_INIT;
            s.gameOver = false;
            forceRender((n) => n + 1);
            return;
        }
        if (!s.isJumping) {
            s.velY = JUMP_FORCE;
            s.isJumping = true;
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const codeSnippets = ["const fn = () => {};", "export default App;", "npm run build", "git push origin main", "return <Component />;", "await fetch(url);", "import { useState }"];
        const codeStr = codeSnippets.join("    ·    ");
        let codeOff = 0;

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas!.getBoundingClientRect();
            canvas!.width = rect.width * dpr;
            canvas!.height = rect.height * dpr;
            ctx!.scale(dpr, dpr);
        }
        resize();
        window.addEventListener("resize", resize);

        const CHAR_H = 16 * PX;
        const CHAR_W = 12 * PX;
        const CHAR_X = 48;

        function tick() {
            const s = stateRef.current;
            const w = canvas!.getBoundingClientRect().width;
            ctx!.clearRect(0, 0, w, 300);

            if (!s.gameOver) {
                s.frame++;
                s.speed = Math.min(SPEED_MAX, SPEED_INIT + s.score * 0.012);

                /* Physics */
                if (s.isJumping) {
                    s.velY += GRAVITY;
                    s.charY += s.velY;
                    if (s.charY >= GROUND_Y) {
                        s.charY = GROUND_Y;
                        s.velY = 0;
                        s.isJumping = false;
                    }
                }

                /* Spawn */
                if (s.frame >= s.nextSpawn) {
                    s.obstacles.push({ x: w + 20, type: Math.floor(Math.random() * OBSTACLES.length), passed: false });
                    s.nextSpawn = s.frame + SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN);
                }

                /* Move + score */
                for (const obs of s.obstacles) {
                    obs.x -= s.speed;
                    if (!obs.passed && obs.x + OBSTACLES[obs.type].sprite[0].length * PX < CHAR_X) {
                        obs.passed = true;
                        s.score++;
                    }
                }
                s.obstacles = s.obstacles.filter((o) => o.x > -60);

                /* Collision */
                const charL = CHAR_X + 2 * PX;
                const charR = CHAR_X + CHAR_W - 2 * PX;
                const charT = s.charY + 1 * PX;
                const charB = s.charY + CHAR_H;

                for (const obs of s.obstacles) {
                    const sp = OBSTACLES[obs.type].sprite;
                    const ow = sp[0].length * PX;
                    const oh = sp.length * PX;
                    const oT = GROUND_Y + CHAR_H - oh;
                    const oB = GROUND_Y + CHAR_H;

                    if (charR > obs.x + 2 * PX && charL < obs.x + ow - 2 * PX && charB > oT + 2 * PX && charT < oB) {
                        s.gameOver = true;
                        break;
                    }
                }

                if (s.frame % 8 === 0) s.runFrame = s.runFrame === 0 ? 1 : 0;
            }

            /* ─── Draw ─── */

            /* Scrolling code ground */
            ctx!.font = "10px Fragment Mono, monospace";
            ctx!.fillStyle = mutedRef.current;
            ctx!.globalAlpha = 0.15;
            codeOff = (codeOff + (s.gameOver ? 0 : s.speed * 0.4)) % (codeStr.length * 5.4);
            ctx!.fillText(codeStr + "    ·    " + codeStr, -codeOff, GROUND_Y + CHAR_H + 18);
            ctx!.globalAlpha = 1;

            /* Ground line */
            ctx!.strokeStyle = mutedRef.current;
            ctx!.globalAlpha = 0.15;
            ctx!.setLineDash([4, 6]);
            ctx!.beginPath();
            ctx!.moveTo(0, GROUND_Y + CHAR_H + 2);
            ctx!.lineTo(w, GROUND_Y + CHAR_H + 2);
            ctx!.stroke();
            ctx!.setLineDash([]);
            ctx!.globalAlpha = 1;

            /* Character */
            const charSprite = s.isJumping ? CHAR_JUMP : s.runFrame === 0 ? CHAR_RUN_1 : CHAR_RUN_2;
            drawSprite(ctx!, charSprite, CHAR_X, s.charY, CHAR_COLORS);

            /* Tooltip */
            let nearestObs: Obstacle | null = null;
            let nearestDist = Infinity;
            for (const obs of s.obstacles) {
                const d = obs.x - CHAR_X;
                if (d > 0 && d < TOOLTIP_DIST && d < nearestDist) {
                    nearestDist = d;
                    nearestObs = obs;
                }
            }

            if (nearestObs && !s.gameOver) {
                const label = OBSTACLES[nearestObs.type].label;
                const tooltipX = CHAR_X + CHAR_W / 2;
                const tooltipY = s.charY - 8;
                const fade = Math.min(1, (TOOLTIP_DIST - nearestDist) / (TOOLTIP_DIST * 0.5));

                ctx!.font = "bold 12px JetBrains Mono, monospace";
                ctx!.textAlign = "center";
                ctx!.fillStyle = PAL.cap;
                ctx!.globalAlpha = fade * 0.8;
                ctx!.fillText(label, tooltipX, tooltipY);
                ctx!.textAlign = "left";
                ctx!.globalAlpha = 1;
            }

            /* Obstacles */
            for (const obs of s.obstacles) {
                const o = OBSTACLES[obs.type];
                const oh = o.sprite.length * PX;
                drawSprite(ctx!, o.sprite, obs.x, GROUND_Y + CHAR_H - oh, o.colors);
            }

            /* Score */
            ctx!.font = "11px JetBrains Mono, monospace";
            ctx!.fillStyle = mutedRef.current;
            ctx!.globalAlpha = 0.45;
            ctx!.textAlign = "right";
            ctx!.fillText(`score: ${String(s.score).padStart(3, "0")}`, w - 8, 16);
            ctx!.textAlign = "left";
            ctx!.globalAlpha = 1;

            /* Hint */
            if (s.score === 0 && s.frame < 200 && !s.gameOver) {
                const fade = Math.max(0, 1 - s.frame / 200);
                ctx!.font = "11px Fragment Mono, monospace";
                ctx!.fillStyle = mutedRef.current;
                ctx!.globalAlpha = fade * 0.5;
                ctx!.textAlign = "center";
                ctx!.fillText("click or press space to jump", w / 2, 16);
                ctx!.textAlign = "left";
                ctx!.globalAlpha = 1;
            }

            /* Game over */
            if (s.gameOver) {
                ctx!.font = "12px Fragment Mono, monospace";
                ctx!.fillStyle = PAL.cap;
                ctx!.textAlign = "center";
                ctx!.fillText(`game over · score: ${s.score} · click to restart`, w / 2, GROUND_Y + CHAR_H / 2);
                ctx!.textAlign = "left";
            }

            rafRef.current = requestAnimationFrame(tick);
        }

        rafRef.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.code === "Space" || e.code === "ArrowUp") {
                e.preventDefault();
                jump();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [jump]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full cursor-pointer"
            style={{ height: "170px" }}
            onClick={jump}
            onTouchStart={(e) => {
                e.preventDefault();
                jump();
            }}
        />
    );
}
