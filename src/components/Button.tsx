
import { ReactNode } from 'react'

export function Button({ children, variant = "primary", href }: { children: ReactNode; variant?: "primary" | "ghost"; href?: string }) {
  const base = variant === "primary" ? "btn-primary" : "btn-ghost"
  if (href) return <a href={href} className={base}>{children}</a>
  return <button className={base}>{children}</button>
}
