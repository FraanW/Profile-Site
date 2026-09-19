"use client";

import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_isDark;
uniform float u_speed;
uniform float u_turbulence;
uniform float u_mouseInfluence;
uniform float u_grain;
uniform float u_sparkle;
uniform float u_vignette;
uniform float u_opacity;

uniform vec3 u_darkA;
uniform vec3 u_darkB;
uniform vec3 u_darkC;
uniform vec3 u_lightA;
uniform vec3 u_lightB;
uniform vec3 u_lightC;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Four octaves, not five. The fifth contributes detail finer than the grain
// overlay hides anyway, and it costs a full simplex evaluation per pixel on a
// shader that already runs a dozen of them.
float fbm(vec2 p, float turbulence) {
  float total = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  mat2 rot = mat2(cos(0.45), sin(0.45), -sin(0.45), cos(0.45));
  for (int i = 0; i < 4; i++) {
    total += snoise(p * freq) * amp;
    p = rot * p;
    freq *= mix(1.85, 2.35, clamp(turbulence, 0.0, 2.0) * 0.5);
    amp *= 0.5;
  }
  return total;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / max(u_res.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  float t = u_time * (0.15 * u_speed);

  vec2 mouse = (u_mouse - 0.5) * vec2(aspect, 1.0);
  float dMouse = length(p - mouse);
  p += (mouse - p) * 0.02 * u_mouseInfluence * smoothstep(0.45, 0.0, dMouse);

  vec2 flow = vec2(
    fbm(p + vec2(t * 0.2, t * 0.1), u_turbulence),
    fbm(p + vec2(-t * 0.1, t * 0.3), u_turbulence)
  );

  float n = fbm(p * 2.0 + flow * 1.45, u_turbulence);
  float ridges = 1.0 - abs(snoise(p * 4.0 + n) * 2.0);
  ridges = pow(ridges, 3.0);

  vec3 colorA = mix(u_lightA, u_darkA, u_isDark);
  vec3 colorB = mix(u_lightB, u_darkB, u_isDark);
  vec3 colorC = mix(u_lightC, u_darkC, u_isDark);

  vec3 col = mix(colorA, colorB, smoothstep(-0.5, 0.5, n));
  col = mix(col, colorC, smoothstep(0.25, 1.0, n * 0.52 + ridges * 0.48));

  float sparkle = pow(max(0.0, snoise(gl_FragCoord.xy * 0.2 + t * 2.0)), 18.0) * 0.5 * u_sparkle;
  vec3 sparkleColor = mix(vec3(0.56, 0.58, 0.72), vec3(0.8, 0.9, 1.0), u_isDark);
  col += sparkleColor * sparkle;

  float vigDark = 1.0 - smoothstep(0.5, mix(1.8, 1.55, u_isDark), length(p));
  col = mix(col, col * vigDark, u_isDark * u_vignette);
  float vigLight = 1.0 - smoothstep(0.4, 1.45, length(p));
  col = mix(mix(vec3(1.0), col, vigLight), col, u_isDark);

  float grain = (fract(sin(dot(gl_FragCoord.xy + t * 50.0, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * (0.06 * u_grain);
  col += grain;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), u_opacity);
}
`;

const HEX_COLOR_REGEX = /^#?[0-9a-fA-F]{6}$/;

function sanitizeHexColor(value: string, fallback: string) {
  const trimmed = value.trim();
  if (!HEX_COLOR_REGEX.test(trimmed)) {
    return fallback;
  }
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}

function hexToRgb01(hex: string, fallback: string): [number, number, number] {
  const normalized = sanitizeHexColor(hex, fallback).replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16) / 255;
  const g = parseInt(normalized.slice(2, 4), 16) / 255;
  const b = parseInt(normalized.slice(4, 6), 16) / 255;
  return [r, g, b];
}

// Site palette. The plasma's tones are the page's ground colours, so these
// defaults and the CSS custom properties must stay in sync.
//
// The landing page runs dark. The projects page runs light: the site inverts
// when you walk over to the shelf.
const DARK_A = "#0b0d16";
const DARK_B = "#1b2340";
const DARK_C = "#4c6099";
const LIGHT_A = "#f7f6f2";
const LIGHT_B = "#e4e5e9";
const LIGHT_C = "#c3c9da";

export interface ClosingPlasmaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which half of the palette drives the render. */
  mode?: "dark" | "light";
  /**
   * Fraction of CSS resolution the shader actually renders at, upscaled by the
   * browser. This is a soft noise field with a grain overlay, so rendering at
   * full device resolution buys nothing visible and costs pixels quadratically.
   */
  resolutionScale?: number;
  /** Frames per second. A field this slow does not need 60. */
  maxFps?: number;
  speed?: number;
  turbulence?: number;
  mouseInfluence?: number;
  grain?: number;
  sparkle?: number;
  vignette?: number;
  opacity?: number;
  interactive?: boolean;
  darkColorA?: string;
  darkColorB?: string;
  darkColorC?: string;
  lightColorA?: string;
  lightColorB?: string;
  lightColorC?: string;
  children?: React.ReactNode;
}

export function ClosingPlasma({
  mode = "dark",
  resolutionScale = 0.6,
  maxFps = 30,
  speed = 1,
  turbulence = 1,
  mouseInfluence = 1,
  grain = 1,
  sparkle = 1,
  vignette = 1,
  opacity = 1,
  interactive = true,
  darkColorA = DARK_A,
  darkColorB = DARK_B,
  darkColorC = DARK_C,
  lightColorA = LIGHT_A,
  lightColorB = LIGHT_B,
  lightColorC = LIGHT_C,
  className,
  children,
  style,
  ...props
}: ClosingPlasmaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });

  const settings = useMemo(
    () => ({
      mode,
      resolutionScale,
      maxFps,
      speed,
      turbulence,
      mouseInfluence,
      grain,
      sparkle,
      vignette,
      opacity,
      interactive,
      darkColorA,
      darkColorB,
      darkColorC,
      lightColorA,
      lightColorB,
      lightColorC,
    }),
    [
      mode,
      resolutionScale,
      maxFps,
      speed,
      turbulence,
      mouseInfluence,
      grain,
      sparkle,
      vignette,
      opacity,
      interactive,
      darkColorA,
      darkColorB,
      darkColorC,
      lightColorA,
      lightColorB,
      lightColorC,
    ],
  );

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) {
      return;
    }

    // Respect reduced motion: render one frame and never start the loop.
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handlePointerMove = (event: PointerEvent) => {
      if (!settings.interactive || motionQuery.matches) {
        return;
      }
      const rect = container.getBoundingClientRect();
      targetMouseRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: 1 - (event.clientY - rect.top) / rect.height,
      };
    };

    const handlePointerLeave = () => {
      targetMouseRef.current = { x: 0.5, y: 0.5 };
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    const gl = canvas.getContext("webgl", { antialias: false, alpha: true });
    if (!gl) {
      // No WebGL: the CSS fallback background on the container stands in.
      return () => {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
      };
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) {
        return null;
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    gl.useProgram(program);

    const position = gl.getAttribLocation(program, "position");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uIsDark = gl.getUniformLocation(program, "u_isDark");
    const uSpeed = gl.getUniformLocation(program, "u_speed");
    const uTurbulence = gl.getUniformLocation(program, "u_turbulence");
    const uMouseInfluence = gl.getUniformLocation(program, "u_mouseInfluence");
    const uGrain = gl.getUniformLocation(program, "u_grain");
    const uSparkle = gl.getUniformLocation(program, "u_sparkle");
    const uVignette = gl.getUniformLocation(program, "u_vignette");
    const uOpacity = gl.getUniformLocation(program, "u_opacity");
    const uDarkA = gl.getUniformLocation(program, "u_darkA");
    const uDarkB = gl.getUniformLocation(program, "u_darkB");
    const uDarkC = gl.getUniformLocation(program, "u_darkC");
    const uLightA = gl.getUniformLocation(program, "u_lightA");
    const uLightB = gl.getUniformLocation(program, "u_lightB");
    const uLightC = gl.getUniformLocation(program, "u_lightC");

    const resize = () => {
      // Cap at 1x device pixels, then render a fraction of that. CSS scales the
      // canvas back up; the grain overlay hides the difference entirely.
      const dpr = Math.min(window.devicePixelRatio || 1, 1);
      const scale = Math.max(0.25, Math.min(1, settings.resolutionScale));
      const { width, height } = container.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr * scale));
      canvas.height = Math.max(1, Math.floor(height * dpr * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const darkA = hexToRgb01(settings.darkColorA, DARK_A);
    const darkB = hexToRgb01(settings.darkColorB, DARK_B);
    const darkC = hexToRgb01(settings.darkColorC, DARK_C);
    const lightA = hexToRgb01(settings.lightColorA, LIGHT_A);
    const lightB = hexToRgb01(settings.lightColorB, LIGHT_B);
    const lightC = hexToRgb01(settings.lightColorC, LIGHT_C);

    gl.uniform3f(uDarkA, darkA[0], darkA[1], darkA[2]);
    gl.uniform3f(uDarkB, darkB[0], darkB[1], darkB[2]);
    gl.uniform3f(uDarkC, darkC[0], darkC[1], darkC[2]);
    gl.uniform3f(uLightA, lightA[0], lightA[1], lightA[2]);
    gl.uniform3f(uLightB, lightB[0], lightB[1], lightB[2]);
    gl.uniform3f(uLightC, lightC[0], lightC[1], lightC[2]);

    const isDark = settings.mode === "dark" ? 1 : 0;

    const drawFrame = (elapsed: number) => {
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uIsDark, isDark);
      gl.uniform1f(uSpeed, settings.speed);
      gl.uniform1f(uTurbulence, settings.turbulence);
      gl.uniform1f(uMouseInfluence, settings.mouseInfluence);
      gl.uniform1f(uGrain, settings.grain);
      gl.uniform1f(uSparkle, settings.sparkle);
      gl.uniform1f(uVignette, settings.vignette);
      gl.uniform1f(uOpacity, settings.opacity);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let rafId = 0;
    let running = false;
    let onScreen = true;
    // Time the shader sees. Paused while off screen, so the field does not
    // leap forward when you scroll back to it.
    let shaderTime = 0;
    let lastFrameAt = 0;
    const minFrameGap = 1000 / Math.max(1, settings.maxFps);

    const render = (now: number) => {
      rafId = requestAnimationFrame(render);

      const sinceLast = now - lastFrameAt;
      if (sinceLast < minFrameGap) return;
      // Clamp so a long pause (a background tab) does not jump the animation.
      shaderTime += Math.min(sinceLast, 100) / 1000;
      lastFrameAt = now;

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.12;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.12;
      drawFrame(shaderTime);
    };

    const stopLoop = () => {
      if (!running) return;
      cancelAnimationFrame(rafId);
      running = false;
    };

    const startLoop = () => {
      if (motionQuery.matches) {
        stopLoop();
        // One still frame, chosen far enough into the noise to look composed.
        drawFrame(12);
        return;
      }
      if (running || !onScreen || document.hidden) return;
      running = true;
      lastFrameAt = performance.now();
      rafId = requestAnimationFrame(render);
    };

    // The single biggest saving: a plasma nobody can see renders nothing.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = Boolean(entry?.isIntersecting);
        if (onScreen) startLoop();
        else stopLoop();
      },
      { rootMargin: "80px" },
    );
    visibility.observe(container);

    const handleTabVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener("visibilitychange", handleTabVisibility);

    const handleMotionChange = () => {
      stopLoop();
      startLoop();
    };
    motionQuery.addEventListener("change", handleMotionChange);

    startLoop();

    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleTabVisibility);
      motionQuery.removeEventListener("change", handleMotionChange);
      visibility.disconnect();
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [settings]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ backgroundColor: mode === "dark" ? darkColorA : lightColorA, ...style }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
}

export default ClosingPlasma;
