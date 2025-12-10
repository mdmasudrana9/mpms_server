"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidations = exports.updateAdminValidationSchema = exports.createAdminValidationSchema = void 0;
const zod_1 = require("zod");
exports.createAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().max(20).optional(),
        admin: zod_1.z.object({
            name: zod_1.z.string().min(3).max(20),
            password: zod_1.z.string().max(20).optional(),
            email: zod_1.z.string().email().optional(),
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
exports.updateAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        admin: zod_1.z.object({
            name: zod_1.z.string().min(3).max(20),
            email: zod_1.z.string().email().optional(),
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
exports.AdminValidations = {
    createAdminValidationSchema: exports.createAdminValidationSchema,
    updateAdminValidationSchema: exports.updateAdminValidationSchema,
};
