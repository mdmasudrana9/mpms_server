import { z } from "zod";

const createTaskValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    projectId: z.string(),
    sprintId: z.string(),
    assignees: z.array(z.string()).optional(),
    estimate: z.number(),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
    status: z.enum(["todo", "in-progress", "review", "done"]).optional(),
    dueDate: z.string(),
    attachments: z.array(z.string()).optional(),
    subtasks: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          completed: z.boolean(),
        })
      )
      .optional(),
  }),
});

const updateTaskValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    projectId: z.string().optional(),
    sprintId: z.string().optional(),
    assignees: z.array(z.string()).optional(),
    estimate: z.number().optional(),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
    status: z.enum(["todo", "in-progress", "review", "done"]).optional(),
    dueDate: z.string().optional(),
    attachments: z.array(z.string()).optional(),
    subtasks: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          completed: z.boolean(),
        })
      )
      .optional(),
  }),
});

export const taskValidation = {
  createTaskValidationSchema,
  updateTaskValidationSchema,
};
