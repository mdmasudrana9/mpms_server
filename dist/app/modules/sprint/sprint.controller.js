"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SprintControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const sprint_service_1 = require("./sprint.service");
const createSprint = (0, catchAsync_1.default)(async (req, res) => {
    const result = await sprint_service_1.SprintServices.createSprintIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Sprint created successfully",
        data: result,
    });
});
const getAllSprints = (0, catchAsync_1.default)(async (req, res) => {
    const { projectId } = req.query;
    const result = await sprint_service_1.SprintServices.getAllSprintsFromDB(projectId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All sprints retrieved successfully",
        data: result,
    });
});
const getSingleSprint = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await sprint_service_1.SprintServices.getSingleSprintFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single sprint retrieved successfully",
        data: result,
    });
});
const updateSprint = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await sprint_service_1.SprintServices.updateSprintIntoDB(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Sprint updated successfully",
        data: result,
    });
});
const deleteSprint = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await sprint_service_1.SprintServices.deleteSprintFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Sprint deleted successfully",
        data: result,
    });
});
exports.SprintControllers = {
    createSprint,
    getAllSprints,
    getSingleSprint,
    updateSprint,
    deleteSprint,
};
