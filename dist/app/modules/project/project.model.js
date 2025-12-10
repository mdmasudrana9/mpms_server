"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const ProjectSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    client: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    budget: { type: Number, required: true },
    status: {
        type: String,
        enum: ["planned", "active", "completed", "archived"],
        default: "planned",
    },
    thumbnail: { type: String, default: null },
}, { timestamps: true });
// Prevent duplicate title
ProjectSchema.pre("save", async function (next) {
    const existing = await exports.Project.findOne({ title: this.title });
    if (existing) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Project already exists");
    }
    next();
});
ProjectSchema.pre("findOneAndUpdate", async function (next) {
    const query = this.getQuery();
    const existing = await exports.Project.findOne(query);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Project not found");
    }
    next();
});
exports.Project = (0, mongoose_1.model)("Project", ProjectSchema);
