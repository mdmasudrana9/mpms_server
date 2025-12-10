import { z } from "zod";

const createSprintValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    project: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  }),
});

const updateSprintValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  }),
});

export const sprintValidation = {
  createSprintValidationSchema,
  updateSprintValidationSchema,
};
