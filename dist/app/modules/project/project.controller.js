"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const project_service_1 = require("./project.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createProject = (0, catchAsync_1.default)(async (req, res) => {
    const result = await project_service_1.ProjectServices.createProjectIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Project created successfully",
        data: result,
    });
});
const getAllProjects = (0, catchAsync_1.default)(async (req, res) => {
    const result = await project_service_1.ProjectServices.getAllProjectsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All projects retrieved successfully",
        data: result,
    });
});
const getSingleProject = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await project_service_1.ProjectServices.getSingleProjectFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single project retrieved successfully",
        data: result,
    });
});
const updateProject = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await project_service_1.ProjectServices.updateProjectIntoDB(id, payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Project updated successfully",
        data: result,
    });
});
const deleteProject = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await project_service_1.ProjectServices.deleteProjectFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Project deleted successfully",
        data: result,
    });
});
exports.ProjectControllers = {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProject,
    deleteProject,
};
