import {
  Users,
  Wrench,
  CalendarCheck,
  Star,
  UserCheck,
  ShieldAlert,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getAllUsers } from "./users/_actions/userActions";


const stats = [
  {
    title: "Total Users",
    value: "1250",
    icon: Users,
  },
  {
    title: "Technicians",
    value: "320",
    icon: Wrench,
  },
  {
    title: "Bookings",
    value: "850",
    icon: CalendarCheck,
  },
  {
    title: "Reviews",
    value: "540",
    icon: Star,
  },
];





export default async function AdminDashboard() {


  const result = await getAllUsers();

  const users = result?.data || [];



  return (

    <div className="p-6 space-y-8">


      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>


        <p className="text-muted-foreground">
          Manage users, technicians, bookings and services
        </p>

      </div>





      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">


        {
          stats.map((item)=>{


            const Icon = item.icon;


            return (

              <Card key={item.title}>


                <CardHeader
                  className="flex flex-row items-center justify-between"
                >

                  <CardTitle className="text-sm font-medium">
                    {item.title}
                  </CardTitle>


                  <Icon className="h-5 w-5 text-muted-foreground"/>


                </CardHeader>




                <CardContent>

                  <h2 className="text-3xl font-bold">
                    {item.value}
                  </h2>


                </CardContent>


              </Card>

            )


          })
        }


      </div>







      {/* Users Section */}


      <Card>


        <CardHeader
          className="flex flex-row items-center justify-between"
        >

          <CardTitle>
            All Users
          </CardTitle>



          <Button>
            Add User
          </Button>


        </CardHeader>





        <CardContent>


          {
            users.length === 0 ? (

              <div className="text-center py-10 text-muted-foreground">
                No users found
              </div>


            ) : (



              <Table>


                <TableHeader>


                  <TableRow>


                    <TableHead>
                      Name
                    </TableHead>


                    <TableHead>
                      Email
                    </TableHead>


                    <TableHead>
                      Phone
                    </TableHead>


                    <TableHead>
                      Role
                    </TableHead>


                    <TableHead>
                      Status
                    </TableHead>


                    <TableHead>
                      Action
                    </TableHead>


                  </TableRow>


                </TableHeader>





                <TableBody>


                  {
                    users.map((user:any)=>(


                      <TableRow
                        key={user.id}
                      >



                        <TableCell
                          className="font-medium"
                        >
                          {user.name}
                        </TableCell>




                        <TableCell>
                          {user.email}
                        </TableCell>




                        <TableCell>
                          {user.phone}
                        </TableCell>




                        <TableCell>


                          <span
                            className="
                            rounded-md 
                            bg-muted 
                            px-2 
                            py-1 
                            text-xs 
                            font-medium
                            "
                          >

                            {user.role}


                          </span>


                        </TableCell>





                        <TableCell>


                          <span

                            className={`
                              rounded-md 
                              px-2 
                              py-1 
                              text-xs 
                              font-medium

                              ${
                                user.status === "ACTIVE"
                                ?
                                "bg-green-100 text-green-700"
                                :
                                "bg-red-100 text-red-700"
                              }

                            `}

                          >

                            {user.status}


                          </span>


                        </TableCell>





                        <TableCell>


                          <Button
                            size="sm"
                            variant="outline"
                          >

                            Manage

                          </Button>


                        </TableCell>





                      </TableRow>


                    ))
                  }



                </TableBody>



              </Table>



            )
          }



        </CardContent>



      </Card>







      {/* Quick Actions */}



      <div className="grid md:grid-cols-3 gap-5">



        <Card>

          <CardContent className="p-6 flex items-center gap-4">

            <UserCheck/>


            <div>

              <h3 className="font-semibold">
                Manage Technicians
              </h3>


              <p className="text-sm text-muted-foreground">
                Approve or block technicians
              </p>

            </div>


          </CardContent>


        </Card>






        <Card>


          <CardContent className="p-6 flex items-center gap-4">


            <ShieldAlert/>


            <div>

              <h3 className="font-semibold">
                User Reports
              </h3>


              <p className="text-sm text-muted-foreground">
                Check complaints
              </p>


            </div>


          </CardContent>


        </Card>







        <Card>


          <CardContent className="p-6 flex items-center gap-4">


            <CalendarCheck/>


            <div>


              <h3 className="font-semibold">
                Bookings
              </h3>


              <p className="text-sm text-muted-foreground">
                Manage service bookings
              </p>


            </div>


          </CardContent>


        </Card>



      </div>




    </div>

  );

}