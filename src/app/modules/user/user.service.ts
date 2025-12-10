import mongoose from "mongoose";
import config from "../../config";
import { TAdmin } from "../admin/admin.interface";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { generateAdminId, generateMemberId } from "./user.utils";
import { Admin } from "../admin/admin.model";
import { Member } from "../member/member.model";
import { TMember } from "../member/member.interface";

const createMemberIntoDB = async (payload: TMember) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = payload.password;

  //set student role
  userData.role = "member";
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = payload.id;

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a Member
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Member");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a Member (transaction-2)
    const newMember = await Member.create([payload], { session });

    if (!newMember.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Member");
    }

    await session.commitTransaction();
    await session.endSession();

    return newMember;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = payload.password || (config.default_password as string);

  //set student role
  userData.role = "admin";
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMeIntoDB = async (userId: string, role: string) => {
  // const decoded = veriFyToken(token, config.jwt_secret as string)
  // const { userId, role } = decoded
  // console.log(userId, role)

  let result = null;
  if (role === "member") {
    result = await Member.findOne({ id: userId }).populate("user");
  }

  if (role === "admin") {
    result = await Admin.findOne({ id: userId }).populate("user");
  }

  return result;
};

const changeStatusIntoDB = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const getAllUsersIntoDB = async () => {
  const members = await Member.find().populate("user");
  const admins = await Admin.find().populate("user");

  return {
    members,
    admins,
  };
};

export const userService = {
  getAllUsersIntoDB,
  createAdminIntoDB,
  createMemberIntoDB,
  getMeIntoDB,
  changeStatusIntoDB,
};
