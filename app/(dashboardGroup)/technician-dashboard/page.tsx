import { redirect } from "next/navigation";
import { getMyTechnicianProfile } from "../_actions/getMyTechnicianProfile";
import TechnicianDashboard from "../_components/_technician/TechnicianDashboard";


export default async function Page() {
  const profile = await getMyTechnicianProfile();
  if (!profile) {
  redirect("/technician-dashboard/profile");
}

  return (
    <div className="container mx-auto py-8">
      <TechnicianDashboard profile={profile} />
    </div>
  );
}