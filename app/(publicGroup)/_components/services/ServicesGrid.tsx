import { Service } from "@/lib/types";
import ServiceCard from "./ServiceCard";

interface Props {
  services: Service[];
}

export default function ServicesGrid({
  services,
}: Props) {
  if (!services.length) {
    return (
      <div className="py-20 text-center">
        No services found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
        />
      ))}

    </div>
  );
}