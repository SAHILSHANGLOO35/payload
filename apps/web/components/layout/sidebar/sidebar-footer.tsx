"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronsUpDown, LogOut } from "lucide-react"
import { SiGithub } from "react-icons/si"

import { useAuthStore } from "@/stores/auth-store"

export const SidebarFooter = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const openLogin = useAuthStore((state) => state.openLogin)
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const checkAuth = useAuthStore((state) => state.checkAuth)
  const logout = useAuthStore((state) => state.logout)

  const logoutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logoutRef.current &&
        !logoutRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
  }

  return (
    <div className="flex flex-col gap-1">
      <Link
        href="https://github.com/SAHILSHANGLOO35/payload"
        target="_blank"
        draggable="false"
        className="mb-2 flex h-full cursor-pointer items-center gap-2 rounded-md bg-muted-foreground/10 px-2 py-1 font-geist text-[13px] transition-all duration-200 ease-in-out hover:bg-primary/10 hover:text-primary dark:text-neutral-400 dark:hover:text-white"
      >
        <SiGithub className="size-4" />
        <span className="pt-0.5 tracking-tight">Built in Public</span>
      </Link>

      {isLoading ? (
        <div className="h-40 animate-pulse rounded-md bg-muted-foreground/10" />
      ) : user ? (
        <div className="relative" ref={logoutRef}>
          {/* DROPDOWN */}
          {menuOpen && (
            <div className="absolute bottom-full left-0 z-50 mb-2 w-full overflow-hidden rounded-md border bg-sidebar shadow-xl">
              {/* User */}
              <div className="flex items-center gap-3 p-3">
                {user.avatarUrl ? (
                  /* eslint-disable @next/next/no-img-element */
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName}
                    className="size-10 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted font-semibold">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate font-geist text-sm font-medium">
                    {user.fullName}
                  </p>

                  <p className="truncate font-instrument-serif text-[13px] font-medium tracking-wider text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="border-t" />

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 font-geist text-sm transition-colors duration-150 ease-in-out hover:bg-muted"
              >
                <LogOut className="size-4 text-muted-foreground" />
                <span>Log out</span>
              </button>
            </div>
          )}

          {/* MAIN USER BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex w-full cursor-pointer items-center gap-3 rounded-md bg-muted-foreground/10 p-2 font-geist transition-all hover:bg-primary/10"
          >
            {user.avatarUrl ? (
              /* eslint-disable @next/next/no-img-element */
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                className="size-10 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted font-semibold">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col items-start">
              <span className="w-full truncate text-left text-sm font-medium">
                {user.fullName}
              </span>

              <span className="w-full truncate text-left font-instrument-serif text-[13px] font-medium tracking-wider text-muted-foreground">
                {user.email}
              </span>
            </div>

            <ChevronsUpDown className="size-4 shrink-0" />
          </button>
        </div>
      ) : (
        <div className="flex h-40 flex-col gap-2 rounded-md bg-muted-foreground/10 p-4 font-geist text-[13px]">
          <span className="font-instrument-serif text-lg font-semibold tracking-wide">
            Login
          </span>

          <span className="text-xs font-normal text-muted-foreground">
            Create an account to keep everything backed up and easy to access.
          </span>

          <button
            type="button"
            onClick={openLogin}
            className="flex cursor-pointer items-center justify-center rounded-md bg-blue-600 py-1.5 text-sm font-medium text-white transition-all hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      )}
    </div>
  )
}
