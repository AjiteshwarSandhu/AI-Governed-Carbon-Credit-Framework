from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.submission import Submission
from app.models.risk_assessment import RiskAssessment
from app.models.governance_review import GovernanceReview

router = APIRouter(tags=["Governance Review"])


@router.get("/submissions")
def get_all_submissions(db: Session = Depends(get_db)):

    submissions = db.query(Submission).all()

    return submissions


@router.get("/submission/{submission_id}")
def get_submission(submission_id: int,
                   db: Session = Depends(get_db)):

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

    return submission


@router.get("/risk-assessment/{submission_id}")
def get_risk(submission_id: int,
             db: Session = Depends(get_db)):

    assessment = (
        db.query(RiskAssessment)
        .filter(RiskAssessment.submission_id == submission_id)
        .first()
    )

    if assessment is None:
        raise HTTPException(
            status_code=404,
            detail="Risk assessment not found."
        )

    return assessment