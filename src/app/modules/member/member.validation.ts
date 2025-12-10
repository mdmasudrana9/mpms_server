import { z } from "zod";

export const createMemberValidationSchema = z.object({
  body: z.object({
    member: z.object({
      name: z.string().min(3).max(20),
      password: z.string().max(20).optional(),
      email: z.string().email().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const updateMemberValidationSchema = z.object({
  body: z.object({
    Member: z.object({
      name: z.string().min(3).max(20),
      email: z.string().email().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const MemberValidations = {
  createMemberValidationSchema,
  updateMemberValidationSchema,
};
