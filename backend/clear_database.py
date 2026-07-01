from database.database import SessionLocal

from models.governance_review import GovernanceReview
from models.retired_credit import RetiredCredit
from models.carbon_credit import CarbonCredit
from models.risk_assessment import RiskAssessment
from models.validator import Validator
from models.submission import Submission

db = SessionLocal()

try:

    print("Deleting Governance Reviews...")
    db.query(GovernanceReview).delete()

    print("Deleting Retired Credits...")
    db.query(RetiredCredit).delete()

    print("Deleting Carbon Credits...")
    db.query(CarbonCredit).delete()

    print("Deleting Risk Assessments...")
    db.query(RiskAssessment).delete()

    print("Deleting Validators...")
    db.query(Validator).delete()

    print("Deleting Submissions...")
    db.query(Submission).delete()

    db.commit()

    print("\n✅ DATABASE CLEARED SUCCESSFULLY")

except Exception as e:

    db.rollback()

    print("\n❌ ERROR")

    print(e)

finally:

    db.close()