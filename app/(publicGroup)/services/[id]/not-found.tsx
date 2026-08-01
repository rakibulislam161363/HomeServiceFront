import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-bold">
        Service Not Found
      </h2>

      <p className="text-muted-foreground">
        The service you are looking for doesn&apos;t exist.
      </p>

      <Link href="/services">
        <Button>Back to Services</Button>
      </Link>
    </div>
  );
}