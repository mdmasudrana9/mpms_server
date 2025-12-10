"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const admin_validation_1 = require("../admin/admin.validation");
const user_constant_1 = require("./user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const member_validation_1 = require("../member/member.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/create-member", 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(member_validation_1.MemberValidations.createMemberValidationSchema), user_controller_1.userController.createMember);
router.post("/create-admin", 
// auth(USER_ROLE.admin),
(0, validateRequest_1.default)(admin_validation_1.AdminValidations.createAdminValidationSchema), user_controller_1.userController.createAdmin);
router.get("/me", (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.member), user_controller_1.userController.getMe);
// router.post(
//   '/change-status/:id',
//   auth('admin'),
//   ValidateRequest(uservalidation.changeStatususerValidationSchema),
//   userController.changeStatus,
// )
router.get("/all", 
// auth(USER_ROLE.admin, USER_ROLE.member),
user_controller_1.userController.getAllUsers);
exports.UserRoutes = router;
