"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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

import { createService } from "../../_actions/serviceActions";

interface Category {
  id: string;
  name: string;
}

interface FormValues {
  title: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
}

export default function AddServiceForm({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const { register, handleSubmit } =
    useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    };

    const result = await createService({
  ...data,
  categoryId,
});

console.log(result);

if (!result.success) {
  toast.error(result.message);
  setLoading(false);
  return;
}

toast.success(result.message);

console.log("Redirecting...");

router.push("/technician-dashboard");

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <Input
        placeholder="Service title"
        {...register("title")}
      />

      <Textarea
        placeholder="Description"
        {...register("description")}
      />

      <Input
        type="number"
        placeholder="Price"
        {...register("price", {
          valueAsNumber: true,
        })}
      />

      <Input
        placeholder="Location"
        {...register("location")}
      />

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

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading
          ? "Creating..."
          : "Create Service"}
      </Button>
    </form>
  );
}