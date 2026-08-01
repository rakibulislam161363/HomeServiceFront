"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Service, TechnicianDashboardProps } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteService } from "../../_actions/serviceActions";
interface Props {
  profile: TechnicianDashboardProps["profile"];
}


export default function TechnicianDashboard({
  profile,
}: Props) {
  const router = useRouter();
  const services = profile?.user?.services || [];

  const handleDelete = async (id: string) => {

  const ok = confirm(
    "Are you sure you want to delete this service?"
  );

  if (!ok) return;

  const result = await deleteService(id);

  if (!result.success) {
    toast.error(result.message);
    return;
  }

  toast.success("Service deleted");

  router.refresh();
};

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {profile.user.name} 👋
        </h1>

        <p className="text-muted-foreground">
          Manage your technician account
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">
              Services
            </p>

            <h2 className="text-3xl font-bold">
              {services.length}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">
              Rating
            </p>

            <h2 className="text-3xl font-bold">
              {profile.rating}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">
              Reviews
            </p>

            <h2 className="text-3xl font-bold">
              {profile.totalReviews}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">
              Experience
            </p>

            <h2 className="text-3xl font-bold">
              {profile.experience}+
            </h2>
          </CardContent>
        </Card>

      </div>

      {/* Services */}
      <Card>
  <CardContent className="pt-6">
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">My Services</h2>
        <p className="text-sm text-muted-foreground">
          Manage all of your services
        </p>
      </div>

      <Link href="/technician-dashboard/services/create">
  <Button>Add Service</Button>
</Link>
    </div>

    {services.length === 0 ? (
      <div className="rounded-lg border border-dashed py-12 text-center">
        <h3 className="text-lg font-semibold">
          No Services Found
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          Create your first service to start receiving bookings.
        </p>

        <Link href="/technician-dashboard/services/create">
            <Button>Add Service</Button>
         </Link>
      </div>
    ) : (
      <div className="space-y-4">
        {services.map((service: Service) => (
          <div
            key={service.id}
            className="flex flex-col gap-4 rounded-xl border p-5 transition-all hover:shadow-md md:flex-row md:items-center md:justify-between"
          >
            {/* Left */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                {service.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>
                  Category:
                  <span className="ml-1 font-medium text-foreground">
                    {service.category.name}
                  </span>
                </span>

                <span>
                  Price:
                  <span className="ml-1 font-semibold text-primary">
                    ৳ {service.price}
                  </span>
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  service.status === "AVAILABLE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {service.status}
              </span>

              <div className="flex gap-2 mt-3">

  <Button
    size="sm"
    variant="outline"
    onClick={() =>
      router.push(
        `/technician-dashboard/services/edit/${service.id}`
      )
    }
  >
    Edit
  </Button>

  <Button
    size="sm"
    variant="destructive"
    onClick={() => handleDelete(service.id)}
  >
    Delete
  </Button>

</div>
            </div>
          </div>
        ))}
      </div>
    )}
  </CardContent>
</Card>

    </div>
  );
}