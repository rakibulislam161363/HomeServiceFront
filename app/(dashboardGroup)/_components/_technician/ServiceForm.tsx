"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  createService,
  updateService,
} from "../../_actions/serviceActions";

interface Category {
  id: string;
  name: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string | null;
  categoryId: string;
}

interface FormValues {
  title: string;
  description: string;
  price: number;
  location: string;
}

interface ServiceFormProps {
  categories: Category[];
  service?: Service;
}

export default function ServiceForm({
  categories,
  service,
}: ServiceFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [categoryId, setCategoryId] = useState(
    service?.categoryId ?? ""
  );

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: service?.title ?? "",
      description: service?.description ?? "",
      price: service?.price ?? 0,
      location: service?.location ?? "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);

    let result;

    if (service) {
      result = await updateService(service.id, {
        ...data,
        categoryId,
      });
    } else {
      result = await createService({
        ...data,
        categoryId,
      });
    }

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.push("/technician-dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      {/* Title */}
      <Input
        placeholder="Service Title"
        {...register("title", { required: true })}
      />

      {/* Description */}
      <Textarea
        placeholder="Service Description"
        {...register("description", {
          required: true,
        })}
      />

      {/* Price */}
      <Input
        type="number"
        placeholder="Price"
        {...register("price", {
          valueAsNumber: true,
          required: true,
        })}
      />

      {/* Location */}
      <Input
        placeholder="Location"
        {...register("location")}
      />

      {/* Category */}
      <Select
        value={categoryId}
        onValueChange={(value) => setCategoryId(value ?? "")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>

        <SelectContent>
          {categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id}
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading
          ? service
            ? "Updating..."
            : "Creating..."
          : service
          ? "Update Service"
          : "Create Service"}
      </Button>
    </form>
  );
};
