import { model, Schema } from "mongoose";

export interface ITeamMember {
  userId: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member";
  department: string;
  skills?: string[];
  createdAt?: string;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "manager", "member"],
      default: "member",
    },
    department: { type: String, required: true },
    skills: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const TeamMember = model<ITeamMember>("TeamMember", TeamMemberSchema);
