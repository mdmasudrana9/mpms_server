import { Router } from "express";
import { MemberControllers } from "./member.controller";

import { updateMemberValidationSchema } from "./member.validation";
import ValidateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.member),
  MemberControllers.getAllMembers
);

router.get("/:id", MemberControllers.getSingleMember);

router.patch(
  "/:id",

  ValidateRequest(updateMemberValidationSchema),
  MemberControllers.updateMember
);

router.delete("/:MemberId", MemberControllers.deleteMember);

export const MemberRoutes = router;
