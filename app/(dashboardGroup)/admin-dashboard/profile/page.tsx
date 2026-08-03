import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";


const admin = {
  name: "Rakib",
  email: "rakibulislam@gmail.com",
  phone: "01874753366",
  role: "ADMIN",
  status: "ACTIVE",
  createdAt: "03 August 2026",
};



export default function AdminProfilePage() {


  return (

    <div className="p-6 space-y-6">


      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold tracking-tight">
          Admin Profile
        </h1>


        <p className="text-muted-foreground">
          Manage your admin account information
        </p>

      </div>





      <Card className="max-w-3xl">


        <CardHeader>

          <CardTitle>
            Profile Information
          </CardTitle>

        </CardHeader>




        <CardContent className="space-y-6">


          {/* Avatar */}

          <div className="flex items-center gap-5">


            <div className="
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
            ">

              A

            </div>



            <div>

              <h2 className="text-xl font-semibold">
                {admin.name}
              </h2>


              <p className="text-sm text-muted-foreground">
                Administrator
              </p>

            </div>


          </div>





          {/* Details */}


          <div className="grid md:grid-cols-2 gap-5">



            <div className="flex gap-3 items-center">

              <User className="h-5 w-5 text-muted-foreground"/>

              <div>

                <p className="text-sm text-muted-foreground">
                  Name
                </p>

                <p className="font-medium">
                  {admin.name}
                </p>

              </div>

            </div>





            <div className="flex gap-3 items-center">


              <Mail className="h-5 w-5 text-muted-foreground"/>

              <div>

                <p className="text-sm text-muted-foreground">
                  Email
                </p>

                <p className="font-medium">
                  {admin.email}
                </p>

              </div>


            </div>






            <div className="flex gap-3 items-center">


              <Phone className="h-5 w-5 text-muted-foreground"/>


              <div>

                <p className="text-sm text-muted-foreground">
                  Phone
                </p>


                <p className="font-medium">
                  {admin.phone}
                </p>


              </div>


            </div>






            <div className="flex gap-3 items-center">


              <ShieldCheck className="h-5 w-5 text-muted-foreground"/>


              <div>

                <p className="text-sm text-muted-foreground">
                  Role
                </p>


                <p className="font-medium">
                  {admin.role}
                </p>


              </div>


            </div>






            <div className="flex gap-3 items-center">


              <ShieldCheck className="h-5 w-5 text-muted-foreground"/>


              <div>

                <p className="text-sm text-muted-foreground">
                  Status
                </p>


                <span className="
                  rounded-md
                  bg-green-100
                  px-2
                  py-1
                  text-xs
                  text-green-700
                ">

                  {admin.status}

                </span>


              </div>


            </div>







            <div className="flex gap-3 items-center">


              <CalendarDays className="h-5 w-5 text-muted-foreground"/>


              <div>

                <p className="text-sm text-muted-foreground">
                  Joined
                </p>


                <p className="font-medium">
                  {admin.createdAt}
                </p>


              </div>


            </div>




          </div>






          <Button>
            Edit Profile
          </Button>




        </CardContent>


      </Card>


    </div>

  );

}