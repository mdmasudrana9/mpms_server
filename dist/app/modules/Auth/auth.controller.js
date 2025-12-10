"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.loginUser(req.body);
    //set refreshToken in cokkie
    const { refreshToken, accessToken, needsPasswordChange } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is logged in successfully!",
        data: {
            accessToken,
            needsPasswordChange,
        },
    });
});
const changePassword = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const { ...passWordData } = req.body;
    const result = await auth_service_1.AuthService.changePassword(req.user, passWordData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password is updated  successfully!",
        data: result,
    });
});
const refreshToken = (0, catchAsync_1.default)(async (req, res) => {
    console.log("🔥 Refresh token API hit!");
    const { refreshToken } = req.cookies;
    const result = await auth_service_1.AuthService.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Refresh-token is retrieved successfully!",
        data: result,
    });
});
// const forgotPassword = catchAsync(async (req, res) => {
//   const userId = req.body.id;
//   const result = await AuthService.forgotPassword(userId);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "Reset link is generated successfully!",
//     data: result,
//   });
// });
const resetPassword = (0, catchAsync_1.default)(async (req, res) => {
    const token = req.headers.authorization;
    const result = await auth_service_1.AuthService.resetPassword(req.body, token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password reset  successfully!",
        data: result,
    });
});
exports.AuthController = {
    loginUser,
    changePassword,
    refreshToken,
    resetPassword,
};
