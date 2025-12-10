"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMemberId = exports.findLastMemberId = exports.generateAdminId = exports.findLastAdminId = void 0;
const user_model_1 = require("./user.model");
// Admin ID
const findLastAdminId = async () => {
    const lastAdmin = await user_model_1.User.findOne({
        role: "admin",
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};
exports.findLastAdminId = findLastAdminId;
const generateAdminId = async () => {
    let currentId = (0).toString();
    const lastAdminId = await (0, exports.findLastAdminId)();
    if (lastAdminId) {
        currentId = lastAdminId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `A-${incrementId}`;
    return incrementId;
};
exports.generateAdminId = generateAdminId;
// Member ID
const findLastMemberId = async () => {
    const lastMember = await user_model_1.User.findOne({
        role: "member",
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return lastMember?.id ? lastMember.id.substring(2) : undefined;
};
exports.findLastMemberId = findLastMemberId;
const generateMemberId = async () => {
    let currentId = (0).toString();
    const lastMemberId = await (0, exports.findLastMemberId)();
    if (lastMemberId) {
        currentId = lastMemberId.substring(2);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `M-${incrementId}`;
    return incrementId;
};
exports.generateMemberId = generateMemberId;
