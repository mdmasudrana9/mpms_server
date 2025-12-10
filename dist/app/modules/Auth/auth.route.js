"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const user_constant_1 = require("../user/user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.loginUser);
router.post("/refresh-token", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenValidationSchema), auth_controller_1.AuthController.refreshToken);
// router.post(
//   "/forget-password",
//   ValidateRequest(AuthValidation.forgotPasswordValidationSchema),
//   AuthController.forgotPassword
// );
router.post("/reset-password", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.resetPasswordValidationSchema), auth_controller_1.AuthController.resetPassword);
router.post("/change-password", (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.member), (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePassWordValidationSchema), auth_controller_1.AuthController.changePassword);
// router.get('/:id', AdminControllers.getSingleAdmin)
// router.patch(
//   '/:id',
//   ValidateRequest(updateAdminValidationSchema),
//   AdminControllers.updateAdmin,
// )
// router.delete('/:adminId', AdminControllers.deleteAdmin)
exports.AuthRoutes = router;
