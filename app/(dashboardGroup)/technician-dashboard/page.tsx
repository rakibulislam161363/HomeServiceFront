import { getMe } from "@/service/getMe";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function TechnicianProfilePage() {
  const result = await getMe();

  const user = result?.data;

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-muted-foreground">
          Unable to load profile
        </p>
      </div>
    );
  }

  const profile = user.technicianProfile;

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Header */}
        <Card>
          <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
            
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                {user.name}
              </h1>

              <p className="text-muted-foreground">
                {user.email}
              </p>

              <div className="mt-2 flex gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {user.role}
                </span>

                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                  {user.status}
                </span>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>
              Personal Information
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-5 sm:grid-cols-2">

            <div>
              <p className="text-sm text-muted-foreground">
                Full Name
              </p>

              <p className="font-medium">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Email
              </p>

              <p className="font-medium">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Phone
              </p>

              <p className="font-medium">
                {user.phone}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Role
              </p>

              <p className="font-medium">
                {user.role}
              </p>
            </div>

          </CardContent>
        </Card>

        {/* Technician Information */}
        <Card>
          <CardHeader>
            <CardTitle>
              Technician Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">

            <div>
              <p className="text-sm text-muted-foreground">
                Bio
              </p>

              <p className="mt-1">
                {profile?.bio || "No bio added yet."}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <p className="text-sm text-muted-foreground">
                  Experience
                </p>

                <p className="font-medium">
                  {profile?.experience ?? 0} years
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Address
                </p>

                <p className="font-medium">
                  {profile?.address || "Not added"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Rating
                </p>

                <p className="font-medium">
                  ⭐ {profile?.rating ?? 0}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Total Reviews
                </p>

                <p className="font-medium">
                  {profile?.totalReviews ?? 0}
                </p>
              </div>

            </div>

          </CardContent>
        </Card>

      </div>
    </main>
  );
}
