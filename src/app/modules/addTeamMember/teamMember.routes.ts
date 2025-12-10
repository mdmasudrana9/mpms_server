import { Router } from "express";

import ValidateRequest from "../../middlewares/validateRequest";
import { TeamMemberControllers } from "./teamMember.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/create",
  auth(USER_ROLE.admin),
  TeamMemberControllers.createTeamMember
);

router.get("/", TeamMemberControllers.getAllTeamMembers);
router.get("/:id", TeamMemberControllers.getSingleTeamMember);

router.patch(
  "/:id",

  TeamMemberControllers.updateTeamMember
);

router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.member),
  TeamMemberControllers.deleteTeamMember
);

export const TeamMemberRoutes = router;
