"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_utils_1 = require("./user.utils");
const admin_model_1 = require("../admin/admin.model");
const member_model_1 = require("../member/member.model");
const createMemberIntoDB = async (payload) => {
    // create a user object
    const userData = {};
    //if password is not given , use default password
    userData.password = payload.password;
    //set student role
    userData.role = "member";
    userData.email = payload.email;
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = payload.id;
        // create a user (transaction-1)
        const newUser = await user_model_1.User.create([userData], { session });
        //create a Member
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create Member");
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a Member (transaction-2)
        const newMember = await member_model_1.Member.create([payload], { session });
        if (!newMember.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create Member");
        }
        await session.commitTransaction();
        await session.endSession();
        return newMember;
    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};
const createAdminIntoDB = async (payload) => {
    // create a user object
    const userData = {};
    //if password is not given , use default password
    userData.password = payload.password || config_1.default.default_password;
    //set student role
    userData.role = "admin";
    userData.email = payload.email;
    const session = await mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //set  generated id
        userData.id = await (0, user_utils_1.generateAdminId)();
        // create a user (transaction-1)
        const newUser = await user_model_1.User.create([userData], { session });
        //create a admin
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create admin");
        }
        // set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id; //reference _id
        // create a admin (transaction-2)
        const newAdmin = await admin_model_1.Admin.create([payload], { session });
        if (!newAdmin.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create admin");
        }
        await session.commitTransaction();
        await session.endSession();
        return newAdmin;
    }
    catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }
};
const getMeIntoDB = async (userId, role) => {
    // const decoded = veriFyToken(token, config.jwt_secret as string)
    // const { userId, role } = decoded
    // console.log(userId, role)
    let result = null;
    if (role === "member") {
        result = await member_model_1.Member.findOne({ id: userId }).populate("user");
    }
    if (role === "admin") {
        result = await admin_model_1.Admin.findOne({ id: userId }).populate("user");
    }
    return result;
};
const changeStatusIntoDB = async (id, payload) => {
    const result = await user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};
const getAllUsersIntoDB = async () => {
    const members = await member_model_1.Member.find().populate("user");
    const admins = await admin_model_1.Admin.find().populate("user");
    return {
        members,
        admins,
    };
};
exports.userService = {
    getAllUsersIntoDB,
    createAdminIntoDB,
    createMemberIntoDB,
    getMeIntoDB,
    changeStatusIntoDB,
};
