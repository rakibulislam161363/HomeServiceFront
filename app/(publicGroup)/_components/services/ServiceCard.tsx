"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Service } from "@/lib/types";

interface Props {
  service: Service;
}

export default function ServiceCard({
  service,
}: Props) {
  return (
    <Card className="flex h-full flex-col">

      <CardHeader>

        <Badge className="w-fit">
          {service.category.name}
        </Badge>

        <CardTitle className="mt-3">
          {service.title}
        </CardTitle>

      </CardHeader>

      <CardContent className="flex-1">

        <p className="line-clamp-3 text-muted-foreground">
          {service.description}
        </p>

        <div className="mt-5 space-y-2 text-sm">

          <p>
            👨‍🔧 {service.technician.name}
          </p>

          <p>
            📍 {service.location}
          </p>

          <p className="font-semibold">
            ৳ {service.price}
          </p>

        </div>

      </CardContent>

      <CardFooter>

           <Link href={`/services/${service.id}`}>
            <Button className="w-full">
                View Details
            </Button>
            </Link>

      </CardFooter>

    </Card>
  );
}