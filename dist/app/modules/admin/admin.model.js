"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "ID is required"],
        unique: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User id is required"],
        unique: true,
        ref: "User",
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    profileImg: { type: String, default: "" },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
//filter Ou deleted documents
adminSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
adminSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
adminSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
//checking if user is already exist!
adminSchema.statics.isUserExists = async function (id) {
    const existingUser = await exports.Admin.findOne({ id });
    return existingUser;
};
exports.Admin = (0, mongoose_1.model)("Admin", adminSchema);
