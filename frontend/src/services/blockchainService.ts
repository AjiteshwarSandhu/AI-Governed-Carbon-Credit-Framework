import api from "./api";

export async function mintCredits(submissionId: number) {
  const response = await api.post(`/mint-credit/${submissionId}`);
  return response.data;
}

export async function retireCredits(submissionId: number) {
  const response = await api.post(`/retire-credit/${submissionId}`);
  return response.data;
}

export async function getCredits() {
  const response = await api.get("/carbon-credits");
  return response.data;
}