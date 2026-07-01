from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class Validator(Base):
    """
    Stores validator approvals before blockchain minting.

    Implements the M-of-N validator consensus.
    """

    __tablename__ = "validators"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # Foreign Key -> Submission
    submission_id = Column(
        Integer,
        ForeignKey("submissions.id", ondelete="CASCADE"),
        nullable=False
    )

    # Validator Information
    validator_name = Column(String(100), nullable=False)

    wallet_address = Column(String(255), nullable=False)

    # Approval
    approved = Column(Boolean, default=False)

    signature = Column(String(500))

    approved_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # Relationship
    submission = relationship(
        "Submission",
        back_populates="validators"
    )