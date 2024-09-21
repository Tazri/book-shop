import { isValidName, isValidPassword } from "@/libs/validation";
import { z } from "zod";

const userSignUpValidationSchema = z.object({
  name: z.string({ message: "Please provide name." }).refine(
    (name) => {
      const check = isValidName(name);
      return check ? false : true;
    },
    {
      message:
        "Name cannot start or end with dot space or dot.Name cannot contain consecutive dots and space.Name can only contain alphabetic characters, spaces, and dots.Name must be between 5 to 16 characters and alphanumeric.",
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
});

export default userSignUpValidationSchema;
