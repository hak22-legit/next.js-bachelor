import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: <Zap className="size-6 text-amber-500" />,
    title: "Instant Delivery",
    desc: "Lightning-fast dispatch right to your doorstep within 24 hours.",
  },
  {
    icon: <ShieldCheck className="size-6 text-emerald-500" />,
    title: "Secure Payments",
    desc: "End-to-end encrypted checkout supporting cards, Apple Pay, and crypto.",
  },
  {
    icon: <RotateCcw className="size-6 text-blue-500" />,
    title: "Hassle-Free Returns",
    desc: "Not satisfied? Return any unopened package within 30 days for a full refund.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-sm transition-transform duration-300 hover:scale-105">
              <Sparkles className="size-3.5" />
              <span>New Spring 2026 Collection Available</span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Curated essentials for your{" "}
              <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
                modern lifestyle.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Explore our selection of top-tier apparel, premium electronics, and
              handcrafted accessories designed to elevate your everyday routines.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden px-8 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Link href="/data-table">
                  Browse Catalog
                  <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="transition-transform duration-200 hover:scale-105"
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-4 sm:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-border/60 bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-accent/60 transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Promotion Banner */}
      <section className="container mx-auto px-4 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-accent/30 to-background p-8 md:p-14">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Ready to view all products?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Explore inventory details, prices, categories, and real customer
              reviews directly inside our interactive table view.
            </p>
            <Button
              asChild
              className="mt-6 gap-2 transition-transform duration-200 hover:scale-105"
            >
              <Link href="/data-table">
                <ShoppingBag className="size-4" />
                Open Data Table
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}