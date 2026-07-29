import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  role: z.enum(["CUSTOMER", "TECHNICIAN"]),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;