"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SprintRoutes = void 0;
const express_1 = require("express");
const sprint_validation_1 = require("./sprint.validation");
const sprint_controller_1 = require("./sprint.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post("/create-sprint", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(sprint_validation_1.sprintValidation.createSprintValidationSchema), sprint_controller_1.SprintControllers.createSprint);
router.get("/", sprint_controller_1.SprintControllers.getAllSprints);
router.get("/:id", sprint_controller_1.SprintControllers.getSingleSprint);
router.patch("/:id", (0, validateRequest_1.default)(sprint_validation_1.sprintValidation.updateSprintValidationSchema), sprint_controller_1.SprintControllers.updateSprint);
router.delete("/:id", sprint_controller_1.SprintControllers.deleteSprint);
exports.SprintRoutes = router;
