import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MemberServices } from "./member.service";
import httpStatus from "http-status";

const getSingleMember = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberServices.getSingleMemberFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member is retrieved successfully",
    data: result,
  });
});

const getAllMembers = catchAsync(async (req, res) => {
  const result = await MemberServices.getAllMembersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Members are retrieved successfully",
    data: result,
  });
});

const updateMember = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Member } = req.body;
  const result = await MemberServices.updateMemberIntoDB(id, Member);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member is updated successfully",
    data: result,
  });
});

const deleteMember = catchAsync(async (req, res) => {
  const { MemberId } = req.params;
  const result = await MemberServices.deleteMemberFromDB(MemberId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member is deleted successfully",
    data: result,
  });
});

export const MemberControllers = {
  getAllMembers,
  getSingleMember,
  deleteMember,
  updateMember,
};
