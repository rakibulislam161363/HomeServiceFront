import { getCategories } from "@/app/(dashboardGroup)/_actions/categoryActions";
import ServiceForm from "@/app/(dashboardGroup)/_components/_technician/ServiceForm";

export default async function CreateServicePage(){

    const categories=await getCategories();

    return(

        <ServiceForm
            categories={categories}
        />

    )
}