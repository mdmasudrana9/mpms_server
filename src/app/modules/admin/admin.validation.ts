import { z } from "zod";

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    admin: z.object({
      name: z.string().min(3).max(20),
      password: z.string().max(20).optional(),
      email: z.string().email().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: z.string().min(3).max(20),
      email: z.string().email().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
