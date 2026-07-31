"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   technicianProfileSchema,
//   TechnicianProfileFormValues,
// } from "./schema";

// import { createTechnicianProfile } from "@/service/technician/technicianActions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TechnicianProfileFormValues, technicianProfileSchema } from "../technician-dashboard/schema";
import { createTechnicianProfile } from "../_actions/technicianActions";

export default function TechnicianProfileForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<TechnicianProfileFormValues>({
    resolver: zodResolver(technicianProfileSchema),
    defaultValues: {
      bio: "",
      experience: 0,
      address: "",
    },
  });

  const onSubmit = async (
    data: TechnicianProfileFormValues
  ) => {
    try {
      setLoading(true);

      const result = await createTechnicianProfile(data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/dashboard/technician");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">
          Setup Your Technician Profile
        </CardTitle>

        <CardDescription>
          Tell customers about your experience and
          professional services.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Bio</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder="Tell customers about your experience..."
                      className="min-h-32 resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Experience */}
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Experience (Years)
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="e.g. 5"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(
                          Number(e.target.value)
                        )
                      }
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="e.g. Khulna, Bangladesh"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Creating Profile..."
                : "Create Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}