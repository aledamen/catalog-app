import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border-ink bg-ink text-white hover:bg-carbon disabled:border-zinc-300 disabled:bg-zinc-300 disabled:text-zinc-500",
  secondary:
    "border-transparent bg-gradient-to-r from-accent to-accent-deep text-white hover:opacity-90 disabled:from-zinc-300 disabled:to-zinc-300 disabled:text-zinc-500",
  ghost:
    "border-zinc-200 bg-white text-ink hover:bg-mist disabled:bg-white disabled:text-zinc-400"
};

const baseStyles =
  "inline-flex h-11 items-center justify-center whitespace-nowrap rounded-lg border px-5 text-sm font-semibold transition-all";

export function Button({
  children,
  href,
  type = "button",
  onClick,
  disabled,
  variant = "primary",
  className = ""
}: ButtonProps) {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  if (href) {
    return (
      <Link className={styles} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
