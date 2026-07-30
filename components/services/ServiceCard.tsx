import Link from "next/link";
import {
  MapPin,
  Star,
  UserRound,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Service } from "@/lib/types";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Image / Placeholder */}
      <div className="relative flex h-44 items-center justify-center bg-muted">
        <div className="text-5xl">
          🔧
        </div>

        <div className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-sm">
          {service.category.name}
        </div>

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium shadow-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          5.0
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="line-clamp-1 text-lg font-semibold">
          {service.title}
        </h2>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm text-muted-foreground">
          {service.description}
        </p>

        {/* Technician */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <UserRound className="h-4 w-4 text-primary" />
          </div>

          <div>
            <p className="text-sm font-medium">
              {service.technician.name}
            </p>

            <p className="text-xs text-muted-foreground">
              Technician
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Available in your area</span>
        </div>

        {/* Price + Button */}
        <div className="mt-5 flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground">
              Starting from
            </p>

            <p className="text-lg font-bold text-primary">
              ৳{service.price}
            </p>
          </div>

          <Link href={`/services/${service.id}`}>
           <Button size="sm">
             View Details
           <ArrowRight className="ml-1 h-4 w-4" />
           </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}