"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data?.statusCode || 500).json({
        success: data?.success || false,
        message: data?.message || 'An error occurred',
        data: data?.data || null,
    });
};
exports.default = sendResponse;
