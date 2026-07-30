"use client";

import Link from "next/link";
import { Search, ArrowRight, ShieldCheck, Clock3, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative mx-auto px-4 py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* ================= LEFT ================= */}
          <div className="max-w-2xl">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Trusted home service professionals
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Reliable Home Services,
              <span className="block text-primary">
                Just a Click Away
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Find trusted professionals for plumbing, electrical,
              cleaning, painting, and more. Book qualified technicians
              at a time that works for you.
            </p>

            {/* Search */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                <Input
                  type="text"
                  placeholder="What service do you need?"
                  className="h-12 pl-10"
                />
              </div>

              <Button
                size="lg"
                className="h-12 px-6"
              >
                Search
                <Search className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* CTA */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/services">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Become a Technician
                </Button>
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Verified Professionals
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-primary" />
                Flexible Scheduling
              </div>

              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                Top Rated
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="relative hidden lg:block">

            <div className="relative mx-auto aspect-square max-w-lg overflow-hidden rounded-3xl bg-muted">

              {/* Temporary hero visual */}
              <div className="flex h-full flex-col items-center justify-center p-10 text-center">

                <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-primary/10">
                  <Search className="h-12 w-12 text-primary" />
                </div>

                <h2 className="text-2xl font-bold">
                  Find the Right Professional
                </h2>

                <p className="mt-3 max-w-sm text-muted-foreground">
                  Search, compare ratings, choose a time slot,
                  and book your trusted technician.
                </p>
              </div>

              {/* Floating card */}
              <div className="absolute bottom-6 left-6 rounded-xl border bg-background/95 p-4 shadow-lg backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Star className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Highly Rated
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Trusted by customers
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}