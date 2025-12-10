import { Types } from "mongoose";

export type TTask = {
  title: string;
  description: string;
  projectId: Types.ObjectId;
  sprintId: Types.ObjectId;
  assignees?: Types.ObjectId[];
  estimate: number;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in-progress" | "review" | "done";
  dueDate: string;
  attachments?: string[];
  subtasks?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
};
