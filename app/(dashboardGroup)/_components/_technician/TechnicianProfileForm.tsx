"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  TechnicianProfileFormValues,
  technicianProfileSchema,
} from "../../technician-dashboard/schema";

import {
  createTechnicianProfile,
  updateTechnicianProfile,
} from "../../_actions/technicianActions";

interface TechnicianProfile {
  id: string;
  userId: string;
  bio: string | null;
  experience: number;
  address: string;
  rating: number;
  totalReviews: number;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: string;
  };
}

interface TechnicianProfileFormProps {
  profile: TechnicianProfile | null;
}

export default function TechnicianProfileForm({
  profile,
}: TechnicianProfileFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const isEditMode = Boolean(profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TechnicianProfileFormValues>({
    resolver: zodResolver(technicianProfileSchema),

    defaultValues: {
      bio: profile?.bio ?? "",
      experience: profile?.experience ?? 0,
      address: profile?.address ?? "",
    },
  });

  const onSubmit = async (
    data: TechnicianProfileFormValues
  ) => {
    try {
      setLoading(true);

      const result = isEditMode
        ? await updateTechnicianProfile(data)
        : await createTechnicianProfile(data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">
          {isEditMode
            ? "Edit Technician Profile"
            : "Setup Your Technician Profile"}
        </CardTitle>

        <CardDescription>
          {isEditMode
            ? "Update your professional information."
            : "Complete your professional profile so customers can learn more about you."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Bio */}
          <div className="space-y-2">
            <label
              htmlFor="bio"
              className="text-sm font-medium"
            >
              Professional Bio
            </label>

            <Textarea
              id="bio"
              placeholder="Tell customers about your experience..."
              className="min-h-32 resize-none"
              {...register("bio")}
            />

            {errors.bio && (
              <p className="text-sm text-destructive">
                {errors.bio.message}
              </p>
            )}
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <label
              htmlFor="experience"
              className="text-sm font-medium"
            >
              Experience (Years)
            </label>

            <Input
              id="experience"
              type="number"
              min={0}
              placeholder="e.g. 5"
              {...register("experience", {
                valueAsNumber: true,
              })}
            />

            {errors.experience && (
              <p className="text-sm text-destructive">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label
              htmlFor="address"
              className="text-sm font-medium"
            >
              Address
            </label>

            <Input
              id="address"
              placeholder="e.g. Khulna, Bangladesh"
              {...register("address")}
            />

            {errors.address && (
              <p className="text-sm text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? isEditMode
                ? "Updating Profile..."
                : "Creating Profile..."
              : isEditMode
                ? "Update Profile"
                : "Create Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}