import { z } from "zod";

export const technicianProfileSchema = z.object({
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio must not exceed 500 characters"),

  experience: z
    .number()
    .min(0, "Experience cannot be negative")
    .max(50, "Experience cannot exceed 50 years"),

  address: z
    .string()
    .min(3, "Address is required")
    .max(200, "Address is too long"),
});

export type TechnicianProfileFormValues = z.infer<
  typeof technicianProfileSchema
>;