from app.database.database import Base, engine

# Import ALL models
from app.models.submission import Submission
from app.models.risk_assessment import RiskAssessment
from app.models.governance_review import GovernanceReview
from app.models.validator import Validator
from app.models.carbon_credit import CarbonCredit
from app.models.retired_credit import RetiredCredit


def create_database():

    print("=" * 60)
    print("Creating Carbon Validation Database Tables...")
    print("=" * 60)

    Base.metadata.create_all(bind=engine)

    print("\nAll tables created successfully!")
    print("=" * 60)


if __name__ == "__main__":
    create_database()