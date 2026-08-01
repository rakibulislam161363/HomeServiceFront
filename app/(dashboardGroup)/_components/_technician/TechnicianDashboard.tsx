"use client";

import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
  Settings,
  Star,
  Wrench,
  ArrowRight,
} from "lucide-react";

// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TechnicianProfile {
  id: string;
  userId: string;
  bio: string | null;
  experience: number;
  address: string;
  rating: number;
  totalReviews: number;

  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
  };
}

interface TechnicianDashboardProps {
  profile: TechnicianProfile | null;
}

export default function TechnicianDashboard({
  profile,
}: TechnicianDashboardProps) {
  const name = profile?.user?.name ?? "Technician";

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* ================= HEADER ================= */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">
              Technician Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Welcome back, {name} 👋
            </h1>

            <p className="mt-2 text-muted-foreground">
              Manage your services, bookings and professional profile.
            </p>
          </div>

          <Link
            href="/dashboard/technician/services/create"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </Link>
        </section>

        {/* ================= STATS ================= */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <StatsCard
            title="Total Services"
            value="0"
            description="Services you provide"
            icon={<Wrench className="h-5 w-5" />}
          />

          <StatsCard
            title="Pending Bookings"
            value="0"
            description="Bookings waiting"
            icon={<Clock3 className="h-5 w-5" />}
          />

          <StatsCard
            title="Completed Jobs"
            value="0"
            description="Jobs completed"
            icon={<CheckCircle2 className="h-5 w-5" />}
          />

          <StatsCard
            title="Average Rating"
            value={profile?.rating?.toFixed(1) ?? "0.0"}
            description={`${profile?.totalReviews ?? 0} reviews`}
            icon={<Star className="h-5 w-5" />}
          />

        </section>

        {/* ================= PROFILE + SERVICES ================= */}
        <section className="grid gap-6 lg:grid-cols-3">

          {/* PROFILE */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">

              <ProfileItem
                label="Name"
                value={profile?.user?.name ?? "Not available"}
              />

              <ProfileItem
                label="Email"
                value={profile?.user?.email ?? "Not available"}
              />

              <ProfileItem
                label="Phone"
                value={profile?.user?.phone ?? "Not available"}
              />

              <ProfileItem
                label="Experience"
                value={`${profile?.experience ?? 0} years`}
              />

              <ProfileItem
                label="Location"
                value={profile?.address ?? "Not available"}
              />

              <div>
                <p className="text-sm text-muted-foreground">
                  Professional Bio
                </p>

                <p className="mt-1 text-sm leading-6">
                  {profile?.bio || "No professional bio added yet."}
                </p>
              </div>

              <Link
                href="/dashboard/technician/profile"
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Settings className="h-4 w-4" />
                Edit Profile
              </Link>

            </CardContent>
          </Card>

          {/* SERVICES */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Services</CardTitle>

              <Link
                href="/dashboard/technician/services"
                className="inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardHeader>

            <CardContent>

              <div className="flex min-h-55 flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>

                <h3 className="font-semibold">
                  Manage your services
                </h3>

                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                  Add services like AC repair, electrical work,
                  plumbing and cleaning so customers can find you.
                </p>

                <Link
                  href="/dashboard/technician/services/create"
                  className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4" />
                  Create Service
                </Link>

              </div>

            </CardContent>
          </Card>

        </section>

        {/* ================= BOOKINGS ================= */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>

            <Link
              href="/dashboard/technician/bookings"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>

          <CardContent>

            <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed text-center">

              <CalendarDays className="mb-3 h-8 w-8 text-muted-foreground" />

              <h3 className="font-medium">
                No bookings yet
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Your customer bookings will appear here.
              </p>

            </div>

          </CardContent>
        </Card>

      </div>
    </main>
  );
}


/* ================= STATS CARD ================= */

function StatsCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-6">

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            {icon}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-3xl font-bold">
            {value}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {description}
          </p>
        </div>

      </CardContent>
    </Card>
  );
}


/* ================= PROFILE ITEM ================= */

function ProfileItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value}
      </p>
    </div>
  );
}