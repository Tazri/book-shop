import { isValidPassword, isValidUsername } from "@/libs/validation";
import { z } from "zod";

const adminUserValidationSchema = z.object({
  username: z.string({ message: "Please provide username." }).refine(
    (username) => {
      const check = isValidUsername(username);
      return check ? false : true;
    },
    {
      message: "Username contain only alphabets, numbers and digits.",
    }
  ),

  email: z
    .string({ message: "Please provide email." })
    .email({ message: "Please provide valid email." }),

  password: z.string({ message: "Provide password." }).refine(
    (password) => {
      const check = isValidPassword(password);
      return check ? false : true;
    },
    {
      message:
        "Password must be at least 8 characters long.Password must include at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.Password must be under 128 characters.",
    }
  ),
  role: z.enum(["admin", "moderator"]),
});

export default adminUserValidationSchema;
