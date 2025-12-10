"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_service_1 = require("./admin.service");
const http_status_1 = __importDefault(require("http-status"));
const getSingleAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await admin_service_1.AdminServices.getSingleAdminFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin is retrieved successfully',
        data: result,
    });
});
const getAllAdmins = (0, catchAsync_1.default)(async (req, res) => {
    const result = await admin_service_1.AdminServices.getAllAdminsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admins are retrieved successfully',
        data: result,
    });
});
const updateAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const { admin } = req.body;
    const result = await admin_service_1.AdminServices.updateAdminIntoDB(id, admin);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin is updated successfully',
        data: result,
    });
});
const deleteAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { adminId } = req.params;
    const result = await admin_service_1.AdminServices.deleteAdminFromDB(adminId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin is deleted successfully',
        data: result,
    });
});
exports.AdminControllers = {
    getAllAdmins,
    getSingleAdmin,
    deleteAdmin,
    updateAdmin,
};
