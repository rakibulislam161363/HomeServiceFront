import { getServiceById } from "@/app/(dashboardGroup)/_actions/serviceActions";
import { getCategories } from "@/app/(dashboardGroup)/_actions/categoryActions";
import ServiceForm from "@/app/(dashboardGroup)/_components/_technician/ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const service = await getServiceById(id);
  const categories = await getCategories();

  return (
    <ServiceForm
      service={service}
      categories={categories}
    />
  );
}