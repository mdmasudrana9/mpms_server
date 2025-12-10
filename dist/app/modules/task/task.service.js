"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskServices = void 0;
const task_model_1 = require("./task.model");
const createTaskIntoDB = async (payload) => {
    const result = await task_model_1.Task.create(payload);
    return result;
};
const getAllTasksFromDB = async (projectId, sprintId) => {
    const query = {};
    if (projectId)
        query.projectId = projectId;
    if (sprintId)
        query.sprintId = sprintId;
    const result = await task_model_1.Task.find(query).populate([
        "assignees",
        "projectId",
        "sprintId",
    ]);
    return result;
};
const getSingleTaskFromDB = async (id) => {
    const result = await task_model_1.Task.findById(id).populate([
        "assignees",
        "project",
        "sprint",
    ]);
    return result;
};
const updateTaskIntoDB = async (id, payload) => {
    const result = await task_model_1.Task.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};
const deleteTaskFromDB = async (id) => {
    const result = await task_model_1.Task.findByIdAndDelete(id);
    return result;
};
exports.TaskServices = {
    createTaskIntoDB,
    getAllTasksFromDB,
    getSingleTaskFromDB,
    updateTaskIntoDB,
    deleteTaskFromDB,
};
