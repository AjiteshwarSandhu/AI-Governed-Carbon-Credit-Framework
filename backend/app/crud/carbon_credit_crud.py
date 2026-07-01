from sqlalchemy.orm import Session

from app.models.carbon_credit import CarbonCredit


class CarbonCreditCRUD:

    def create_credit(
        self,
        db: Session,
        data: dict
    ):

        credit = CarbonCredit(**data)

        db.add(credit)

        db.commit()

        db.refresh(credit)

        return credit


    def get_by_submission(
        self,
        db: Session,
        submission_id: int
    ):

        return (
            db.query(CarbonCredit)
            .filter(
                CarbonCredit.submission_id == submission_id
            )
            .first()
        )


    def mark_retired(
        self,
        db: Session,
        submission_id: int
    ):

        credit = self.get_by_submission(
            db,
            submission_id
        )

        if not credit:
            return None

        credit.retired = True

        db.commit()

        db.refresh(credit)

        return credit


carbon_credit_crud = CarbonCreditCRUD()