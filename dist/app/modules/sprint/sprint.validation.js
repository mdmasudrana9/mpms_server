"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sprintValidation = void 0;
const zod_1 = require("zod");
const createSprintValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        project: zod_1.z.string(),
        startDate: zod_1.z.string(),
        endDate: zod_1.z.string(),
    }),
});
const updateSprintValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
    }),
});
exports.sprintValidation = {
    createSprintValidationSchema,
    updateSprintValidationSchema,
};
