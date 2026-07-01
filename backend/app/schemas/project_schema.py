from pydantic import BaseModel, Field


class ProjectRequest(BaseModel):
    """
    Carbon Credit Project Input Schema

    Raw project attributes submitted by the user.
    Derived features are automatically calculated
    inside ml_service.py.
    """

    Industry_Type: str = Field(
        ...,
        example="Steel"
    )

    Energy_Demand_MWh: float = Field(
        ...,
        gt=0,
        example=1200.5
    )

    Fuel_Type: str = Field(
        ...,
        example="Coal"
    )

    Emission_Produced_tCO2: float = Field(
        ...,
        ge=0,
        example=950.25
    )

    Emission_Allowance_tCO2: float = Field(
        ...,
        ge=0,
        example=700.0
    )

    Carbon_Price_USD_per_t: float = Field(
        ...,
        ge=0,
        example=32.5
    )

    Transaction_Type: str = Field(
        ...,
        example="Sell"
    )

    Credits_Traded_tCO2: float = Field(
        ...,
        ge=0,
        example=300.0
    )

    Compliance_Cost_USD: float = Field(
        ...,
        ge=0,
        example=15000
    )

    Optimization_Scenario: str = Field(
        ...,
        example="Baseline"
    )

    Carbon_Cost_Savings_USD: float = Field(
        ...,
        ge=0,
        example=4500
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "Industry_Type": "Steel",
                "Energy_Demand_MWh": 1200.5,
                "Fuel_Type": "Coal",
                "Emission_Produced_tCO2": 950.25,
                "Emission_Allowance_tCO2": 700.0,
                "Carbon_Price_USD_per_t": 32.5,
                "Transaction_Type": "Sell",
                "Credits_Traded_tCO2": 300.0,
                "Compliance_Cost_USD": 15000,
                "Optimization_Scenario": "Baseline",
                "Carbon_Cost_Savings_USD": 4500
            }
        }
    }