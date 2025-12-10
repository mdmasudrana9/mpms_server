import { Router } from "express";
import { taskValidation } from "./task.validation";
import { TaskControllers } from "./task.controller";
import ValidateRequest from "../../middlewares/validateRequest";

const router = Router();

router.post(
  "/create-task",
  ValidateRequest(taskValidation.createTaskValidationSchema),
  TaskControllers.createTask
);

router.get("/", TaskControllers.getAllTasks);
router.get("/:id", TaskControllers.getSingleTask);

router.patch(
  "/:id",
  ValidateRequest(taskValidation.updateTaskValidationSchema),
  TaskControllers.updateTask
);

router.delete("/:id", TaskControllers.deleteTask);

export const TaskRoutes = router;
