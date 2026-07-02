import api from "./api";

export interface EvaluationResponse {
  success: boolean;
  submission_id: number;

  numerical_validation: {
    numerical_risk_score: number;
    risk_level: string;
  };

  semantic_validation: {
    semantic_risk_score: number;
    risk_level: string;
    issues: string[];
    summary: string;
  };

  governance_decision: {
    overall_risk_score: number;
    recommendation: string;
    reason: string;
  };

  blockchain: {
    submitted: boolean | null;
    vote: boolean | null;
    minted: boolean | null;
  };
}

export async function evaluateProject(
  data: any
): Promise<EvaluationResponse> {

  console.log("Sending Request:", data);

  const response = await api.post(
    "/evaluate-project",
    data
  );

  console.log("Backend Response:", response.data);

  return response.data;
}