"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const teamMember_service_1 = require("./teamMember.service");
const createTeamMember = (0, catchAsync_1.default)(async (req, res) => {
    const result = await teamMember_service_1.TeamMemberServices.createTeamMemberInDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Team member created successfully",
        data: result,
    });
});
const getAllTeamMembers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await teamMember_service_1.TeamMemberServices.getAllTeamMembersFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All team members retrieved successfully",
        data: result,
    });
});
const getSingleTeamMember = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await teamMember_service_1.TeamMemberServices.getSingleTeamMemberFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Single team member retrieved successfully",
        data: result,
    });
});
const updateTeamMember = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await teamMember_service_1.TeamMemberServices.updateTeamMemberInDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Team member updated successfully",
        data: result,
    });
});
const deleteTeamMember = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await teamMember_service_1.TeamMemberServices.deleteTeamMemberFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Team member deleted successfully",
        data: result,
    });
});
exports.TeamMemberControllers = {
    createTeamMember,
    getAllTeamMembers,
    getSingleTeamMember,
    updateTeamMember,
    deleteTeamMember,
};
