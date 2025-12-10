"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_routes_1 = require("../modules/project/project.routes");
const sprint_routes_1 = require("../modules/sprint/sprint.routes");
const task_routes_1 = require("../modules/task/task.routes");
const user_route_1 = require("../modules/user/user.route");
const member_route_1 = require("../modules/member/member.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const teamMember_routes_1 = require("../modules/addTeamMember/teamMember.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/project",
        route: project_routes_1.ProjectRoutes,
    },
    {
        path: "/sprint",
        route: sprint_routes_1.SprintRoutes,
    },
    {
        path: "/task",
        route: task_routes_1.TaskRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/member",
        route: member_route_1.MemberRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/team",
        route: teamMember_routes_1.TeamMemberRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
