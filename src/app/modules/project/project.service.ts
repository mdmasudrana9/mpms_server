import { TProject } from "./project.interface";
import { Project } from "./project.model";

const createProjectIntoDB = async (payload: TProject) => {
  const result = await Project.create(payload);
  return result;
};

const getAllProjectsFromDB = async () => {
  const result = await Project.find();
  return result;
};

const getSingleProjectFromDB = async (id: string) => {
  const result = await Project.findById(id);
  return result;
};

const updateProjectIntoDB = async (id: string, payload: Partial<TProject>) => {
  const result = await Project.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    upsert: true,
  });
  return result;
};
const deleteProjectFromDB = async (id: string) => {
  const result = await Project.findByIdAndDelete(id);
  return result;
};

export const ProjectServices = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getSingleProjectFromDB,
  updateProjectIntoDB,
  deleteProjectFromDB,
};
