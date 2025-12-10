import { Types } from "mongoose";

export type TSprint = {
  title: string;
  sprintNumber: number;
  project: Types.ObjectId;
  startDate: string;
  endDate: string;
};
