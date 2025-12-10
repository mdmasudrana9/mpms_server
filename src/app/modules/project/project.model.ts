import { model, Schema } from "mongoose";
import { TProject } from "./project.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const ProjectSchema = new Schema<TProject>(
  {
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
  },
  { timestamps: true }
);

// Prevent duplicate title
ProjectSchema.pre("save", async function (next) {
  const existing = await Project.findOne({ title: this.title });
  if (existing) {
    throw new AppError(httpStatus.BAD_REQUEST, "Project already exists");
  }
  next();
});

ProjectSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const existing = await Project.findOne(query);
  if (!existing) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }
  next();
});

export const Project = model<TProject>("Project", ProjectSchema);
