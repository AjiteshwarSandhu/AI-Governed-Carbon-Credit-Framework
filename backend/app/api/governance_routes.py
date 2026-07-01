from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.security.auth import verify_api_key

from app.database.database import get_db
from app.models.submission import Submission
from app.models.governance_review import GovernanceReview

from app.models.risk_assessment import RiskAssessment 

router = APIRouter(tags=["Governance Decision"])

@router.post("/review/{submission_id}")
def review_submission(
    submission_id: int,
    decision: str,
    reviewer_name: str,
    reviewer_email: str = "",
    comments: str = "",
    db: Session = Depends(get_db),
   _: str = Depends(verify_api_key)
):

    submission = (
        db.query(Submission)
        .filter(Submission.id == submission_id)
        .first()
    )

    if submission is None:
        raise HTTPException(
            status_code=404,
            detail="Submission not found."
        )

    # ---------------- Prevent Duplicate Vote ----------------

    existing_vote = (
        db.query(GovernanceReview)
        .filter(
            GovernanceReview.submission_id == submission_id,
            GovernanceReview.reviewer_name == reviewer_name
        )
        .first()
    )

    if existing_vote:
        raise HTTPException(
            status_code=400,
            detail=f"{reviewer_name} has already voted."
        )

    # ---------------- Save Vote ----------------

    review = GovernanceReview(

        submission_id=submission.id,

        reviewer_name=reviewer_name,

        reviewer_email=reviewer_email,

        decision=decision.upper(),

        comments=comments

    )

    db.add(review)

    db.flush()

    # ---------------- Count Votes ----------------

    approve_count = (
        db.query(GovernanceReview)
        .filter(
            GovernanceReview.submission_id == submission_id,
            GovernanceReview.decision == "APPROVE"
        )
        .count()
    )

    reject_count = (
        db.query(GovernanceReview)
        .filter(
            GovernanceReview.submission_id == submission_id,
            GovernanceReview.decision == "REJECT"
        )
        .count()
    )

    # ---------------- Update Risk Assessment ----------------

    risk = (
        db.query(RiskAssessment)
        .filter(RiskAssessment.submission_id == submission_id)
        .first()
    )

    current_status = "REVIEW"

    if risk:

        if approve_count >= 3:

            risk.recommendation = "APPROVE"
            current_status = "APPROVE"

        elif reject_count >= 3:

            risk.recommendation = "REJECT"
            current_status = "REJECT"

        else:

            risk.recommendation = "REVIEW"
            current_status = "REVIEW"

        risk.decision_reason = comments

    db.commit()

    db.refresh(review)

    return {

        "success": True,

        "message": "Governance vote recorded successfully.",

        "review_id": review.id,

        "decision": current_status,

        "approve_count": approve_count,

        "reject_count": reject_count,

        "required_votes": 3,

        "remaining_approvals": max(0, 3 - approve_count),

        "remaining_rejections": max(0, 3 - reject_count)

    }