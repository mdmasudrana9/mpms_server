"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberServices = void 0;
const teamMember_model_1 = require("./teamMember.model");
const createTeamMemberInDB = async (payload) => {
    const result = await teamMember_model_1.TeamMember.create(payload);
    return result;
};
const getAllTeamMembersFromDB = async () => {
    return await teamMember_model_1.TeamMember.find();
};
const getSingleTeamMemberFromDB = async (id) => {
    return await teamMember_model_1.TeamMember.findById(id);
};
const updateTeamMemberInDB = async (id, payload) => {
    return await teamMember_model_1.TeamMember.findByIdAndUpdate(id, payload, { new: true });
};
const deleteTeamMemberFromDB = async (id) => {
    return await teamMember_model_1.TeamMember.findByIdAndDelete(id);
};
exports.TeamMemberServices = {
    createTeamMemberInDB,
    getAllTeamMembersFromDB,
    getSingleTeamMemberFromDB,
    updateTeamMemberInDB,
    deleteTeamMemberFromDB,
};
