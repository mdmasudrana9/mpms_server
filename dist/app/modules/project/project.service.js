"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectServices = void 0;
const project_model_1 = require("./project.model");
const createProjectIntoDB = async (payload) => {
    const result = await project_model_1.Project.create(payload);
    return result;
};
const getAllProjectsFromDB = async () => {
    const result = await project_model_1.Project.find();
    return result;
};
const getSingleProjectFromDB = async (id) => {
    const result = await project_model_1.Project.findById(id);
    return result;
};
const updateProjectIntoDB = async (id, payload) => {
    const result = await project_model_1.Project.findOneAndUpdate({ _id: id }, payload, {
        new: true,
        upsert: true,
    });
    return result;
};
const deleteProjectFromDB = async (id) => {
    const result = await project_model_1.Project.findByIdAndDelete(id);
    return result;
};
exports.ProjectServices = {
    createProjectIntoDB,
    getAllProjectsFromDB,
    getSingleProjectFromDB,
    updateProjectIntoDB,
    deleteProjectFromDB,
};
