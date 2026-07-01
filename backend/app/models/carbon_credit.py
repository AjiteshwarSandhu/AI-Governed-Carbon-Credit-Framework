from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class CarbonCredit(Base):
    """
    Stores blockchain-issued carbon credits.

    Created only after:
    1. AI Validation
    2. Human Governance Approval
    3. Validator Consensus
    """

    __tablename__ = "carbon_credits"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # Related Submission
    submission_id = Column(
        Integer,
        ForeignKey("submissions.id", ondelete="CASCADE"),
        nullable=False
    )

    # ERC-1155 Information
    token_id = Column(String(100), unique=True)

    # Unique Credit Identity (UCI)
    uci = Column(String(255), unique=True)

    # Blockchain Details
    blockchain_network = Column(
        String(100),
        default="Polygon Amoy"
    )

    transaction_hash = Column(String(255))

    contract_address = Column(String(255))

    owner_wallet = Column(String(255))

    minted = Column(Boolean, default=False)

    retired = Column(Boolean, default=False)

    minted_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # Relationship
    submission = relationship(
        "Submission",
        back_populates="carbon_credits"
    )

    retired_credit = relationship(
        "RetiredCredit",
        back_populates="carbon_credit",
        uselist=False,
        cascade="all, delete-orphan"
    )