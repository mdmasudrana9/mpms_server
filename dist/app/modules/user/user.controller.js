"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { admin: adminData } = req.body;
    const result = await user_service_1.userService.createAdminIntoDB(adminData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Admin is created successfully",
        data: result,
    });
});
const createMember = (0, catchAsync_1.default)(async (req, res) => {
    console.log("req.body :>> ", req.body);
    const { member: memberData } = req.body;
    const result = await user_service_1.userService.createMemberIntoDB(memberData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Member is created successfully",
        data: result,
    });
});
const getMe = (0, catchAsync_1.default)(async (req, res) => {
    // const token = req.headers.authorization
    // if (!token) {
    //   throw new AppError(httpStatus.NOT_FOUND, 'Token not found')
    // }
    const { userId, role } = req.user;
    const result = await user_service_1.userService.getMeIntoDB(userId, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User data fetched successfully",
        data: result,
    });
});
const changeStatus = (0, catchAsync_1.default)(async (req, res) => {
    const id = req.params.id;
    const result = await user_service_1.userService.changeStatusIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User Status change successfully",
        data: result,
    });
});
const getAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.userService.getAllUsersIntoDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All users fetched successfully",
        data: result,
    });
});
exports.userController = {
    createMember,
    createAdmin,
    getMe,
    changeStatus,
    getAllUsers,
};
