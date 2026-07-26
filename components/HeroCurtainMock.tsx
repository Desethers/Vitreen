"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroCurtainMock({
  children,
  cropFromBottomOnMobile = false,
}: {
  children: ReactNode;
  cropFromBottomOnMobile?: boolean;
}) {
  const [dashboardWidth] = useState(82);
  const [dashboardPosition, setDashboardPosition] = useState({ x: 50, y: 50 });
  const [dashboardHalfHeight, setDashboardHalfHeight] = useState(40);
  const [curtain, setCurtain] = useState(0);
  const [curtainLeft, setCurtainLeft] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      const stage = stageRef.current;
      const dash = dashboardRef.current;
      if (!stage || !dash || !stage.offsetHeight) return;
      const half = ((dash.offsetHeight / stage.offsetHeight) * 100) / 2;
      setDashboardHalfHeight(half);
      setDashboardPosition((p) => clamp(p.x, p.y, dashboardWidth, half));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardWidth]);

  const clamp = (x: number, y: number, w = dashboardWidth, hh = dashboardHalfHeight) => ({
    x: Math.max(w / 2, Math.min(100 - w / 2, x)),
    y: Math.max(Math.min(50, hh), Math.min(Math.max(50, 100 - hh), y)),
  });

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY,
      sp = dashboardPosition;
    const onMove = (me: MouseEvent) =>
      setDashboardPosition(
        clamp(
          sp.x + ((me.clientX - sx) / rect.width) * 100,
          sp.y + ((me.clientY - sy) / rect.height) * 100
        )
      );
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const startResizeRight = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const dw = dashboardRef.current?.offsetWidth ?? 1;
    const sx = e.clientX,
      sc = curtain;
    const onMove = (me: MouseEvent) =>
      setCurtain(Math.max(0, Math.min(72, 80 - curtainLeft, sc + ((sx - me.clientX) / dw) * 100)));
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const startResizeLeft = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const dw = dashboardRef.current?.offsetWidth ?? 1;
    const sx = e.clientX,
      sc = curtainLeft;
    const onMove = (me: MouseEvent) =>
      setCurtainLeft(Math.max(0, Math.min(72, 80 - curtain, sc + ((me.clientX - sx) / dw) * 100)));
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <motion.div
      ref={stageRef}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className="absolute inset-0 overflow-visible bg-transparent"
    >
      <motion.div
        ref={dashboardRef}
        className={`absolute ${
          cropFromBottomOnMobile
            ? "left-[15px] top-[15px] w-[680px] translate-x-0 translate-y-0 md:left-[var(--dashboard-left)] md:top-[var(--dashboard-top)] md:w-[var(--dashboard-width)] md:-translate-x-1/2 md:-translate-y-1/2"
            : "left-[var(--dashboard-left)] top-[var(--dashboard-top)] w-[var(--dashboard-width)] -translate-x-1/2 -translate-y-1/2"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.05 }}
        style={
          {
            "--dashboard-top": `${dashboardPosition.y}%`,
            "--dashboard-left": `${dashboardPosition.x}%`,
            "--dashboard-width": `${dashboardWidth}%`,
            transformOrigin: "center",
            zIndex: 1,
          } as CSSProperties
        }
      >
        {/* Curtain clip wrapper */}
        <div
          style={{
            marginLeft: `${curtainLeft}%`,
            width: `${100 - curtain - curtainLeft}%`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(100 / (100 - curtain - curtainLeft)) * 100}%`,
              marginLeft: `${(-curtainLeft / (100 - curtain - curtainLeft)) * 100}%`,
            }}
          >
            <div
              className="overflow-hidden rounded-[10px] shadow-[0_24px_60px_rgba(0,0,0,0.14)]"
              style={{ height: "640px" }}
            >
              {children}
            </div>
          </div>
        </div>

        {/* Drag handle — top bar */}
        <div
          className="absolute left-0 right-0 top-0 hidden h-7 cursor-move items-center justify-center rounded-t-[10px] md:flex"
          onMouseDown={startDrag}
          aria-hidden="true"
        >
          <div className="h-[3px] w-8 rounded-full bg-[#111110]/18 shadow-[0_0_0_1px_rgba(255,255,255,0.45)]" />
        </div>

        {/* Left resize handle */}
        <div
          className="absolute bottom-0 top-0 hidden w-4 cursor-ew-resize items-center justify-center md:flex"
          style={{ left: `${curtainLeft}%` }}
          onMouseDown={startResizeLeft}
          aria-hidden="true"
        >
          <div className="h-9 w-[3px] rounded-full bg-[#111110]/20 shadow-[0_0_0_1px_rgba(255,255,255,0.55)]" />
        </div>
        <div
          className="absolute bottom-2 hidden h-5 w-5 cursor-ew-resize items-center justify-center rounded-full border border-white/50 bg-white/60 text-[10px] text-[#111110]/45 shadow-[0_8px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm md:flex"
          style={{ left: `calc(${curtainLeft}% + 0.5rem)` }}
          onMouseDown={startResizeLeft}
          aria-hidden="true"
        >
          ↔
        </div>

        {/* Right resize handle */}
        <div
          className="absolute bottom-0 top-0 hidden w-4 cursor-ew-resize items-center justify-center md:flex"
          style={{ right: `${curtain}%` }}
          onMouseDown={startResizeRight}
          aria-hidden="true"
        >
          <div className="h-9 w-[3px] rounded-full bg-[#111110]/20 shadow-[0_0_0_1px_rgba(255,255,255,0.55)]" />
        </div>
        <div
          className="absolute bottom-2 hidden h-5 w-5 cursor-ew-resize items-center justify-center rounded-full border border-white/50 bg-white/60 text-[10px] text-[#111110]/45 shadow-[0_8px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm md:flex"
          style={{ right: `calc(${curtain}% + 0.5rem)` }}
          onMouseDown={startResizeRight}
          aria-hidden="true"
        >
          ↔
        </div>
      </motion.div>
    </motion.div>
  );
}
