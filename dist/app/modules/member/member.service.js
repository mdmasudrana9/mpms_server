"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const member_constant_1 = require("./member.constant");
const member_model_1 = require("./member.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../user/user.model");
const getAllMembersFromDB = async (query) => {
    const MemberQuery = new QueryBuilder_1.default(member_model_1.Member.find(), query)
        .search(member_constant_1.MemberSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await MemberQuery.modelQuery;
    return result;
};
const getSingleMemberFromDB = async (id) => {
    const result = await member_model_1.Member.findById(id);
    return result;
};
const updateMemberIntoDB = async (id, payload) => {
    const { name, ...remainingAdminData } = payload;
    const modifiedUpdatedData = {
        ...remainingAdminData,
    };
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    const result = await member_model_1.Member.findByIdAndUpdate({ id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
};
const deleteMemberFromDB = async (id) => {
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const deletedAdmin = await member_model_1.Member.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        if (!deletedAdmin) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete student");
        }
        // get user _id from deletedAdmin
        const userId = deletedAdmin.user;
        console.log(userId);
        const deletedUser = await user_model_1.User.findOneAndUpdate(userId, { isDeleted: true }, { new: true, session });
        if (!deletedUser) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to delete user");
        }
        await session.commitTransaction();
        await session.endSession();
        return deletedAdmin;
    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};
exports.MemberServices = {
    getAllMembersFromDB,
    getSingleMemberFromDB,
    updateMemberIntoDB,
    deleteMemberFromDB,
};
