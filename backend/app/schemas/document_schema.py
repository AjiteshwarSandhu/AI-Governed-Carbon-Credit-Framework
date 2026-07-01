from pydantic import BaseModel, Field


class DocumentRequest(BaseModel):
    """
    Stage 3
    LLM Document Analysis Request
    """

    project_description: str = Field(
        ...,
        min_length=20,
        example="This project installs a 100 MW solar power plant to reduce coal-based electricity generation."
    )

    monitoring_report: str = Field(
        default="",
        example="Annual monitoring confirms electricity generation and CO2 reductions using calibrated meters."
    )

    additionality_statement: str = Field(
        default="",
        example="The project would not have been financially viable without carbon credit revenue."
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "project_description": "This project installs a 100 MW solar power plant to replace coal-based electricity generation.",
                "monitoring_report": "Energy production is monitored using calibrated smart meters and independently verified annually.",
                "additionality_statement": "Without carbon credit incentives, the project would not achieve the required return on investment."
            }
        }
    }