import { isValidBase64Image } from "@/libs/validation";
import { z } from "zod";

const categoryValidationSchema = z.object({
  name: z
    .string("Category name mustbe string.")
    .min(1, "Name is must be at least 1 character long.")
    .max(20, "Name must be at most 20 characters long.")
    .refine((val) => !val.startsWith(" "), {
      message: "Name cannot start with a space.",
    })
    .refine((val) => !val.endsWith(" "), {
      message: "Name can not end with a space.",
    })
    .refine((val) => !/\s{2,}/.test(val), {
      message: "Name cannot contain consecutive spaces",
    }),
  description: z
    .string()
    .max(1200, "Description must be under 1200 characters long")
    .optional(),
  img: z.string().refine(
    (data) => {
      const result = isValidBase64Image(data);
      return result.valid;
    },
    {
      message:
        "Invalid image. Must be JPG, JPEG, or WEBP and under 1 MB. Also img format in base 64",
    }
  ),
  totalBooks: z
    .number()
    .refine((value) => value >= 0, {
      message: "Total books must be a positive number or 0.",
    }),
});

export default categoryValidationSchema;
