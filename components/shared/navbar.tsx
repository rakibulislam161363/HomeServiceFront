"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  Wrench,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ThemeToggle from "@/components/shared/ThemeToggle";
import { User } from "@/lib/types";
import { logout } from "@/service/logOut";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Technicians",
    href: "/technicians",
  },
];

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const router = useRouter();

  // Safe role
  const role = user?.role?.toLowerCase();

  const dashboardPath = role
    ? `/dashboard/${role}`
    : "/login";

  // User initials
  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  // Logout
  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      await logout();

      setOpen(false);

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Wrench className="h-5 w-5" />
          </div>

          <div className="leading-none">
            <h1 className="text-lg font-bold tracking-tight">
              FixIt
              <span className="text-primary">Now</span>
            </h1>

            <p className="hidden text-[10px] text-muted-foreground sm:block">
              Your Trusted Home Service
            </p>
          </div>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ================= DESKTOP RIGHT ================= */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />

          {user ? (
            /* =============== LOGGED IN =============== */
            <DropdownMenu>
              <DropdownMenuTrigger
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {initials}
                </div>

                {/* User Info */}
                <div className="hidden text-left lg:block">
                  <p className="max-w-32 truncate text-sm font-medium">
                    {user.name}
                  </p>

                  <p className="text-[10px] uppercase text-muted-foreground">
                    {user.role ?? "USER"}
                  </p>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-60"
              >
                {/* User Information */}
                <div className="px-3 py-2">
                  <p className="truncate text-sm font-semibold">
                    {user.name}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>

                  <p className="mt-1 text-xs font-medium uppercase text-primary">
                    {user.role ?? "USER"}
                  </p>
                </div>

                <DropdownMenuSeparator />

                {/* Profile */}
                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                >
                  <UserRound className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>

                {/* Dashboard */}
                <DropdownMenuItem
                  onClick={() => router.push(dashboardPath)}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                  disabled={loggingOut}
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />

                  {loggingOut ? "Logging out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* =============== LOGGED OUT =============== */
            <>
              <Link href="/login">
                <Button variant="ghost">
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button>
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* ================= MOBILE RIGHT ================= */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />

          {/* Mobile Avatar */}
          {user && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {initials}
            </div>
          )}

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="border-t bg-background md:hidden">
          <nav className="container mx-auto px-4 py-4">

            {/* Links */}
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 border-t pt-4">

              {user ? (
                /* =============== MOBILE LOGGED IN =============== */
                <div className="space-y-2">

                  {/* User Card */}
                  <div className="mb-3 flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user.name}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>

                      <p className="text-xs font-medium uppercase text-primary">
                        {user.role ?? "USER"}
                      </p>
                    </div>
                  </div>

                  {/* Dashboard */}
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setOpen(false);
                      router.push(dashboardPath);
                    }}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>

                  {/* Profile */}
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setOpen(false);
                      router.push("/profile");
                    }}
                  >
                    <UserRound className="mr-2 h-4 w-4" />
                    Profile
                  </Button>

                  {/* Logout */}
                  <Button
                    variant="ghost"
                    disabled={loggingOut}
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />

                    {loggingOut
                      ? "Logging out..."
                      : "Logout"}
                  </Button>
                </div>
              ) : (
                /* =============== MOBILE LOGGED OUT =============== */
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                  >
                    <Button className="w-full">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}