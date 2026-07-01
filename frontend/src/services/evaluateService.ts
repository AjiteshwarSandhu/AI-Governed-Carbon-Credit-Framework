const API = "http://127.0.0.1:8000";

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

  const response = await fetch(`${API}/evaluate-project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  console.log("Backend Response:", result);

  if (!response.ok) {
    throw new Error(result.detail || "Evaluation Failed");
  }

  return result;
}