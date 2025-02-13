import { z } from "zod";

export const forgotpasswordformSchema = z.object({
  email: z.string().email("Invalid email format."),
});
