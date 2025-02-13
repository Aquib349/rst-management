import { z } from "zod";

// Define the form schema
export const formSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters.")
    .max(50, "Full name must be at most 50 characters."),
  email: z.string().email("Invalid email format."),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits.")
    .max(15, "Phone number is too long."),
  inviteCode: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
