export type TProject = {
  title: string;
  client: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: "planned" | "active" | "completed" | "archived";
  thumbnail?: string | null;
};
