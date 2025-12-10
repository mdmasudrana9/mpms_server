"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMember = void 0;
const mongoose_1 = require("mongoose");
const TeamMemberSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "manager", "member"],
        default: "member",
    },
    department: { type: String, required: true },
    skills: [{ type: String }],
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.TeamMember = (0, mongoose_1.model)("TeamMember", TeamMemberSchema);
