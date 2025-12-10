import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { TeamMemberServices } from "./teamMember.service";

const createTeamMember = catchAsync(async (req, res) => {
  const result = await TeamMemberServices.createTeamMemberInDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team member created successfully",
    data: result,
  });
});

const getAllTeamMembers = catchAsync(async (req, res) => {
  const result = await TeamMemberServices.getAllTeamMembersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All team members retrieved successfully",
    data: result,
  });
});

const getSingleTeamMember = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TeamMemberServices.getSingleTeamMemberFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single team member retrieved successfully",
    data: result,
  });
});

const updateTeamMember = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TeamMemberServices.updateTeamMemberInDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team member updated successfully",
    data: result,
  });
});

const deleteTeamMember = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TeamMemberServices.deleteTeamMemberFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team member deleted successfully",
    data: result,
  });
});

export const TeamMemberControllers = {
  createTeamMember,
  getAllTeamMembers,
  getSingleTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
