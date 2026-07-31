import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  Star,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getServiceById } from "@/service/service";
import Image from "next/image";

interface ServiceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { id } = await params;

  const service = await getServiceById(id);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back */}
        <Link
          href="/services"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to services
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Service */}
          <section className="lg:col-span-2">
            {/* Service Image */}
            <div className="flex h-72 items-center justify-center overflow-hidden rounded-2xl border bg-muted sm:h-96">
              {service.category.image ? (
                <Image
                  src={service.category.image}
                  alt={service.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-7xl">🔧</div>
              )}
            </div>

            {/* Service Info */}
            <div className="mt-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {service.category.name}
                </span>

                <span className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  {service.status}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {service.title}
              </h1>

              <p className="mt-4 leading-7 text-muted-foreground">
                {service.description}
              </p>
            </div>

            {/* Features */}
            <div className="mt-8 rounded-2xl border p-6">
              <h2 className="text-xl font-semibold">
                Why choose this service?
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Feature
                  icon={<ShieldCheck />}
                  title="Trusted Professional"
                  description="Work with a verified service professional."
                />

                <Feature
                  icon={<CheckCircle2 />}
                  title="Quality Service"
                  description="Professional service for your home."
                />

                <Feature
                  icon={<CalendarDays />}
                  title="Flexible Scheduling"
                  description="Choose a convenient time for your service."
                />

                <Feature
                  icon={<Star />}
                  title="Highly Rated"
                  description="Book quality home service professionals."
                />
              </div>
            </div>
          </section>

          {/* Right Side */}
          <aside className="space-y-6">
            {/* Booking Card */}
            <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm">
              <p className="text-sm text-muted-foreground">
                Starting price
              </p>

              <p className="mt-1 text-3xl font-bold text-primary">
                ৳{service.price}
              </p>

              <div className="my-6 border-t" />

              <h2 className="text-lg font-semibold">
                Ready to book?
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Choose your preferred date and time and send a
                booking request to this technician.
              </p>

             
                <Link href={`/services/${service.id}/book`}>
                 <Button
                
                className="mt-6 h-11 w-full"
                size="lg"
              >
             <CalendarDays className="mr-2 h-4 w-4" />
                  Book Now
              </Button>                
                </Link>
            </div>

            {/* Technician Card */}
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-lg font-semibold">
                Your Technician
              </h2>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <UserRound className="h-7 w-7 text-primary" />
                </div>

                <div>
                  <h3 className="font-semibold">
                    {service.technician.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">5.0</span>
                    <span className="text-muted-foreground">
                      Top Rated
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3 border-t pt-5">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {service.technician.email}
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {service.technician.phone}
                </div>
              </div>

             
                <Link
                  href={`/technicians/${service.technician.id}`}
                >
            <Button
                variant="outline"
                className="mt-5 w-full"
              >
                  View Technician Profile
              </Button>
                </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <span className="[&>svg]:h-5 [&>svg]:w-5">
          {icon}
        </span>
      </div>

      <div>
        <h3 className="text-sm font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}