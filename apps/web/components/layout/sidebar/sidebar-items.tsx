import Link from "next/link"
import { type SVGProps } from "react"

type SidebarItemsProps = {
  className?: string
  icon: React.ComponentType<SVGProps<SVGSVGElement>>
  title: string
  active?: boolean
  onClick?: () => void
  href: string
}

export const SidebarItems = ({
  className,
  icon: Icon,
  title,
  active,
  onClick,
  href,
}: SidebarItemsProps) => {
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`flex w-full cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-[13px] font-medium tracking-tighter transition-all duration-200 ease-out active:scale-[0.98] ${
        active
          ? "bg-neutral-200/30 text-blue-600 dark:bg-muted/40 dark:text-white"
          : "text-foreground/70 hover:bg-neutral-200/30 hover:text-blue-600 dark:text-sidebar-ring dark:hover:bg-muted/40 dark:hover:text-white"
      } ${className ?? ""}`}
    >
      <Icon />
      <span className="mt-0.5">{title}</span>
    </Link>
  )
}
