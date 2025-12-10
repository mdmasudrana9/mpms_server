import { Router } from "express";
import { AdminControllers } from "./admin.controller";

import { updateAdminValidationSchema } from "./admin.validation";
import ValidateRequest from "../../middlewares/validateRequest";

const router = Router();

router.get("/", AdminControllers.getAllAdmins);

router.get("/:id", AdminControllers.getSingleAdmin);

router.patch(
  "/:id",

  ValidateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin
);

router.delete("/:adminId", AdminControllers.deleteAdmin);

export const AdminRoutes = router;
