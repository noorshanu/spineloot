
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonProps =
  | ({
      children: ReactNode;
      variant?: "primary" | "ghost";
      className?: string;
      href?: undefined;
    } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({
      children: ReactNode;
      variant?: "primary" | "ghost";
      className?: string;
      href: string;
    } & AnchorHTMLAttributes<HTMLAnchorElement>);

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "", href, ...rest } = props as any;
  const base = variant === "primary" ? "btn-primary" : "btn-ghost";
  const combinedClass = `${base} ${className}`.trim();

  if (href) {
    // Only pass anchor props
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={combinedClass} {...anchorProps}>
        {children}
      </a>
    );
  }
  // Only pass button props
  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={combinedClass} {...buttonProps}>
      {children}
    </button>
  );
}
