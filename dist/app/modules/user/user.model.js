"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        select: 0,
    },
    needsPasswordChange: {
        type: String,
    },
    passwordChangedAt: {
        type: Date,
    },
    role: {
        type: String,
        enum: ["superAdmin", "member", "admin"],
    },
    status: {
        type: String,
        enum: ["in-progress", "blocked"],
        default: "in-progress",
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
//Pre save middleware/hook:
userSchema.pre("save", async function () {
    // console.log(this, 'will save before call middleware')
    const user = this;
    user.password = await bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
});
//post save middleware/hook:
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
    // console.log(this, 'was saved after middleware')
});
//static methods
userSchema.statics.isUserExistsByCustomId = async function (id) {
    return await exports.User.findOne({ id }).select("+password");
};
userSchema.statics.isPasswordMatched = async function (plainTextPassword, hashedPassword) {
    return await bcrypt_1.default.compare(plainTextPassword, hashedPassword);
};
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (passwordChangedTimestamp, jwtIssuedTimestamp) {
    const passwordChangedTime = new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};
exports.User = (0, mongoose_1.model)("User", userSchema);
