
export const dynamic = "force-dynamic";
import { getMyTechnicianProfile } from "../../_actions/getMyTechnicianProfile";
import TechnicianProfileForm from "../../_components/_technician/TechnicianProfileForm";

export default async function TechnicianProfilePage() {
  const profile = await getMyTechnicianProfile();

  console.log("PROFILE FROM PAGE:", profile);

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Technician Profile
          </h1>

          <p className="mt-2 text-muted-foreground">
            Complete your professional profile so customers
            can learn more about you.
          </p>
        </div>

        <TechnicianProfileForm profile={profile} />
      </div>
    </main>
  );
}