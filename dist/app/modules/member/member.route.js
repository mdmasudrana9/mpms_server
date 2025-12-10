"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoutes = void 0;
const express_1 = require("express");
const member_controller_1 = require("./member.controller");
const member_validation_1 = require("./member.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.member), member_controller_1.MemberControllers.getAllMembers);
router.get("/:id", member_controller_1.MemberControllers.getSingleMember);
router.patch("/:id", (0, validateRequest_1.default)(member_validation_1.updateMemberValidationSchema), member_controller_1.MemberControllers.updateMember);
router.delete("/:MemberId", member_controller_1.MemberControllers.deleteMember);
exports.MemberRoutes = router;
