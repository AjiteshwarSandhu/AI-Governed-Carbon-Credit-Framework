import api from "./api";

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const getProject = async (id: number) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

export const evaluateProject = async (data: unknown) => {
  const response = await api.post("/evaluate-project", data);
  return response.data;
};

export interface RecentProject {
  id: number;
  industry: string;
  fuel: string;
  credits: number;
  created_at: string;
}

export const getRecentProjects = async (): Promise<RecentProject[]> => {
  const response = await api.get("/dashboard/recent-projects");
  return response.data;
};

