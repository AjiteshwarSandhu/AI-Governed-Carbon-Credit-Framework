import json
import os

import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")


class LLMRiskService:
    """
    Stage 3
    Semantic Document Analysis
    """

    def analyze(
        self,
        project_description: str,
        monitoring_report: str = "",
        additionality_statement: str = ""
    ):

        prompt = f"""
You are an expert carbon-credit governance auditor.

Analyze the submitted project using ONLY the provided information.

Evaluate:

1. Additionality
2. Verifiability
3. Logical Consistency
4. Greenwashing Indicators
5. Missing Information

Return ONLY valid JSON.

{{
    "semantic_risk_score": float between 0.0 and 1.0,
    "risk_level":"LOW"|"MEDIUM"|"HIGH",
    "issues":[
        "issue1",
        "issue2"
    ],
    "summary":"short explanation"
}}

Project Description:
{project_description}

Monitoring Report:
{monitoring_report}

Additionality Statement:
{additionality_statement}
"""

        response = model.generate_content(prompt)

        raw = response.text.strip()

        # Remove markdown fences if Gemini returns them
        if raw.startswith("```"):

            raw = raw.replace("```json", "")
            raw = raw.replace("```", "")
            raw = raw.strip()

        result = json.loads(raw)

        return result


llm_service = LLMRiskService()