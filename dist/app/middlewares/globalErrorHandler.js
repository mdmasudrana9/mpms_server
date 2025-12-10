"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDublicateError_1 = __importDefault(require("../errors/handleDublicateError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
//use ErrorRequestHandler for this code and also remove -->NextFunction, Request, Response aslo remove return key word
const globalErrorHandler = (err, req, res, next) => {
    //seting defaults values
    let statusCode = 500;
    let message = "Something went wrong";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    //Zod Error handle
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if (err?.name === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if (err?.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if (err?.code === 11000) {
        const simplifiedError = (0, handleDublicateError_1.default)(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorSources = [
            {
                path: "",
                message: err?.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err?.message;
        errorSources = [
            {
                path: "",
                message: err?.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config_1.default.nodeEnv === "development" ? err?.stack : null,
        //error: err,
    });
};
exports.default = globalErrorHandler;
