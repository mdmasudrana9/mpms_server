import { z } from "zod";

// Helper function to keep the code clean and focused on non-empty validation
const requiredString = (message: string) => z.string().nonempty({ message });

const loginValidationSchema = z.object({
  body: z.object({
    id: requiredString("id is required."),
    password: requiredString("Password is required"),
  }),
});

const changePassWordValidationSchema = z.object({
  body: z.object({
    oldPassword: requiredString("Old Password is required."),
    newPassword: requiredString("Password is required"),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string().optional(),
  }),
});

const forgotPasswordValidationSchema = z.object({
  body: z.object({
    id: requiredString("id is required."),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: requiredString("Id is required."),
    newPassword: requiredString("User Password is required."),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  changePassWordValidationSchema,
  refreshTokenValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
};
