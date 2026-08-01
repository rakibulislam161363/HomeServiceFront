import { getCategories } from "../../../_actions/categoryActions";
import AddServiceForm from "../../../_components/_technician/AddServiceForm";

export default async function CreateServicePage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <AddServiceForm categories={categories} />
    </div>
  );
}