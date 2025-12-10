import { Router } from "express";
import { ProjectControllers } from "./project.controller";
import ValidateRequest from "../../middlewares/validateRequest";
import { projectValidation } from "./project.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/create-project",
  auth(USER_ROLE.admin, USER_ROLE.member),
  ValidateRequest(projectValidation.createProjectValidationSchema),
  ProjectControllers.createProject
);

router.get("/", ProjectControllers.getAllProjects);

router.get("/:id", ProjectControllers.getSingleProject);
router.delete("/:id", auth(USER_ROLE.admin), ProjectControllers.deleteProject);

router.patch(
  "/:id",
  ValidateRequest(projectValidation.updateProjectValidationSchema),
  ProjectControllers.updateProject
);

export const ProjectRoutes = router;
