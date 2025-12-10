import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { MemberSearchableFields } from "./member.constant";
import { TMember } from "./member.interface";
import { Member } from "./member.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";

const getAllMembersFromDB = async (query: Record<string, unknown>) => {
  const MemberQuery = new QueryBuilder(Member.find(), query)
    .search(MemberSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await MemberQuery.modelQuery;
  return result;
};

const getSingleMemberFromDB = async (id: string) => {
  const result = await Member.findById(id);
  return result;
};

const updateMemberIntoDB = async (id: string, payload: Partial<TMember>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Member.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteMemberFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Member.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user;
    console.log(userId);
    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const MemberServices = {
  getAllMembersFromDB,
  getSingleMemberFromDB,
  updateMemberIntoDB,
  deleteMemberFromDB,
};
