import { z } from "zod";
const otherPropertyKeyValidationSchema = z
  .string()
  .refine((value) => !value.startsWith(" "), {
    message: "Key Name should not start with a space.",
  })
  .refine((value) => !value.endsWith(" "), {
    message: "Key Name should not end with a space.",
  })
  .refine((value) => !/ {2}/.test(value), {
    message: "Key Name should not contain consecutive spaces.",
  });

export default otherPropertyKeyValidationSchema;
