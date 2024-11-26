import { isValidBase64Image } from "@/libs/validation";
import { z } from "zod";

const authorValidationSchema = z.object({
  name: z
    .string("Author name must be string.")
    .min(3, "Name is must be at least 3 character long.")
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
  totalBooks: z.number().refine((value) => value >= 0, {
    message: "Total books must be a positive number or 0.",
  }),
  birthDate: z.union(
    [
      z.string().datetime(), // ISO date string
      z.literal("unknown"),
      z.literal("private"),
    ],
    {
      message:
        "Please provide datetime in ISO date time format. Or string 'unknown' or 'private'.",
    }
  ),
  deathDate: z.union(
    [z.string().datetime(), z.literal("alive"), z.literal("unknown")],
    {
      message:
        "Please provide datetime in ISO date time format. Or string 'unknown' or 'alive'.",
    }
  ),
  otherProperty: z.record(z.string()).optional(),
});

export default authorValidationSchema;
