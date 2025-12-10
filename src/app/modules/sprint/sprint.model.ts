import { model, Schema } from "mongoose";
import { TSprint } from "./sprint.interface";
import { Project } from "../project/project.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const SprintSchema = new Schema<TSprint>(
  {
    title: { type: String, required: true },
    sprintNumber: { type: Number },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
  },
  { timestamps: true }
);

// Auto-increment and project existence check
SprintSchema.pre("save", async function (next) {
  // 1️⃣ Check if project exists
  const projectExists = await Project.findById(this.project);
  if (!projectExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Invalid project ID: Project does not exist"
    );
  }

  // 2️⃣ Auto-increment sprint number (only on create)
  if (!this.isNew) return next();

  const lastSprint = await Sprint.find({ project: this.project })
    .sort({ sprintNumber: -1 })
    .limit(1);

  this.sprintNumber =
    lastSprint.length > 0 ? lastSprint[0].sprintNumber + 1 : 1;

  next();
});

// Pre-update: check sprint exists
SprintSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const existing = await Sprint.findOne(query);

  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Sprint not found");
  }
  next();
});

export const Sprint = model<TSprint>("Sprint", SprintSchema);
