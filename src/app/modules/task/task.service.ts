import { Task } from "./task.model";
import { TTask } from "./task.interface";

const createTaskIntoDB = async (payload: TTask) => {
  const result = await Task.create(payload);
  return result;
};

const getAllTasksFromDB = async (projectId?: string, sprintId?: string) => {
  const query: any = {};
  if (projectId) query.projectId = projectId;
  if (sprintId) query.sprintId = sprintId;

  const result = await Task.find(query).populate([
    "assignees",
    "projectId",
    "sprintId",
  ]);
  return result;
};

const getSingleTaskFromDB = async (id: string) => {
  const result = await Task.findById(id).populate([
    "assignees",
    "project",
    "sprint",
  ]);
  return result;
};

const updateTaskIntoDB = async (id: string, payload: Partial<TTask>) => {
  const result = await Task.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteTaskFromDB = async (id: string) => {
  const result = await Task.findByIdAndDelete(id);
  return result;
};

export const TaskServices = {
  createTaskIntoDB,
  getAllTasksFromDB,
  getSingleTaskFromDB,
  updateTaskIntoDB,
  deleteTaskFromDB,
};
