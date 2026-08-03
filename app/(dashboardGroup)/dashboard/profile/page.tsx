export const dynamic = "force-dynamic";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CalendarDays,
  CalendarCheck,
  Star,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { getMyTechnicianProfile } from "../../_actions/getMyTechnicianProfile";




export default async function CustomerProfilePage() {


  const result = await getMyTechnicianProfile();

  const customer = result.data;



  return (

    <div className="p-6 space-y-6">


      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold tracking-tight">
          My Profile
        </h1>

        <p className="text-muted-foreground">
          Manage your account information
        </p>

      </div>





      <Card className="max-w-3xl">


        <CardHeader>

          <CardTitle>
            Customer Information
          </CardTitle>

        </CardHeader>




        <CardContent className="space-y-6">


          {/* Avatar */}

          <div className="flex items-center gap-5">


            <div
              className="
              h-20
              w-20
              rounded-full
              bg-primary
              flex
              items-center
              justify-center
              text-white
              text-3xl
              font-bold
              "
            >

              {customer?.name?.charAt(0)}

            </div>




            <div>

              <h2 className="text-xl font-semibold">
                {customer?.name}
              </h2>


              <p className="text-sm text-muted-foreground">
                Customer Account
              </p>


            </div>


          </div>







          {/* User Information */}


          <div className="grid md:grid-cols-2 gap-6">



            <div className="flex gap-3">

              <User className="h-5 w-5 text-muted-foreground"/>


              <div>

                <p className="text-sm text-muted-foreground">
                  Name
                </p>

                <p className="font-medium">
                  {customer?.name}
                </p>

              </div>

            </div>





            <div className="flex gap-3">


              <Mail className="h-5 w-5 text-muted-foreground"/>


              <div>

                <p className="text-sm text-muted-foreground">
                  Email
                </p>


                <p className="font-medium">
                  {customer?.email}
                </p>


              </div>


            </div>






            <div className="flex gap-3">


              <Phone className="h-5 w-5 text-muted-foreground"/>


              <div>

                <p className="text-sm text-muted-foreground">
                  Phone
                </p>


                <p className="font-medium">
                  {customer?.phone}
                </p>


              </div>


            </div>







            <div className="flex gap-3">


              <ShieldCheck className="h-5 w-5 text-muted-foreground"/>


              <div>

                <p className="text-sm text-muted-foreground">
                  Status
                </p>


                <span
                className="
                rounded-md
                bg-green-100
                px-2
                py-1
                text-xs
                text-green-700
                "
                >

                {customer?.status}

                </span>


              </div>


            </div>






            <div className="flex gap-3">


              <CalendarDays className="h-5 w-5 text-muted-foreground"/>


              <div>

                <p className="text-sm text-muted-foreground">
                  Joined
                </p>


                <p className="font-medium">
                  {new Date(
                    customer?.createdAt
                  ).toLocaleDateString()}
                </p>


              </div>


            </div>




          </div>







          {/* Customer Stats */}


          <div className="grid md:grid-cols-2 gap-5">


            <Card>


              <CardContent className="p-5 flex items-center gap-4">


                <CalendarCheck/>


                <div>

                  <p className="text-sm text-muted-foreground">
                    Total Bookings
                  </p>

                  <h3 className="text-2xl font-bold">
                    0
                  </h3>

                </div>


              </CardContent>


            </Card>






            <Card>


              <CardContent className="p-5 flex items-center gap-4">


                <Star/>


                <div>

                  <p className="text-sm text-muted-foreground">
                    Reviews Given
                  </p>


                  <h3 className="text-2xl font-bold">
                    0
                  </h3>


                </div>


              </CardContent>


            </Card>



          </div>






          <Button>
            Edit Profile
          </Button>




        </CardContent>


      </Card>


    </div>

  );

}