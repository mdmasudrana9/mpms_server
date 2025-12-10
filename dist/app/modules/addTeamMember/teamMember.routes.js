"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberRoutes = void 0;
const express_1 = require("express");
const teamMember_controller_1 = require("./teamMember.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), teamMember_controller_1.TeamMemberControllers.createTeamMember);
router.get("/", teamMember_controller_1.TeamMemberControllers.getAllTeamMembers);
router.get("/:id", teamMember_controller_1.TeamMemberControllers.getSingleTeamMember);
router.patch("/:id", teamMember_controller_1.TeamMemberControllers.updateTeamMember);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.member), teamMember_controller_1.TeamMemberControllers.deleteTeamMember);
exports.TeamMemberRoutes = router;
