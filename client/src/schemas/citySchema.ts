import { z } from "zod";

export const citySchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .regex(/^[A-Za-z ]+$/, "Only letters allowed"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  tourist_rating: z.number().min(1).max(5),
  date_established: z.string().min(1, "Date is required"),
  estimated_population: z.coerce.number().int().min(1),
});
