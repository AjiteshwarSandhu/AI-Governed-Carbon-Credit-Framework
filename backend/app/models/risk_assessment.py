from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class RiskAssessment(Base):
    """
    Stores AI-generated risk assessment for a submission.

    One submission has exactly one risk assessment.
    """

    __tablename__ = "risk_assessments"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # Foreign Key -> Submission
    submission_id = Column(
        Integer,
        ForeignKey("submissions.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )

    # ML Assessment
    ml_score = Column(Float, nullable=False)

    ml_risk_level = Column(String(20), nullable=False)

    # LLM Assessment
    llm_score = Column(Float, nullable=False)

    llm_risk_level = Column(String(20), nullable=False)

    # Final Governance Decision
    overall_score = Column(Float, nullable=False)

    recommendation = Column(String(30), nullable=False)

    decision_reason = Column(String(500))

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # Relationship
    submission = relationship(
        "Submission",
        back_populates="risk_assessment"
    )