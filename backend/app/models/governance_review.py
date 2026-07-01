from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.database import Base


class GovernanceReview(Base):
    """
    Stores human governance decisions.

    AI only recommends.
    Human reviewer makes the final decision.
    """

    __tablename__ = "governance_reviews"

    # Primary Key
    id = Column(Integer, primary_key=True, index=True)

    # Foreign Key -> Submission
    submission_id = Column(
        Integer,
        ForeignKey("submissions.id", ondelete="CASCADE"),
        nullable=False
    )

    # Reviewer Information
    reviewer_name = Column(String(100), nullable=False)

    reviewer_email = Column(String(150))

    # Final Decision
    decision = Column(
        String(30),
        nullable=False
    )
    # APPROVED
    # REJECTED
    # REVIEW_REQUIRED

    comments = Column(Text)

    reviewed_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    # Relationship
    submission = relationship(
        "Submission",
        back_populates="governance_reviews"
    )
    