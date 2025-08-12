
import { ReactNode } from 'react'

export function Button({ children, variant = "primary", href, className = "" }: { children: ReactNode; variant?: "primary" | "ghost"; href?: string; className?: string }) {
  const base = variant === "primary" ? "btn-primary" : "btn-ghost"
  const combinedClass = `${base} ${className}`.trim()
  if (href) return <a href={href} className={combinedClass}>{children}</a>
  return <button className={combinedClass}>{children}</button>
}
