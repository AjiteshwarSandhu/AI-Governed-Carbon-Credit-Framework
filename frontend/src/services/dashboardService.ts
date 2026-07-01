import api from "./api";

export interface DashboardData {
  total_projects: number;
  approved: number;
  review: number;
  rejected: number;
  minted: number;
  retired: number;
}

export const getDashboard = async (): Promise<DashboardData> => {
  const response = await api.get("/dashboard");
  return response.data;
};