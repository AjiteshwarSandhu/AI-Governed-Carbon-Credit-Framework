from sqlalchemy.orm import Session

from app.models.risk_assessment import RiskAssessment


class RiskAssessmentCRUD:

    @staticmethod
    def create_risk_assessment(db: Session, risk_data: dict):

        assessment = RiskAssessment(**risk_data)

        db.add(assessment)

        db.commit()

        db.refresh(assessment)

        return assessment

    @staticmethod
    def get_risk_assessment(db: Session, submission_id: int):

        return (
            db.query(RiskAssessment)
            .filter(RiskAssessment.submission_id == submission_id)
            .first()
        )

    @staticmethod
    def get_all_risk_assessments(db: Session):

        return (
            db.query(RiskAssessment)
            .order_by(RiskAssessment.created_at.desc())
            .all()
        )

    @staticmethod
    def update_risk_assessment(db: Session, submission_id: int, updated_data: dict):

        assessment = (
            db.query(RiskAssessment)
            .filter(RiskAssessment.submission_id == submission_id)
            .first()
        )

        if assessment is None:
            return None

        for key, value in updated_data.items():
            setattr(assessment, key, value)

        db.commit()

        db.refresh(assessment)

        return assessment

    @staticmethod
    def delete_risk_assessment(db: Session, submission_id: int):

        assessment = (
            db.query(RiskAssessment)
            .filter(RiskAssessment.submission_id == submission_id)
            .first()
        )

        if assessment:

            db.delete(assessment)

            db.commit()

            return True

        return False


risk_crud = RiskAssessmentCRUD()