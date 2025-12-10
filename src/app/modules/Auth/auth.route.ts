import { Router } from "express";

import { AuthController } from "./auth.controller";

import { USER_ROLE } from "../user/user.constant";
import ValidateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/login",
  ValidateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);
router.post(
  "/refresh-token",
  ValidateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken
);
// router.post(
//   "/forget-password",
//   ValidateRequest(AuthValidation.forgotPasswordValidationSchema),
//   AuthController.forgotPassword
// );
router.post(
  "/reset-password",
  ValidateRequest(AuthValidation.resetPasswordValidationSchema),
  AuthController.resetPassword
);
router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.member),
  ValidateRequest(AuthValidation.changePassWordValidationSchema),
  AuthController.changePassword
);

// router.get('/:id', AdminControllers.getSingleAdmin)

// router.patch(
//   '/:id',

//   ValidateRequest(updateAdminValidationSchema),
//   AdminControllers.updateAdmin,
// )

// router.delete('/:adminId', AdminControllers.deleteAdmin)

export const AuthRoutes = router;
