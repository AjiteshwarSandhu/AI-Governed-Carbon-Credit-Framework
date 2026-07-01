from pydantic import BaseModel, Field


class EvaluationRequest(BaseModel):

    # -------- Numerical Validation --------

    Industry_Type: str

    Energy_Demand_MWh: float

    Fuel_Type: str

    Emission_Produced_tCO2: float

    Emission_Allowance_tCO2: float

    Carbon_Price_USD_per_t: float

    Transaction_Type: str

    Credits_Traded_tCO2: float

    Compliance_Cost_USD: float

    Optimization_Scenario: str

    Carbon_Cost_Savings_USD: float

    # -------- Semantic Validation --------

    project_description: str

    monitoring_report: str = ""

    additionality_statement: str = ""