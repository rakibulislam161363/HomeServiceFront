import { getServices } from "@/service/service";
import ServiceCard from "@/components/services/ServiceCard";

interface ServicesPageProps {
  searchParams: Promise<{
    search?: string;
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  const params = await searchParams;

  const servicesResponse = await getServices({
    search: params.search,
    categoryId: params.categoryId,
    minPrice: params.minPrice
      ? Number(params.minPrice)
      : undefined,
    maxPrice: params.maxPrice
      ? Number(params.maxPrice)
      : undefined,
    page: 1,
    limit: 12,
  });

  const services = servicesResponse.data.data;
  const total = servicesResponse.data.meta.total;

  return (
    <main className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Find a Service
          </h1>

          <p className="mt-2 text-muted-foreground">
            Discover trusted professionals for your home.
          </p>

          {params.search && (
            <p className="mt-3 text-sm">
              Search results for{" "}
              <span className="font-semibold text-primary">
                &quot;{params.search}&quot;
              </span>
            </p>
          )}
        </div>

        {/* Result count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {total} services found
          </p>
        </div>

        {/* Services */}
        {services.length === 0 ? (
          <div className="flex min-h-64 items-center justify-center rounded-xl border">
            <div className="text-center">
              <h2 className="text-lg font-semibold">
                No services found
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Try searching for another service.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
