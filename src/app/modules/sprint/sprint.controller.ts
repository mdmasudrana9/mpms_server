import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { SprintServices } from "./sprint.service";

const createSprint = catchAsync(async (req, res) => {
  const result = await SprintServices.createSprintIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Sprint created successfully",
    data: result,
  });
});

const getAllSprints = catchAsync(async (req, res) => {
  const { projectId } = req.query as { projectId?: string };
  const result = await SprintServices.getAllSprintsFromDB(projectId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All sprints retrieved successfully",
    data: result,
  });
});

const getSingleSprint = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SprintServices.getSingleSprintFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single sprint retrieved successfully",
    data: result,
  });
});

const updateSprint = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await SprintServices.updateSprintIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sprint updated successfully",
    data: result,
  });
});

const deleteSprint = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SprintServices.deleteSprintFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Sprint deleted successfully",
    data: result,
  });
});

export const SprintControllers = {
  createSprint,
  getAllSprints,
  getSingleSprint,
  updateSprint,
  deleteSprint,
};
