import { notFound } from "next/navigation";

import { getServiceById } from "@/service/service";
import BookingForm from "./BookingForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookingPage({
  params,
}: Props) {
  const { id } = await params;

  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl py-10">
      <BookingForm service={service} />
    </div>
  );
}