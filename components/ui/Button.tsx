"use client";

import React from "react";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "inverse" | "tertiary";

const sizeClass: Record<Size, string> = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-[14px]",
  lg: "px-6 py-3 text-[14px] md:px-8 md:py-3.5 md:text-[15px]",
};

const variantClass: Record<Variant, string> = {
  primary: "bg-[#111110] text-white hover:bg-[#2a2a28]",
  inverse: "bg-white text-[#111110] hover:bg-[#F5F5F3]",
  tertiary: "bg-transparent text-[#111110] border border-[#111110] hover:bg-[#111110] hover:text-white",
};

const base =
  "inline-flex items-center justify-center rounded-full font-medium tracking-[-0.01em] cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

type CommonProps = {
  size?: Size;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { size = "md", variant = "primary", className = "", children, ...rest } = props;
  const cls = `${base} ${sizeClass[size]} ${variantClass[variant]} ${className}`.trim();

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
