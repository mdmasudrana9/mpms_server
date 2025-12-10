import express, { NextFunction, Request, Response } from "express";

import { userController } from "./user.controller";
import { AdminValidations } from "../admin/admin.validation";

import { USER_ROLE } from "./user.constant";
import ValidateRequest from "../../middlewares/validateRequest";
import { MemberValidations } from "../member/member.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-member",
  // auth(USER_ROLE.admin),
  ValidateRequest(MemberValidations.createMemberValidationSchema),
  userController.createMember
);

router.post(
  "/create-admin",
  // auth(USER_ROLE.admin),
  ValidateRequest(AdminValidations.createAdminValidationSchema),
  userController.createAdmin
);

router.get(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.member),
  userController.getMe
);
// router.post(
//   '/change-status/:id',
//   auth('admin'),
//   ValidateRequest(uservalidation.changeStatususerValidationSchema),
//   userController.changeStatus,
// )

router.get(
  "/all",
  // auth(USER_ROLE.admin, USER_ROLE.member),
  userController.getAllUsers
);

export const UserRoutes = router;
