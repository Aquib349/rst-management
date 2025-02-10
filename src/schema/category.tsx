import { z } from "zod";

export const formSchema = z.object({
  categoryName: z.string().min(1, "cateory name is required"),
  description: z.string().min(1, "description is required"),
});
