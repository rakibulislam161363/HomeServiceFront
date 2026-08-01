import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

  if (!service) {
    notFound();
  }

  const statusColor =
    service.status === "AVAILABLE"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back */}
      <Link
        href="/services"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Services
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT */}
        <section className="space-y-6 lg:col-span-2">
          {/* Image */}
          <div className="relative h-72 overflow-hidden rounded-2xl border bg-muted sm:h-96">
            {service.category.image ? (
              <Image
                src={service.category.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-7xl">
                🔧
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {service.category.name}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
              >
                {service.status}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-bold">
              {service.title}
            </h1>

            <p className="mt-4 leading-7 text-muted-foreground">
              {service.description}
            </p>
          </div>

          {/* Features */}
          <div className="rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">
              Why choose this service?
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Feature
                icon={<ShieldCheck />}
                title="Trusted Professional"
                description="Verified and experienced technician."
              />

              <Feature
                icon={<CheckCircle2 />}
                title="Quality Work"
                description="Professional home service."
              />

              <Feature
                icon={<CalendarDays />}
                title="Flexible Schedule"
                description="Choose your preferred booking time."
              />

              <Feature
                icon={<Star />}
                title="Top Rated"
                description="Highly rated by customers."
              />
            </div>
          </div>
        </section>

        {/* RIGHT */}
        <aside className="space-y-6">
          {/* Booking */}
          <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Starting Price
            </p>

            <h2 className="mt-2 text-4xl font-bold text-primary">
              ৳ {service.price}
            </h2>

            <div className="my-6 space-y-3 border-y py-4">
              <div className="flex justify-between text-sm">
                <span>Status</span>
                <span className="font-medium text-green-600">
                  {service.status}
                </span>
              </div>

              {service.location && (
                <div className="flex justify-between text-sm">
                  <span>Location</span>
                  <span>{service.location}</span>
                </div>
              )}
            </div>

            <Link href={`/services/${service.id}/book`}>
              <Button className="w-full" size="lg">
                <CalendarDays className="mr-2 h-4 w-4" />
                Book Now
              </Button>
            </Link>
          </div>

          {/* Technician */}
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-lg font-semibold">
              Technician
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
                  <span>5.0</span>
                  <span className="text-muted-foreground">
                    Top Rated
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3 border-t pt-5">
              <a
                href={`mailto:${service.technician.email}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {service.technician.email}
              </a>

              <a
                href={`tel:${service.technician.phone}`}
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {service.technician.phone}
              </a>
            </div>

            <Link href={`/technicians/${service.technician.id}`}>
              <Button
                variant="outline"
                className="mt-6 w-full"
              >
                View Technician Profile
              </Button>
            </Link>
          </div>
        </aside>
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
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <h3 className="font-medium">{title}</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}