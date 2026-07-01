class GovernanceClassifier:
    """
    Stage 5
    Governance Decision Engine

    Combines:
    - Numerical ML Risk
    - Semantic LLM Risk

    Produces the final governance recommendation.
    """

    def classify(self, ml_score: float, llm_score: float):

        # Give higher importance to semantic (LLM) analysis
        overall_score = round(
            (0.35 * ml_score) + (0.65 * llm_score),
            4
        )

        if overall_score >= 0.85:

            recommendation = "REJECT"

            reason = (
                "Overall governance risk is very high. "
                "Project should be rejected."
            )

        elif overall_score >= 0.45:

            recommendation = "REVIEW"

            reason = (
                "Moderate governance risk detected. "
                "Human validator review is recommended."
            )

        else:

            recommendation = "APPROVE"

            reason = (
                "Low governance risk. "
                "Project is eligible for blockchain governance."
            )

        return {

            "overall_risk_score": overall_score,

            "recommendation": recommendation,

            "reason": reason

        }


# Singleton
classifier_service = GovernanceClassifier()