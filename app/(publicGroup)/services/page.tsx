import { getAllServices } from "../_action/serviceActions";
import ServicesGrid from "../_components/services/ServicesGrid";

export default async function ServicesPage() {
  const services = await getAllServices();
  console.log("Services:", services);

  return (
    <main className="container mx-auto py-10">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          All Services
        </h1>

        <p className="text-muted-foreground">
          Find trusted technicians near you.
        </p>

      </div>

      <ServicesGrid services={services} />

    </main>
  );
}