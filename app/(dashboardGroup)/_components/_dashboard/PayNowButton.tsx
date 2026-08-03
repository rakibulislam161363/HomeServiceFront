"use client";


interface PayNowButtonProps {
  bookingId: string;
}


export default function PayNowButton({
  bookingId,
}: PayNowButtonProps) {


  const handlePayment = () => {

    console.log("Booking ID:", bookingId);

  };


  return (

    <button
      onClick={handlePayment}
      className="rounded-md bg-primary px-4 py-2 text-white"
    >

      Pay Now

    </button>

  );

}