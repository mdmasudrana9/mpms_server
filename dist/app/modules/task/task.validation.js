"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskValidation = void 0;
const zod_1 = require("zod");
const createTaskValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        projectId: zod_1.z.string(),
        sprintId: zod_1.z.string(),
        assignees: zod_1.z.array(zod_1.z.string()).optional(),
        estimate: zod_1.z.number(),
        priority: zod_1.z.enum(["low", "medium", "high", "urgent"]).optional(),
        status: zod_1.z.enum(["todo", "in-progress", "review", "done"]).optional(),
        dueDate: zod_1.z.string(),
        attachments: zod_1.z.array(zod_1.z.string()).optional(),
        subtasks: zod_1.z
            .array(zod_1.z.object({
            id: zod_1.z.string(),
            title: zod_1.z.string(),
            completed: zod_1.z.boolean(),
        }))
            .optional(),
    }),
});
const updateTaskValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        projectId: zod_1.z.string().optional(),
        sprintId: zod_1.z.string().optional(),
        assignees: zod_1.z.array(zod_1.z.string()).optional(),
        estimate: zod_1.z.number().optional(),
        priority: zod_1.z.enum(["low", "medium", "high", "urgent"]).optional(),
        status: zod_1.z.enum(["todo", "in-progress", "review", "done"]).optional(),
        dueDate: zod_1.z.string().optional(),
        attachments: zod_1.z.array(zod_1.z.string()).optional(),
        subtasks: zod_1.z
            .array(zod_1.z.object({
            id: zod_1.z.string(),
            title: zod_1.z.string(),
            completed: zod_1.z.boolean(),
        }))
            .optional(),
    }),
});
exports.taskValidation = {
    createTaskValidationSchema,
    updateTaskValidationSchema,
};
