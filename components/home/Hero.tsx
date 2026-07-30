"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ShieldCheck, Clock, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const value = search.trim();

    if (!value) {
      router.push("/services");
      return;
    }

    router.push(
      `/services?search=${encodeURIComponent(value)}`
    );
  };

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Trusted Home Service Professionals
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Your Home,
            <span className="block text-primary">
              Our Trusted Experts
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Find skilled and trusted professionals for plumbing,
            electrical, cleaning, AC repair, and more.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-2xl border bg-background p-3 shadow-lg sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="What service do you need?"
                className="h-12 border-0 pl-12 shadow-none focus-visible:ring-0"
              />
            </div>

            <Button
              onClick={handleSearch}
              size="lg"
              className="h-12 rounded-xl px-7"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>

          {/* Popular Searches */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">
              Popular:
            </span>

            {["Plumbing", "Electrical", "Cleaning", "AC Repair"].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setSearch(item);
                    router.push(
                      `/services?search=${encodeURIComponent(item)}`
                    );
                  }}
                  className="rounded-full border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        {/* Trust Stats */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-3 rounded-xl border bg-background/70 p-4 backdrop-blur">
            <ShieldCheck className="h-5 w-5 text-primary" />

            <div className="text-left">
              <p className="text-sm font-semibold">
                Trusted Professionals
              </p>
              <p className="text-xs text-muted-foreground">
                Verified technicians
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 rounded-xl border bg-background/70 p-4 backdrop-blur">
            <Clock className="h-5 w-5 text-primary" />

            <div className="text-left">
              <p className="text-sm font-semibold">
                Quick Booking
              </p>
              <p className="text-xs text-muted-foreground">
                Easy & fast service
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 rounded-xl border bg-background/70 p-4 backdrop-blur">
            <Star className="h-5 w-5 text-primary" />

            <div className="text-left">
              <p className="text-sm font-semibold">
                Quality Service
              </p>
              <p className="text-xs text-muted-foreground">
                Highly rated experts
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}