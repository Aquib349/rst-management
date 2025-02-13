import { z } from "zod";

export const formSchema = z.object({
  menuName: z.string().min(1, "Menu Name is required"),
  foodType: z.string().min(1, "Food Type is required").optional(),
  ingredientDetails: z
    .string()
    .min(1, "Ingredient Details are required")
    .optional(),
  description: z.string().min(1, "Description is required").optional(),
  remarks: z.string().min(1, "Remarks are required").optional(),
  foodCategoryId: z.number().min(1, "Food Category is required"),
  image: z.string().optional(),
  price: z.number().positive("Price must be greater than 0"),
});
