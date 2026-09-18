"use client";

/* eslint-disable react/no-unknown-property */

/**
 * Adapted from Componentry's Newsletter Bookshelf.
 *
 * Three changes from the original, all deliberate:
 *   1. The stage is transparent, so the plasma shows through and the shelf
 *      reads as floating in it rather than sitting on its own panel.
 *   2. Activating a focused book calls `onOpen` instead of navigating to an
 *      href. The project opens as a book, not as a page load.
 *   3. Covers are printed with the project's own emblem and wordmark rather
 *      than a newsletter brand.
 */

import { cn } from "@/lib/utils";
import { Canvas, type ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export interface ShelfItem {
  id: string;
  title: string;
  date: string;
  subtitle?: string;
  color?: string;
  foil?: string;
}

export interface BookshelfProps {
  items: ShelfItem[];
  className?: string;
  height?: number | string;
  /** Fires when a book is activated while already focused. */
  onOpen?: (item: ShelfItem, index: number) => void;
  /** Fires when a book flies out of the shelf into inspection. */
  onFocus?: (item: ShelfItem, index: number) => void;
}

type BookLayout = ShelfItem & {
  x: number;
  width: number;
  bookHeight: number;
  depth: number;
  color: string;
  foil: string;
};

const PALETTE = ["#0b1e4b", "#16277a", "#2233b8", "#4040ff", "#6b7bff", "#9fb0ff", "#25252a"];

function hash(input: string) {
  let value = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function seeded(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function luminance(hex: string) {
  const color = Number.parseInt(hex.slice(1), 16);
  const channel = (value: number) => {
    const normalized = value / 255;
    return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return (
    channel((color >> 16) & 255) * 0.2126 +
    channel((color >> 8) & 255) * 0.7152 +
    channel(color & 255) * 0.0722
  );
}

function deriveLayout(items: ShelfItem[]) {
  let cursor = 0;
  return items.map<BookLayout>((item) => {
    const random = seeded(hash(item.id));
    const fallbackColor = PALETTE[Math.floor(random() * PALETTE.length)]!;
    // Thicker books than the original: a handful of projects, not thirty newsletters.
    const width = 0.44 + random() * 0.32;
    const bookHeight = 3.65 + (random() * 2 - 1) * 0.24;
    const color = item.color ?? fallbackColor;
    const foil = item.foil ?? (luminance(color) < 0.5 ? "#f2ead8" : "#16277a");
    if (random() < 0.2) cursor += 0.16;
    const x = cursor + width / 2;
    cursor += width + 0.07;
    return { ...item, x, width, bookHeight, depth: bookHeight * 0.67, color, foil };
  });
}

/**
 * Cloth, grain and paper are identical between books, so they are built once
 * and reused. Building them per book meant thirty per-pixel JavaScript noise
 * passes on mount, which froze the page for seconds before a single book
 * appeared.
 */

/** A transparent grain-and-weave sheet, laid over each coloured cover. */
let grainSheet: HTMLCanvasElement | null = null;

function getGrainSheet(): HTMLCanvasElement | null {
  if (typeof document === "undefined") return null;
  if (grainSheet) return grainSheet;

  const width = 320;
  const height = 480;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return null;
  const random = seeded(0x9e3779b9);

  // Warp threads.
  context.lineCap = "round";
  for (let x = 0.5; x < width; x += 3) {
    context.strokeStyle = `rgba(18, 16, 14, ${0.06 + random() * 0.07})`;
    context.lineWidth = 0.35 + random() * 0.3;
    context.beginPath();
    context.moveTo(x + (random() - 0.5) * 0.5, 0);
    context.lineTo(x + (random() - 0.5) * 0.5, height);
    context.stroke();
  }

  // Weft threads.
  for (let y = 0.5; y < height; y += 3) {
    context.strokeStyle = `rgba(255, 248, 232, ${0.07 + random() * 0.06})`;
    context.lineWidth = 0.3 + random() * 0.25;
    context.beginPath();
    context.moveTo(0, y + (random() - 0.5) * 0.5);
    context.lineTo(width, y + (random() - 0.5) * 0.5);
    context.stroke();
  }

  // Slubs: the short bright fibres that stop cloth reading as a grid.
  for (let index = 0; index < Math.floor((width * height) / 900); index += 1) {
    const x = random() * width;
    const y = random() * height;
    context.strokeStyle = `rgba(255, 255, 255, ${0.06 + random() * 0.09})`;
    context.lineWidth = 0.35 + random() * 0.4;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + (random() - 0.5) * 2, y + 3 + random() * 13);
    context.stroke();
  }

  grainSheet = canvas;
  return canvas;
}

/** Page edges. The same stock in every book, which is also how books work. */
let paperTextureCache: THREE.CanvasTexture | null = null;

function getPaperTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  if (paperTextureCache) return paperTextureCache;

  const canvas = document.createElement("canvas");
  canvas.width = 96;
  canvas.height = 384;
  const context = canvas.getContext("2d");
  if (!context) return null;
  const random = seeded(0x85ebca6b);

  context.fillStyle = "#eee9dc";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Individual page edges, seen side on.
  for (let y = 0.5; y < canvas.height; y += 2) {
    const warm = Math.floor(116 + random() * 35);
    context.strokeStyle = `rgba(${warm}, ${warm - 6}, ${warm - 17}, ${0.09 + random() * 0.1})`;
    context.lineWidth = random() > 0.94 ? 1 : 0.42;
    context.beginPath();
    context.moveTo((random() - 0.5) * 4, y);
    context.bezierCurveTo(
      canvas.width * 0.33,
      y + (random() - 0.5) * 0.8,
      canvas.width * 0.66,
      y + (random() - 0.5) * 0.8,
      canvas.width + (random() - 0.5) * 4,
      y,
    );
    context.stroke();
  }

  for (let index = 0; index < 120; index += 1) {
    context.fillStyle = `rgba(112, 91, 59, ${0.025 + random() * 0.055})`;
    context.fillRect(
      random() * canvas.width,
      random() * canvas.height,
      0.5 + random() * 1.2,
      0.5 + random() * 2.5,
    );
  }

  const edgeShade = context.createLinearGradient(0, 0, canvas.width, 0);
  edgeShade.addColorStop(0, "rgba(96,72,42,.2)");
  edgeShade.addColorStop(0.08, "rgba(138,112,72,.035)");
  edgeShade.addColorStop(0.5, "rgba(255,255,255,.16)");
  edgeShade.addColorStop(0.92, "rgba(138,112,72,.035)");
  edgeShade.addColorStop(1, "rgba(96,72,42,.18)");
  context.fillStyle = edgeShade;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  paperTextureCache = texture;
  return texture;
}

// The cover artwork is laid out in a 512x768 design space. The canvas is
// smaller than that now, so everything after this point draws through a
// uniform scale rather than having every coordinate rewritten.
const COVER_DESIGN = { width: 512, height: 768 };
const SPINE_DESIGN = { width: 112, height: 768 };
const TEXTURE_SCALE = 0.625;

function coverTexture(book: BookLayout, face: "cover" | "spine") {
  if (typeof document === "undefined") return null;
  const design = face === "cover" ? COVER_DESIGN : SPINE_DESIGN;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(design.width * TEXTURE_SCALE);
  canvas.height = Math.round(design.height * TEXTURE_SCALE);
  const context = canvas.getContext("2d");
  if (!context) return null;

  // Texture passes work off the real pixel size; artwork works in design units.
  context.fillStyle = book.color;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const grain = getGrainSheet();
  if (grain) {
    context.save();
    context.globalCompositeOperation = "overlay";
    context.drawImage(grain, 0, 0, canvas.width, canvas.height);
    context.restore();
  }

  // The shading that makes a flat rectangle read as a bound board.
  const boardShade = context.createLinearGradient(0, 0, canvas.width, 0);
  boardShade.addColorStop(0, "rgba(0,0,0,.16)");
  boardShade.addColorStop(0.045, "rgba(0,0,0,.025)");
  boardShade.addColorStop(0.5, "rgba(255,255,255,.025)");
  boardShade.addColorStop(0.955, "rgba(0,0,0,.025)");
  boardShade.addColorStop(1, "rgba(0,0,0,.18)");
  context.fillStyle = boardShade;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.scale(TEXTURE_SCALE, TEXTURE_SCALE);

  context.fillStyle = book.foil;
  context.strokeStyle = book.foil;
  context.textBaseline = "top";
  context.shadowColor = "rgba(0, 0, 0, .3)";
  context.shadowBlur = 1.4;
  context.shadowOffsetX = 0.8;
  context.shadowOffsetY = 1.1;

  if (face === "cover") {
    const margin = 58;
    context.font = "500 22px Georgia, serif";
    context.fillText(book.date, margin, 58);

    context.font = "700 54px Georgia, serif";
    const words = book.title.split(/\s+/);
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const next = line ? `${line} ${word}` : word;
      if (context.measureText(next).width < design.width - margin * 2 || !line) line = next;
      else {
        lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
    lines.slice(0, 5).forEach((text, index) => context.fillText(text, margin, 180 + index * 61));
    context.fillRect(margin, 180 + Math.min(lines.length, 5) * 61 + 24, 92, 4);

    if (book.subtitle) {
      context.font = "400 21px Georgia, serif";
      context.globalAlpha = 0.72;
      const words2 = book.subtitle.split(/\s+/);
      const sub: string[] = [];
      let l2 = "";
      for (const word of words2) {
        const next = l2 ? `${l2} ${word}` : word;
        if (context.measureText(next).width < design.width - margin * 2 || !l2) l2 = next;
        else {
          sub.push(l2);
          l2 = word;
        }
      }
      if (l2) sub.push(l2);
      sub.slice(0, 3).forEach((text, i) => context.fillText(text, margin, 520 + i * 30));
      context.globalAlpha = 1;
    }

    context.font = "600 19px Georgia, serif";
    context.fillText("MUHAMMAD FARHAAN", margin, 690);
  } else {
    const gradient = context.createLinearGradient(0, 0, design.width, 0);
    gradient.addColorStop(0, "rgba(0,0,0,.28)");
    gradient.addColorStop(0.18, "rgba(0,0,0,0)");
    gradient.addColorStop(0.82, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,.28)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, design.width, design.height);

    context.fillStyle = book.foil;
    context.fillRect(22, 26, design.width - 44, 3);
    context.fillRect(22, 704, design.width - 44, 3);
    context.save();
    context.translate(design.width / 2, 58);
    context.rotate(Math.PI / 2);
    context.font = "700 36px Georgia, serif";
    const title = book.title.length > 34 ? `${book.title.slice(0, 32)}…` : book.title;
    context.fillText(title, 0, 13);
    context.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function damp(current: number, target: number, speed: number, delta: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-speed * delta));
}

const BOOK_ENTER_DURATION = 520;
const BOOK_EXIT_DURATION = 400;

function bezierCoordinate(t: number, point1: number, point2: number) {
  const inverse = 1 - t;
  return 3 * inverse * inverse * t * point1 + 3 * inverse * t * t * point2 + t * t * t;
}

function easeSmoothOut(progress: number) {
  let t = progress;
  for (let iteration = 0; iteration < 5; iteration += 1) {
    const x = bezierCoordinate(t, 0.22, 0.36);
    const inverse = 1 - t;
    const slope =
      3 * inverse * inverse * 0.22 + 6 * inverse * t * (0.36 - 0.22) + 3 * t * t * (1 - 0.36);
    if (Math.abs(slope) < 0.0001) break;
    t = THREE.MathUtils.clamp(t - (x - progress) / slope, 0, 1);
  }
  return bezierCoordinate(t, 1, 1);
}

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - ((-2 * progress + 2) ** 3) / 2;
}

function Book({
  book,
  index,
  hovered,
  selected,
  reducedMotion,
  cameraX,
  orbit,
  onHover,
  onSelect,
}: {
  book: BookLayout;
  index: number;
  hovered: boolean;
  selected: boolean;
  reducedMotion: boolean;
  cameraX: React.RefObject<number>;
  orbit: React.RefObject<{ yaw: number; pitch: number }>;
  onHover: (index: number | null) => void;
  onSelect: (index: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const focusFlight = useRef<{
    startedAt: number;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    scale: number;
  } | null>(null);
  const exitFlight = useRef<{
    startedAt: number;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    scale: number;
  } | null>(null);
  const selectedAt = useRef(0);
  const wasSelected = useRef(false);

  const textures = useMemo(
    () => ({
      cover: coverTexture(book, "cover"),
      spine: coverTexture(book, "spine"),
      paper: getPaperTexture(),
    }),
    [book],
  );

  const geometry = useMemo(
    () =>
      new RoundedBoxGeometry(
        book.width,
        book.bookHeight,
        book.depth,
        2,
        Math.min(book.width, 0.09),
      ),
    [book.bookHeight, book.depth, book.width],
  );

  useEffect(() => {
    return () => {
      textures.cover?.dispose();
      textures.spine?.dispose();
      geometry.dispose();
    };
  }, [geometry, textures]);

  useEffect(() => {
    const node = group.current;
    if (selected && node) {
      selectedAt.current = performance.now();
      focusFlight.current = {
        startedAt: selectedAt.current,
        position: node.position.clone(),
        rotation: node.rotation.clone(),
        scale: node.scale.x,
      };
      exitFlight.current = null;
    } else if (wasSelected.current && node) {
      exitFlight.current = {
        startedAt: performance.now(),
        position: node.position.clone(),
        rotation: node.rotation.clone(),
        scale: node.scale.x,
      };
      focusFlight.current = null;
    } else {
      focusFlight.current = null;
    }
    wasSelected.current = selected;
  }, [selected]);

  useFrame((_, delta) => {
    const node = group.current;
    if (!node) return;
    const motion = reducedMotion ? 1000 : selected ? 7 : 11;
    const selectedFor = (performance.now() - selectedAt.current) / 1000;
    const autoYaw = selected && !reducedMotion ? Math.sin(selectedFor * 0.85) * 0.3 : 0;
    const autoPitch = selected && !reducedMotion ? Math.sin(selectedFor * 0.55) * 0.04 : 0;
    const targetX = selected ? cameraX.current : book.x;
    const targetY = selected ? 2.06 : book.bookHeight / 2 + (hovered ? 0.3 : 0);
    const targetZ = selected ? 1.8 : hovered ? 0.26 : 0;
    const targetScale = selected ? 0.96 : 1;
    const targetRotationY = selected ? -Math.PI / 2 + orbit.current.yaw + autoYaw : 0;
    const targetRotationX = selected ? orbit.current.pitch + autoPitch : 0;

    const flight = selected ? focusFlight.current : null;
    if (flight) {
      const progress = reducedMotion
        ? 1
        : Math.min(1, (performance.now() - flight.startedAt) / BOOK_ENTER_DURATION);
      const depthProgress = easeSmoothOut(progress);
      const travelProgress = easeSmoothOut(THREE.MathUtils.clamp((progress - 0.06) / 0.94, 0, 1));
      const turnProgress = easeInOutCubic(progress);
      const depthArc = Math.sin(Math.PI * progress) * 0.12;
      node.position.set(
        THREE.MathUtils.lerp(flight.position.x, targetX, travelProgress),
        THREE.MathUtils.lerp(flight.position.y, targetY, travelProgress),
        THREE.MathUtils.lerp(flight.position.z, targetZ, depthProgress) + depthArc,
      );
      node.rotation.x = THREE.MathUtils.lerp(flight.rotation.x, targetRotationX, turnProgress);
      node.rotation.y = THREE.MathUtils.lerp(flight.rotation.y, targetRotationY, turnProgress);
      node.rotation.z = THREE.MathUtils.lerp(flight.rotation.z, 0, turnProgress);
      node.scale.setScalar(THREE.MathUtils.lerp(flight.scale, targetScale, turnProgress));
      if (progress >= 1) focusFlight.current = null;
    } else if (!selected && exitFlight.current) {
      const exit = exitFlight.current;
      const progress = reducedMotion
        ? 1
        : Math.min(1, (performance.now() - exit.startedAt) / BOOK_EXIT_DURATION);
      const alignProgress = easeSmoothOut(progress);
      const slotProgress = easeSmoothOut(THREE.MathUtils.clamp((progress - 0.3) / 0.7, 0, 1));
      node.position.set(
        THREE.MathUtils.lerp(exit.position.x, book.x, alignProgress),
        THREE.MathUtils.lerp(exit.position.y, book.bookHeight / 2, alignProgress),
        THREE.MathUtils.lerp(exit.position.z, 0, slotProgress),
      );
      node.rotation.x = THREE.MathUtils.lerp(exit.rotation.x, 0, alignProgress);
      node.rotation.y = THREE.MathUtils.lerp(exit.rotation.y, 0, alignProgress);
      node.rotation.z = THREE.MathUtils.lerp(exit.rotation.z, 0, alignProgress);
      node.scale.setScalar(THREE.MathUtils.lerp(exit.scale, 1, alignProgress));
      if (progress >= 1) exitFlight.current = null;
    } else {
      node.position.x = damp(node.position.x, targetX, motion, delta);
      node.position.y = damp(node.position.y, targetY, motion, delta);
      node.position.z = damp(node.position.z, targetZ, motion, delta);
      node.rotation.y = damp(node.rotation.y, targetRotationY, motion, delta);
      node.rotation.x = damp(node.rotation.x, targetRotationX, motion, delta);
      node.scale.setScalar(damp(node.scale.x, targetScale, motion, delta));
    }
  });

  return (
    <group
      ref={group}
      position={[book.x, book.bookHeight / 2, 0]}
      onPointerEnter={(event) => {
        event.stopPropagation();
        onHover(index);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        onHover(null);
        document.body.style.cursor = "";
      }}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        onSelect(index);
      }}
    >
      <mesh geometry={geometry} renderOrder={selected ? 20 : 0}>
        <meshStandardMaterial
          attach="material-0"
          map={textures.cover ?? undefined}
          color={textures.cover ? "#ffffff" : book.color}
          roughness={0.8}
          metalness={0.015}
          bumpMap={textures.cover ?? undefined}
          bumpScale={0.007}
          depthTest={!selected}
          depthWrite={!selected}
        />
        <meshStandardMaterial
          attach="material-1"
          color={book.color}
          roughness={0.84}
          bumpMap={textures.cover ?? undefined}
          bumpScale={0.006}
          depthTest={!selected}
          depthWrite={!selected}
        />
        <meshStandardMaterial
          attach="material-2"
          map={textures.paper ?? undefined}
          color={textures.paper ? "#f1eadc" : "#e9e4d8"}
          roughness={0.93}
          bumpMap={textures.paper ?? undefined}
          bumpScale={0.008}
          depthTest={!selected}
          depthWrite={!selected}
        />
        <meshStandardMaterial
          attach="material-3"
          map={textures.paper ?? undefined}
          color={textures.paper ? "#ece3d3" : "#ddd7ca"}
          roughness={0.96}
          bumpMap={textures.paper ?? undefined}
          bumpScale={0.006}
          depthTest={!selected}
          depthWrite={!selected}
        />
        <meshStandardMaterial
          attach="material-4"
          map={textures.spine ?? undefined}
          color={textures.spine ? "#ffffff" : book.color}
          roughness={0.8}
          metalness={0.015}
          bumpMap={textures.spine ?? undefined}
          bumpScale={0.007}
          depthTest={!selected}
          depthWrite={!selected}
        />
        <meshStandardMaterial
          attach="material-5"
          map={textures.paper ?? undefined}
          color={textures.paper ? "#f3eadc" : "#e6e0d4"}
          roughness={0.94}
          bumpMap={textures.paper ?? undefined}
          bumpScale={0.007}
          depthTest={!selected}
          depthWrite={!selected}
        />
      </mesh>
    </group>
  );
}

/**
 * The board the books stand on.
 *
 * Grain runs along the length, because a plank is cut that way and a shelf with
 * vertical grain reads as wrong even to people who could not say why. Built
 * once and cached: it is the same board every time.
 */
let woodTextureCache: THREE.CanvasTexture | null = null;

function getWoodTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;
  if (woodTextureCache) return woodTextureCache;

  const width = 1024;
  const height = 128;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return null;
  const random = seeded(0xc0ffee);

  context.fillStyle = "#6b4c33";
  context.fillRect(0, 0, width, height);

  // Grain: long, near-horizontal lines that wander slightly, as rings do.
  for (let index = 0; index < 220; index += 1) {
    const y = random() * height;
    const dark = random() > 0.72;
    context.strokeStyle = dark
      ? `rgba(32, 20, 11, ${0.18 + random() * 0.24})`
      : `rgba(150, 116, 82, ${0.07 + random() * 0.12})`;
    context.lineWidth = dark ? 0.7 + random() * 1.5 : 0.5 + random() * 1.1;
    context.beginPath();
    context.moveTo(-10, y);
    let x = -10;
    let cursor = y;
    while (x < width + 10) {
      const step = 60 + random() * 120;
      cursor += (random() - 0.5) * 6;
      context.quadraticCurveTo(x + step / 2, cursor + (random() - 0.5) * 5, x + step, cursor);
      x += step;
    }
    context.stroke();
  }

  // A couple of knots, so the board is not a uniform pattern.
  for (let index = 0; index < 3; index += 1) {
    const kx = random() * width;
    const ky = random() * height;
    for (let ring = 0; ring < 7; ring += 1) {
      context.strokeStyle = `rgba(28, 17, 9, ${0.2 - ring * 0.022})`;
      context.lineWidth = 0.8;
      context.beginPath();
      context.ellipse(kx, ky, 3 + ring * 3.4, 2 + ring * 1.7, 0, 0, Math.PI * 2);
      context.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  woodTextureCache = texture;
  return texture;
}

function Shelf({ span }: { span: { min: number; max: number } }) {
  const wood = useMemo(() => getWoodTexture(), []);
  // Run well past the last book on both sides, so the board leaves the frame
  // rather than stopping in mid air.
  const width = span.max - span.min + 26;
  const centre = (span.min + span.max) / 2;
  const thickness = 0.34;
  const depth = 3.1;

  return (
    <group position={[centre, -thickness / 2, 0]}>
      <mesh>
        <boxGeometry args={[width, thickness, depth]} />
        <meshStandardMaterial
          map={wood ?? undefined}
          color={wood ? "#ffffff" : "#6b4c33"}
          roughness={0.82}
          metalness={0}
          bumpMap={wood ?? undefined}
          bumpScale={0.012}
        />
      </mesh>
      {/* A darker line where the board meets the books, so they sit rather than hover. */}
      <mesh position={[0, thickness / 2 + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth * 0.62]} />
        <meshBasicMaterial color="#3a2614" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

function CameraRig({ target }: { target: React.RefObject<number> }) {
  const { camera } = useThree();
  useFrame((_, delta) => {
    camera.position.x = damp(camera.position.x, target.current, 8, delta);
    camera.lookAt(camera.position.x, 1.88, 0);
  });
  return null;
}

function nearestBook(books: BookLayout[], x: number) {
  let nearest = 0;
  let distance = Number.POSITIVE_INFINITY;
  books.forEach((book, index) => {
    const next = Math.abs(book.x - x);
    if (next < distance) {
      nearest = index;
      distance = next;
    }
  });
  return nearest;
}

export function Bookshelf({ items, className, height = 620, onOpen, onFocus }: BookshelfProps) {
  const books = useMemo(() => deriveLayout(items), [items]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [stageWidth, setStageWidth] = useState(1000);
  const [onScreen, setOnScreen] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const cameraX = useRef(0);
  const orbit = useRef({ yaw: 0, pitch: 0 });
  const gesture = useRef<{
    mode: "pending" | "drag" | "orbit";
    x: number;
    y: number;
    startX: number;
  } | null>(null);
  const switchTimer = useRef<number | null>(null);
  const pendingSelection = useRef<number | null>(null);
  const suppressClick = useRef(false);

  const getBounds = useCallback(() => {
    const last = books.at(-1)?.x ?? 0;
    const aspect = stageWidth / Math.max(420, typeof height === "number" ? height : 620);
    const visibleSpan = 2 * 10 * Math.tan((35 * Math.PI) / 360) * aspect;
    const inset = visibleSpan * 0.31;
    const min = Math.min(last / 2, (books[0]?.x ?? 0) + inset);
    const max = Math.max(last / 2, last - inset);
    return max <= min
      ? { min: last / 2, max: last / 2, visibleSpan }
      : { min, max, visibleSpan };
  }, [books, height, stageWidth]);

  const moveCamera = useCallback(
    (next: number) => {
      const bounds = getBounds();
      cameraX.current = THREE.MathUtils.clamp(next, bounds.min, bounds.max);
      setCurrentIndex(nearestBook(books, cameraX.current));
    },
    [books, getBounds],
  );

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(motion.matches);
    update();
    motion.addEventListener("change", update);
    const stage = stageRef.current;
    if (!stage) return () => motion.removeEventListener("change", update);

    const resize = new ResizeObserver(([entry]) => {
      if (entry) setStageWidth(entry.contentRect.width);
    });
    resize.observe(stage);

    // A shelf nobody is looking at should not be rendering three dimensions.
    const visibility = new IntersectionObserver(
      ([entry]) => setOnScreen(Boolean(entry?.isIntersecting)),
      { rootMargin: "150px" },
    );
    visibility.observe(stage);

    return () => {
      resize.disconnect();
      visibility.disconnect();
      motion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const bounds = getBounds();
    cameraX.current = bounds.min;
    setCurrentIndex(nearestBook(books, bounds.min));
  }, [books, getBounds]);

  useEffect(
    () => () => {
      if (switchTimer.current !== null) window.clearTimeout(switchTimer.current);
      document.body.style.cursor = "";
    },
    [],
  );

  const presentBook = useCallback(
    (index: number) => {
      moveCamera(books[index]!.x);
      orbit.current = { yaw: 0, pitch: 0 };
      setHoveredIndex(null);
      setSelectedIndex(index);
      onFocus?.(books[index]!, index);
    },
    [books, moveCamera, onFocus],
  );

  const selectBook = useCallback(
    (index: number) => {
      if (suppressClick.current) return;

      // Already out of the shelf and facing us: open it.
      if (selectedIndex === index) {
        onOpen?.(books[index]!, index);
        return;
      }

      if (selectedIndex !== null) {
        pendingSelection.current = index;
        moveCamera(books[index]!.x);
        setHoveredIndex(null);
        setSelectedIndex(null);
        orbit.current = { yaw: 0, pitch: 0 };
        if (switchTimer.current !== null) window.clearTimeout(switchTimer.current);
        switchTimer.current = window.setTimeout(
          () => {
            const next = pendingSelection.current;
            pendingSelection.current = null;
            switchTimer.current = null;
            if (next !== null) presentBook(next);
          },
          reducedMotion ? 0 : BOOK_EXIT_DURATION,
        );
        return;
      }

      if (switchTimer.current !== null) {
        pendingSelection.current = index;
        return;
      }

      presentBook(index);
    },
    [books, moveCamera, onOpen, presentBook, reducedMotion, selectedIndex],
  );

  const close = useCallback(() => {
    setSelectedIndex(null);
    orbit.current = { yaw: 0, pitch: 0 };
    stageRef.current?.focus({ preventScroll: true });
  }, []);

  const switchFocused = useCallback(
    (direction: number) => {
      if (selectedIndex === null) return;
      const next = THREE.MathUtils.clamp(selectedIndex + direction, 0, books.length - 1);
      if (next !== selectedIndex) selectBook(next);
    },
    [books.length, selectBook, selectedIndex],
  );

  const pointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button, a")) return;
    gesture.current = {
      mode: "pending",
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
    };
  };

  const pointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (tooltipRef.current && rect) {
      tooltipRef.current.style.left = `${event.clientX - rect.left}px`;
      tooltipRef.current.style.top = `${event.clientY - rect.top}px`;
    }
    const active = gesture.current;
    if (!active) return;
    const dx = event.clientX - active.x;
    const dy = event.clientY - active.y;
    if (active.mode === "pending" && Math.hypot(event.clientX - active.startX, dy) > 7) {
      active.mode = selectedIndex === null ? "drag" : "orbit";
      suppressClick.current = true;
      stageRef.current?.setPointerCapture(event.pointerId);
      setHoveredIndex(null);
    }
    if (active.mode === "drag") {
      moveCamera(cameraX.current - dx * 0.0085);
    } else if (active.mode === "orbit") {
      orbit.current.yaw = THREE.MathUtils.clamp(orbit.current.yaw + dx * 0.006, -0.62, 0.62);
      orbit.current.pitch = THREE.MathUtils.clamp(orbit.current.pitch + dy * 0.004, -0.28, 0.28);
    }
    active.x = event.clientX;
    active.y = event.clientY;
  };

  const pointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (stageRef.current?.hasPointerCapture(event.pointerId)) {
      stageRef.current.releasePointerCapture(event.pointerId);
    }
    gesture.current = null;
    window.requestAnimationFrame(() => {
      suppressClick.current = false;
    });
  };

  const selectedBook = selectedIndex === null ? null : books[selectedIndex];
  const hovered = hoveredIndex === null ? null : books[hoveredIndex];
  const bounds = getBounds();

  return (
    <section
      className={cn("relative isolate w-full overflow-hidden", className)}
      style={{ height } as CSSProperties}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-label={
          selectedBook
            ? `${selectedBook.title} is out of the shelf. Activate again to open it, or press Escape to put it back.`
            : `A shelf of ${books.length} projects. Use the arrow keys to move along it and Enter to take one out.`
        }
        className="relative h-full w-full touch-pan-y overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-signal-ink)]"
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={pointerUp}
        onPointerLeave={() => {
          gesture.current = null;
          setHoveredIndex(null);
        }}
        onWheel={(event) => {
          if (selectedIndex !== null) return;
          const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
          if (horizontal || event.shiftKey) {
            moveCamera(cameraX.current + (horizontal ? event.deltaX : event.deltaY) * 0.012);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape" && selectedIndex !== null) {
            event.preventDefault();
            close();
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            if (selectedIndex !== null) switchFocused(1);
            else moveCamera(cameraX.current + bounds.visibleSpan * 0.23);
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            if (selectedIndex !== null) switchFocused(-1);
            else moveCamera(cameraX.current - bounds.visibleSpan * 0.23);
          } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (selectedIndex === null) selectBook(currentIndex);
            else onOpen?.(books[selectedIndex]!, selectedIndex);
          }
        }}
      >
        <Canvas
          camera={{ fov: 35, near: 0.1, far: 60, position: [cameraX.current, 2.65, 10] }}
          dpr={[1, 1]}
          frameloop={onScreen ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onPointerMissed={() => {
            if (selectedIndex !== null) close();
          }}
        >
          <CameraRig target={cameraX} />
          <Shelf span={{ min: books[0]?.x ?? 0, max: books.at(-1)?.x ?? 0 }} />
          <ambientLight intensity={1.45} />
          <hemisphereLight args={["#ffffff", "#c3c9da", 1.2]} />
          <directionalLight position={[5, 8, 7]} intensity={2.1} />
          {books.map((book, index) => (
            <Book
              key={book.id}
              book={book}
              index={index}
              hovered={hoveredIndex === index && selectedIndex === null}
              selected={selectedIndex === index}
              reducedMotion={reducedMotion}
              cameraX={cameraX}
              orbit={orbit}
              onHover={setHoveredIndex}
              onSelect={selectBook}
            />
          ))}
        </Canvas>

        {/* The name, revealed on hover, as the book lifts out of the row. */}
        <div
          ref={tooltipRef}
          aria-hidden
          className={cn(
            "pointer-events-none absolute z-20 w-[290px] -translate-x-1/2 -translate-y-[calc(100%+18px)] bg-ink px-4 py-3 text-paper shadow-xl transition-opacity duration-150",
            hovered && selectedIndex === null ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="display text-[18px] leading-tight">{hovered?.title}</span>
          <span className="tabular ml-2 text-[12px] text-paper/45">{hovered?.date}</span>
          {/* What the project actually is, so a spine is not the only clue. */}
          {hovered?.subtitle && (
            <span className="mt-2 block border-t border-paper/15 pt-2 text-[13px] leading-snug text-paper/70">
              {hovered.subtitle}
            </span>
          )}
        </div>

        {/* The instruction, only while a book is out and waiting to be opened. */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-5 z-20 flex justify-center transition-opacity duration-300",
            selectedBook ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="smallcaps bg-ink/85 px-4 py-2 text-[13px] text-paper">
            Click it again to open
          </span>
        </div>
      </div>
    </section>
  );
}

export default Bookshelf;
