import api from "./api";

export async function submitGovernanceReview(
  submissionId: number,
  decision: string,
  reviewer: string,
  comments: string
) {
  const response = await api.post(
    `/review/${submissionId}`,
    null,
    {
      params: {
        decision,
        reviewer_name: reviewer,
        comments,
      },
    }
  );

  return response.data;
}