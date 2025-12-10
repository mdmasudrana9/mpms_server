"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const task_service_1 = require("./task.service");
const createTask = (0, catchAsync_1.default)(async (req, res) => {
    const result = await task_service_1.TaskServices.createTaskIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Task created successfully",
        data: result,
    });
});
const getAllTasks = (0, catchAsync_1.default)(async (req, res) => {
    const { projectId, sprintId } = req.query;
    const result = await task_service_1.TaskServices.getAllTasksFromDB(projectId, sprintId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All tasks retrieved successfully",
        data: result,
    });
});
const getSingleTask = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await task_service_1.TaskServices.getSingleTaskFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single task retrieved successfully",
        data: result,
    });
});
const updateTask = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await task_service_1.TaskServices.updateTaskIntoDB(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Task updated successfully",
        data: result,
    });
});
const deleteTask = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await task_service_1.TaskServices.deleteTaskFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Task deleted successfully",
        data: result,
    });
});
exports.TaskControllers = {
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask,
};
