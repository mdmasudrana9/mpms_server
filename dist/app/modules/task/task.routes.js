"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoutes = void 0;
const express_1 = require("express");
const task_validation_1 = require("./task.validation");
const task_controller_1 = require("./task.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = (0, express_1.Router)();
router.post("/create-task", (0, validateRequest_1.default)(task_validation_1.taskValidation.createTaskValidationSchema), task_controller_1.TaskControllers.createTask);
router.get("/", task_controller_1.TaskControllers.getAllTasks);
router.get("/:id", task_controller_1.TaskControllers.getSingleTask);
router.patch("/:id", (0, validateRequest_1.default)(task_validation_1.taskValidation.updateTaskValidationSchema), task_controller_1.TaskControllers.updateTask);
router.delete("/:id", task_controller_1.TaskControllers.deleteTask);
exports.TaskRoutes = router;
