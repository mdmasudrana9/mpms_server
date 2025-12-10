import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import httpStatus from "http-status";

const createAdmin = catchAsync(async (req, res) => {
  const { admin: adminData } = req.body;

  const result = await userService.createAdminIntoDB(adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin is created successfully",
    data: result,
  });
});

const createMember = catchAsync(async (req, res) => {
  console.log("req.body :>> ", req.body);
  const { member: memberData } = req.body;

  const result = await userService.createMemberIntoDB(memberData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member is created successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  // const token = req.headers.authorization

  // if (!token) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'Token not found')
  // }

  const { userId, role } = req.user;
  const result = await userService.getMeIntoDB(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data fetched successfully",
    data: result,
  });
});
const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await userService.changeStatusIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Status change successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsersIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users fetched successfully",
    data: result,
  });
});

export const userController = {
  createMember,
  createAdmin,
  getMe,
  changeStatus,
  getAllUsers,
};
