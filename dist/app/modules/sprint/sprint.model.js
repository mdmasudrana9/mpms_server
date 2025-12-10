"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sprint = void 0;
const mongoose_1 = require("mongoose");
const project_model_1 = require("../project/project.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const SprintSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    sprintNumber: { type: Number },
    project: { type: mongoose_1.Schema.Types.ObjectId, ref: "Project", required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
}, { timestamps: true });
// Auto-increment and project existence check
SprintSchema.pre("save", async function (next) {
    // 1️⃣ Check if project exists
    const projectExists = await project_model_1.Project.findById(this.project);
    if (!projectExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Invalid project ID: Project does not exist");
    }
    // 2️⃣ Auto-increment sprint number (only on create)
    if (!this.isNew)
        return next();
    const lastSprint = await exports.Sprint.find({ project: this.project })
        .sort({ sprintNumber: -1 })
        .limit(1);
    this.sprintNumber =
        lastSprint.length > 0 ? lastSprint[0].sprintNumber + 1 : 1;
    next();
});
// Pre-update: check sprint exists
SprintSchema.pre("findOneAndUpdate", async function (next) {
    const query = this.getQuery();
    const existing = await exports.Sprint.findOne(query);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Sprint not found");
    }
    next();
});
exports.Sprint = (0, mongoose_1.model)("Sprint", SprintSchema);
