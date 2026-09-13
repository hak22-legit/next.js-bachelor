"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Sparkles,
  Layers,
  Phone,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
  badge?: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/data-table",
    icon: <ShoppingBag className="size-4" />,
  },
  {
    label: "Categories",
    href: "#categories",
    icon: <Layers className="size-4" />,
  },
  {
    label: "Deals",
    href: "#deals",
    badge: "Hot",
    icon: <Sparkles className="size-4 text-amber-500" />,
  },
  {
    label: "Contact",
    href: "#contact",
    icon: <Phone className="size-4" />,
  },
];

export default function NavbarComponent() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all duration-300 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-xl font-bold tracking-tight text-foreground transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-all duration-300 group-hover:rotate-6 group-hover:shadow-md">
            <ShoppingBag className="size-5 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text">
            Hak-<span className="text-primary">Store</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {/* Background hover pill animation */}
                <span className="absolute inset-0 -z-10 scale-90 rounded-full bg-accent/60 opacity-0 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100" />

                {item.icon && (
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                    {item.icon}
                  </span>
                )}

                <span>{item.label}</span>

                {item.badge && (
                  <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary animate-pulse">
                    {item.badge}
                  </span>
                )}

                {/* Active bottom indicator line */}
                <span
                  className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-primary transition-all duration-300 ${
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-60"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Actions (Desktop) */}
<div className="hidden items-center gap-3 md:flex">
  <Button
    asChild
    variant="ghost"
    size="sm"
    className="transition-transform duration-200 hover:scale-105 active:scale-95"
  >
    <Link href="/login">Sign In</Link>
  </Button>

  <Button
    asChild
    size="sm"
    className="group relative overflow-hidden shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95"
  >
    <Link href="/register">
      <span className="relative z-10 flex items-center gap-1">
        Get Started
        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  </Button>
</div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          className="inline-flex size-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-transform duration-200 hover:bg-accent active:scale-90 md:hidden"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Slide-Down Menu */}
      <div
        className={`overflow-hidden border-b border-border/50 bg-background/95 backdrop-blur-md transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <div className="container mx-auto flex flex-col space-y-2 px-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-all duration-200 hover:bg-accent hover:text-foreground"
            >
              <span className="flex items-center gap-3">
                {item.icon}
                {item.label}
              </span>
              {item.badge && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 border-t pt-4">
            <Button variant="outline" className="w-full justify-center">
              Sign In
            </Button>
            <Button className="w-full justify-center">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}