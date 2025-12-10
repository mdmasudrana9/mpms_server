"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SprintServices = void 0;
const sprint_model_1 = require("./sprint.model");
const createSprintIntoDB = async (payload) => {
    const result = await sprint_model_1.Sprint.create(payload);
    return result;
};
const getAllSprintsFromDB = async (projectId) => {
    const query = projectId ? { project: projectId } : {};
    const result = await sprint_model_1.Sprint.find(query)
        .sort({ sprintNumber: 1 })
        .populate("project");
    return result;
};
const getSingleSprintFromDB = async (id) => {
    const result = await sprint_model_1.Sprint.findById(id).populate("project");
    return result;
};
const updateSprintIntoDB = async (id, payload) => {
    const result = await sprint_model_1.Sprint.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const deleteSprintFromDB = async (id) => {
    const result = await sprint_model_1.Sprint.findByIdAndDelete(id);
    return result;
};
exports.SprintServices = {
    createSprintIntoDB,
    getAllSprintsFromDB,
    getSingleSprintFromDB,
    updateSprintIntoDB,
    deleteSprintFromDB,
};
