"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = require("express");
const project_controller_1 = require("./project.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const project_validation_1 = require("./project.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post("/create-project", (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.member), (0, validateRequest_1.default)(project_validation_1.projectValidation.createProjectValidationSchema), project_controller_1.ProjectControllers.createProject);
router.get("/", project_controller_1.ProjectControllers.getAllProjects);
router.get("/:id", project_controller_1.ProjectControllers.getSingleProject);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), project_controller_1.ProjectControllers.deleteProject);
router.patch("/:id", (0, validateRequest_1.default)(project_validation_1.projectValidation.updateProjectValidationSchema), project_controller_1.ProjectControllers.updateProject);
exports.ProjectRoutes = router;
