import { model, Schema } from "mongoose";
import { TTask } from "./task.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const TaskSchema = new Schema<TTask>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    sprintId: { type: Schema.Types.ObjectId, ref: "Sprint", required: true },
    assignees: [{ type: Schema.Types.ObjectId, ref: "User" }],
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
  },
  { timestamps: true }
);

// prevent duplicate title
TaskSchema.pre("save", async function (next) {
  const existing = await Task.findOne({ title: this.title });
  if (existing) {
    throw new AppError(httpStatus.BAD_REQUEST, "Task title already exists");
  }
  next();
});

TaskSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const existing = await Task.findOne(query);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Task not found");
  }
  next();
});

export const Task = model<TTask>("Task", TaskSchema);
