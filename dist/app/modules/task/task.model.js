"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const TaskSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    projectId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Project", required: true },
    sprintId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Sprint", required: true },
    assignees: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    estimate: { type: Number, required: true },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: "medium",
    },
    status: {
        type: String,
        enum: ["todo", "in-progress", "review", "done"],
        default: "todo",
    },
    dueDate: { type: String, required: true },
    attachments: [{ type: String }],
    subtasks: [
        {
            id: { type: String, required: true },
            title: { type: String, required: true },
            completed: { type: Boolean, default: false },
        },
    ],
}, { timestamps: true });
// prevent duplicate title
TaskSchema.pre("save", async function (next) {
    const existing = await exports.Task.findOne({ title: this.title });
    if (existing) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Task title already exists");
    }
    next();
});
TaskSchema.pre("findOneAndUpdate", async function (next) {
    const query = this.getQuery();
    const existing = await exports.Task.findOne(query);
    if (!existing) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Task not found");
    }
    next();
});
exports.Task = (0, mongoose_1.model)("Task", TaskSchema);
