"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberValidations = exports.updateMemberValidationSchema = exports.createMemberValidationSchema = void 0;
const zod_1 = require("zod");
exports.createMemberValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        member: zod_1.z.object({
            name: zod_1.z.string().min(3).max(20),
            password: zod_1.z.string().max(20).optional(),
            email: zod_1.z.string().email().optional(),
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
exports.updateMemberValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        Member: zod_1.z.object({
            name: zod_1.z.string().min(3).max(20),
            email: zod_1.z.string().email().optional(),
            profileImg: zod_1.z.string().optional(),
        }),
    }),
});
exports.MemberValidations = {
    createMemberValidationSchema: exports.createMemberValidationSchema,
    updateMemberValidationSchema: exports.updateMemberValidationSchema,
};
