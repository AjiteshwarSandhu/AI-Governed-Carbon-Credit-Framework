from sqlalchemy.orm import Session

from app.models.submission import Submission


class SubmissionCRUD:

    @staticmethod
    def create_submission(db: Session, submission_data: dict):

        submission = Submission(**submission_data)

        db.add(submission)

        db.commit()

        db.refresh(submission)

        return submission


    @staticmethod
    def get_submission(db: Session, submission_id: int):

        return (
            db.query(Submission)
            .filter(Submission.id == submission_id)
            .first()
        )


    @staticmethod
    def get_all_submissions(db: Session):

        return (
            db.query(Submission)
            .order_by(Submission.created_at.desc())
            .all()
        )


    @staticmethod
    def delete_submission(db: Session, submission_id: int):

        submission = (
            db.query(Submission)
            .filter(Submission.id == submission_id)
            .first()
        )

        if submission:

            db.delete(submission)

            db.commit()

            return True

        return False


submission_crud = SubmissionCRUD()