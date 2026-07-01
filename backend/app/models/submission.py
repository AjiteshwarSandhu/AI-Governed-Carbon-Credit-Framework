from sqlalchemy import Column, Integer, String, Float, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class Submission(Base):
    """
    Original project submission.

    Stores only the information submitted by the project owner.
    AI evaluation, governance review, and blockchain data are
    stored in separate tables.
    """

    __tablename__ = "submissions"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # ---------- Structured Project Data ----------

    industry_type = Column(String(100), nullable=False)

    energy_demand_mwh = Column(Float, nullable=False)

    fuel_type = Column(String(100), nullable=False)

    emission_produced_tco2 = Column(Float, nullable=False)

    emission_allowance_tco2 = Column(Float, nullable=False)

    carbon_price_usd_per_t = Column(Float, nullable=False)

    transaction_type = Column(String(50), nullable=False)

    credits_traded_tco2 = Column(Float, nullable=False)

    compliance_cost_usd = Column(Float, nullable=False)

    optimization_scenario = Column(String(100), nullable=False)

    carbon_cost_savings_usd = Column(Float, nullable=False)

    # ---------- Documents ----------

    project_description = Column(Text, nullable=False)

    monitoring_report = Column(Text)

    additionality_statement = Column(Text)

    # ---------- Metadata ----------

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # ---------- Relationships ----------

    risk_assessment = relationship(
        "RiskAssessment",
        back_populates="submission",
        uselist=False,
        cascade="all, delete-orphan"
    )

    governance_reviews = relationship(
        "GovernanceReview",
        back_populates="submission",
        cascade="all, delete-orphan"
    )

    carbon_credits = relationship(
        "CarbonCredit",
        back_populates="submission",
        cascade="all, delete-orphan"
    )

    validators = relationship(
        "Validator",
        back_populates="submission",
        cascade="all, delete-orphan"
    )