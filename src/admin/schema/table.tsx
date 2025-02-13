import { z } from "zod";

export const tableSchema = z.object({
  tableName: z.string().min(1, "atleast one character"),
});
