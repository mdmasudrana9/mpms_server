import { TSprint } from "./sprint.interface";
import { Sprint } from "./sprint.model";

const createSprintIntoDB = async (payload: TSprint) => {
  const result = await Sprint.create(payload);
  return result;
};

const getAllSprintsFromDB = async (projectId?: string) => {
  const query = projectId ? { project: projectId } : {};
  const result = await Sprint.find(query)
    .sort({ sprintNumber: 1 })
    .populate("project");
  return result;
};

const getSingleSprintFromDB = async (id: string) => {
  const result = await Sprint.findById(id).populate("project");
  return result;
};

const updateSprintIntoDB = async (id: string, payload: Partial<TSprint>) => {
  const result = await Sprint.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSprintFromDB = async (id: string) => {
  const result = await Sprint.findByIdAndDelete(id);
  return result;
};

export const SprintServices = {
  createSprintIntoDB,
  getAllSprintsFromDB,
  getSingleSprintFromDB,
  updateSprintIntoDB,
  deleteSprintFromDB,
};
