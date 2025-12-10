"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectValidation = void 0;
const zod_1 = require("zod");
const createProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        client: zod_1.z.string(),
        description: zod_1.z.string(),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
        budget: zod_1.z.number(),
        status: zod_1.z.enum(["planned", "active", "completed", "archived"]).optional(),
        thumbnail: zod_1.z.string().optional(),
    }),
});
const updateProjectValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        client: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        status: zod_1.z.enum(["planned", "active", "completed", "archived"]).optional(),
        thumbnail: zod_1.z.string().optional(),
    }),
});
exports.projectValidation = {
    createProjectValidationSchema,
    updateProjectValidationSchema,
};
