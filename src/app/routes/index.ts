import { Router } from "express";
import { ProjectRoutes } from "../modules/project/project.routes";
import { SprintRoutes } from "../modules/sprint/sprint.routes";
import { TaskRoutes } from "../modules/task/task.routes";
import { UserRoutes } from "../modules/user/user.route";
import { MemberRoutes } from "../modules/member/member.route";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { TeamMemberRoutes } from "../modules/addTeamMember/teamMember.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/project",
    route: ProjectRoutes,
  },
  {
    path: "/sprint",
    route: SprintRoutes,
  },
  {
    path: "/task",
    route: TaskRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/member",
    route: MemberRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/team",
    route: TeamMemberRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
