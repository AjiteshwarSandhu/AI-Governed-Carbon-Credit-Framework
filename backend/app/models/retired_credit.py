from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class RetiredCredit(Base):
    """
    Stores permanently retired carbon credits.

    Retirement prevents the same carbon credit
    from being reused or traded again.
    """

    __tablename__ = "retired_credits"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # Related Carbon Credit
    carbon_credit_id = Column(
        Integer,
        ForeignKey("carbon_credits.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )

    # Retirement Information
    retirement_reason = Column(String(255))

    retired_by = Column(String(255))

    burn_transaction_hash = Column(String(255))

    retired_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # Relationship
    carbon_credit = relationship(
        "CarbonCredit",
        back_populates="retired_credit"
    )