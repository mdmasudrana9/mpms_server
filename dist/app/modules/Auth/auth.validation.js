"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
// Helper function to keep the code clean and focused on non-empty validation
const requiredString = (message) => zod_1.z.string().nonempty({ message });
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: requiredString("id is required."),
        password: requiredString("Password is required"),
    }),
});
const changePassWordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: requiredString("Old Password is required."),
        newPassword: requiredString("Password is required"),
    }),
});
const refreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: requiredString("Refresh Token is required."),
    }),
});
const forgotPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: requiredString("id is required."),
    }),
});
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: requiredString("Id is required."),
        newPassword: requiredString("User Password is required."),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
    changePassWordValidationSchema,
    refreshTokenValidationSchema,
    forgotPasswordValidationSchema,
    resetPasswordValidationSchema,
};
