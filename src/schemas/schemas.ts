import { Status } from "@prisma/client";
import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be of type string",
      })
      .min(2, "Name must be at least 2 characters")
      .max(200, "Name must be less than 200 characters"),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be of type string",
      })
      .email("Email must be a valid email address"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be of type string",
      })
      .min(6, "Password must be at least 6 characters")
      .max(200, "Password must be less than 200 characters"),
    confirmPassword: z.string({
      required_error: "Password is required",
      invalid_type_error: "Password must be of type string",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
  });

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be of type string",
    })
    .email("Email must be a valid email address"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be of type string",
    })
    .min(6, "Password must be at least 6 characters")
    .max(200, "Password must be less than 200 characters"),
});

export const updateAccountSchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be of type string",
      })
      .min(2, "Name must be at least 2 characters")
      .max(200, "Name must be less than 200 characters")
      .optional(),

    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be of type string",
      })
      .email("Email must be a valid email address")
      .optional(),

    oldPassword: z
      .string({
        required_error: "Old password is required",
        invalid_type_error: "Old password must be of type string",
      })
      .min(6, "Old password  must be at least 6 characters")
      .max(200, "Old password  must be less than 200 characters")
      .optional(),

    newPassword: z
      .string({
        required_error: "New password is required",
        invalid_type_error: "New password must be of type string",
      })
      .min(6, "New password be at least 6 characters")
      .max(200, "New password be less than 200 characters")
      .optional(),

    confirmPassword: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be of type string",
      })
      .optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
  });

export type TUpdateAccount = z.infer<typeof updateAccountSchema>;

export const addTaskSchema = z.object({
  userId: z.number({
    required_error: "User id is required",
    invalid_type_error: "User id must be of type number",
  }),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be of type string",
    })
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be less than 200 characters"),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be of type string",
    })
    .min(4, "Description must be at least 4 characters"),
});

export const editTaskSchema = z.object({
  userId: z.number({
    required_error: "User id is required",
    invalid_type_error: "User id must be of type number",
  }),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be of type string",
    })
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be less than 200 characters")
    .optional(),

  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be of type string",
    })
    .min(4, "Description must be at least 4 characters")
    .optional(),
  status: z
    .nativeEnum(Status, {
      required_error: "Status is required",
      invalid_type_error: "Status must be of type string",
    })
    .optional(),
});
