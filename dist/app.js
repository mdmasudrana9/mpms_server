"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("./app/config"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//parser
app.use((0, cookie_parser_1.default)());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cors({ origin: "https://mpms-khaki.vercel.app", credentials: true }));
app.use((0, cors_1.default)());
// middlewares
app.use((0, helmet_1.default)());
if (config_1.default.nodeEnv === "development")
    app.use((0, morgan_1.default)("dev"));
// base route
app.use("/api/v1", routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// Middleware usage
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
// unknown route handling
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: `Route ${req.originalUrl} cannot found`,
        error: {
            code: 404,
            description: "Please provide an valid Route",
        },
    });
});
exports.default = app;
