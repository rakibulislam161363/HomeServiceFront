export const dynamic = "force-dynamic";
import { getSingleBooking } from "@/app/(publicGroup)/_action/bookingActions";
import { notFound } from "next/navigation";

import {
  CalendarDays,
  MapPin,
  User,
  BadgeDollarSign,
} from "lucide-react";
import PayNowButton from "@/app/(dashboardGroup)/_components/_dashboard/PayNowButton";



interface PageProps {
  params: Promise<{
    id: string;
  }>;
}



export default async function BookingDetailsPage({
  params,
}: PageProps) {


  const { id } = await params;


  const booking = await getSingleBooking(id);



  if (!booking) {
    notFound();
  }



  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-3xl font-bold">
          Booking Details
        </h1>


        <p className="text-muted-foreground">
          View complete booking information.
        </p>


      </div>





      <div className="rounded-2xl border bg-card p-6 space-y-5">


        <h2 className="text-2xl font-semibold">
          {booking.service.title}
        </h2>





        <div className="grid gap-4 md:grid-cols-2">


          <div className="flex items-center gap-2">

            <User size={18}/>

            <span>
              Technician: {booking.technician.name}
            </span>

          </div>





          <div className="flex items-center gap-2">

            <CalendarDays size={18}/>

            <span>
              {new Date(
                booking.bookingDate
              ).toLocaleDateString()}
            </span>

          </div>





          <div className="flex items-center gap-2">

            <MapPin size={18}/>

            <span>
              {booking.address}
            </span>

          </div>





          <div className="flex items-center gap-2">

            <BadgeDollarSign size={18}/>

            <span>
              ৳ {booking.totalPrice}
            </span>

          </div>



        </div>






        <div>

          <h3 className="font-semibold">
            Status
          </h3>


          <p>
            {booking.status}
          </p>


        </div>






        {
          booking.status === "ACCEPTED" && (

            <div className="pt-4">

              <PayNowButton
                bookingId={booking.id}
              />

            </div>

          )
        }







        {
          booking.note && (

            <div>


              <h3 className="font-semibold">
                Note
              </h3>



              <p className="text-muted-foreground">
                {booking.note}
              </p>



            </div>

          )
        }




      </div>



    </div>

  );

}