import { Router } from "express";

import { sprintValidation } from "./sprint.validation";
import { SprintControllers } from "./sprint.controller";
import ValidateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/create-sprint",
  auth(USER_ROLE.admin, USER_ROLE.member),
  ValidateRequest(sprintValidation.createSprintValidationSchema),
  SprintControllers.createSprint
);

router.get("/", SprintControllers.getAllSprints);
router.get("/:id", SprintControllers.getSingleSprint);

router.patch(
  "/:id",
  ValidateRequest(sprintValidation.updateSprintValidationSchema),
  SprintControllers.updateSprint
);

router.delete("/:id", SprintControllers.deleteSprint);

export const SprintRoutes = router;
