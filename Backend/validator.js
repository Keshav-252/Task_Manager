import { z } from "zod";
import mongoose from "mongoose";

export const UserSchema = z.object({
  email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string"
    })
    .trim()
    .toLowerCase()
    .email("Invalid email format")
    .max(100, "Email too long"),

  name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string"
    })
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name cannot exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Name can only contain letters, numbers, and underscore"),

  password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string"
    })
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
}).strict();

export const LoginSchema = z.object({
  email: z.string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string"
    })
    .trim()
    .toLowerCase()
    .email("Invalid email"),

  password: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string"
    })
    .min(1, "Password is required")
}).strict();

export const validateObjectId = (string) => {
  return mongoose.Types.ObjectId.isValid(string);
}

