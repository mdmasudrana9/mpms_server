"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const member_service_1 = require("./member.service");
const http_status_1 = __importDefault(require("http-status"));
const getSingleMember = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await member_service_1.MemberServices.getSingleMemberFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Member is retrieved successfully",
        data: result,
    });
});
const getAllMembers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await member_service_1.MemberServices.getAllMembersFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Members are retrieved successfully",
        data: result,
    });
});
const updateMember = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const { Member } = req.body;
    const result = await member_service_1.MemberServices.updateMemberIntoDB(id, Member);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Member is updated successfully",
        data: result,
    });
});
const deleteMember = (0, catchAsync_1.default)(async (req, res) => {
    const { MemberId } = req.params;
    const result = await member_service_1.MemberServices.deleteMemberFromDB(MemberId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Member is deleted successfully",
        data: result,
    });
});
exports.MemberControllers = {
    getAllMembers,
    getSingleMember,
    deleteMember,
    updateMember,
};
