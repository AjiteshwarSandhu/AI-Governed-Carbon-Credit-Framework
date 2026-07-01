from fastapi import APIRouter, HTTPException
from app.security.auth import verify_api_key

from app.schemas.project_schema import ProjectRequest
from app.schemas.document_schema import DocumentRequest

from app.services.ml_service import ml_service
from app.services.llm_service import llm_service

from app.schemas.evaluation_schema import EvaluationRequest
from app.services.classifier_service import classifier_service

from fastapi import Depends
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.crud.submission_crud import submission_crud
from app.crud.risk_crud import risk_crud

from app.blockchain.blockchain_service import BlockchainService

from app.crud.carbon_credit_crud import carbon_credit_crud

from app.models.submission import Submission
from app.models.risk_assessment import RiskAssessment
from app.models.carbon_credit import CarbonCredit

router = APIRouter()


@router.get("/")
def home():
    return {
        "message": "AI-Governed Carbon Credit Validation Framework",
        "status": "Running"
    }


@router.get("/health")
def health():
    return {
        "status": "healthy"
    }


@router.post("/predict-risk")
def predict_risk(project: ProjectRequest):

    try:

        result = ml_service.predict(project.model_dump())

        return {
            "success": True,
            "message": "Numerical risk assessment completed.",
            "data": result
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post("/analyze-document")
def analyze_document(document: DocumentRequest):

    try:

        result = llm_service.analyze(
            project_description=document.project_description,
            monitoring_report=document.monitoring_report,
            additionality_statement=document.additionality_statement
        )

        return {
            "success": True,
            "message": "Semantic document analysis completed.",
            "data": result
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.post("/evaluate-project")
def evaluate_project(
    request: EvaluationRequest,
    db: Session = Depends(get_db)
):

    try:

        data = request.model_dump()

        submission_data = {
            "industry_type": data["Industry_Type"],
            "energy_demand_mwh": data["Energy_Demand_MWh"],
            "fuel_type": data["Fuel_Type"],
            "emission_produced_tco2": data["Emission_Produced_tCO2"],
            "emission_allowance_tco2": data["Emission_Allowance_tCO2"],
            "carbon_price_usd_per_t": data["Carbon_Price_USD_per_t"],
            "transaction_type": data["Transaction_Type"],
            "credits_traded_tco2": data["Credits_Traded_tCO2"],
            "compliance_cost_usd": data["Compliance_Cost_USD"],
            "optimization_scenario": data["Optimization_Scenario"],
            "carbon_cost_savings_usd": data["Carbon_Cost_Savings_USD"],
            "project_description": data["project_description"],
            "monitoring_report": data["monitoring_report"],
            "additionality_statement": data["additionality_statement"]
        }

        submission = submission_crud.create_submission(
            db,
            submission_data
        )

        # ---------------- ML ----------------

        ml_result = ml_service.predict(data)

        # ---------------- LLM ----------------

        llm_result = llm_service.analyze(

            project_description=data["project_description"],

            monitoring_report=data["monitoring_report"],

            additionality_statement=data["additionality_statement"]

        )

        # ---------------- Classifier ----------------

        final_result = classifier_service.classify(

            ml_score=ml_result["numerical_risk_score"],

            llm_score=llm_result["semantic_risk_score"]

        )

        risk_data = {

            "submission_id": submission.id,

            "ml_score": ml_result["numerical_risk_score"],
            "ml_risk_level": ml_result["risk_level"],

            "llm_score": llm_result["semantic_risk_score"],
            "llm_risk_level": llm_result["risk_level"],

            "overall_score": final_result["overall_risk_score"],

            "recommendation": final_result["recommendation"],

            "decision_reason": final_result["reason"]

        }

        risk_crud.create_risk_assessment(
            db,
            risk_data
        )

        # ---------------- Blockchain ----------------

        blockchain_result = None
        vote_result = None
        mint_result = None

        return {

            "success": True,

            "submission_id": submission.id,

            "numerical_validation": ml_result,

            "semantic_validation": llm_result,

            "governance_decision": final_result,

            "blockchain": {

                "submitted": blockchain_result,

                "vote": vote_result,

                "minted": mint_result

            }

        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.post("/retire-credit/{submission_id}")
def retire_credit(
    submission_id: int,
    db: Session = Depends(get_db),
    _: str = Depends(verify_api_key)
):

    try:

        blockchain = BlockchainService()

        result = blockchain.retire_credits(
            submission_id
        )

        if not result["success"]:

            raise HTTPException(
                status_code=400,
                detail=result["error"]
            )

        carbon_credit_crud.mark_retired(
            db,
            submission_id
        )

        return {

            "success": True,

            "message": "Carbon credit retired successfully.",

            "blockchain": result

        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.post("/mint-credit/{submission_id}")
def mint_credit(
    submission_id: int,
    db: Session = Depends(get_db),
  _: str = Depends(verify_api_key)
):

    try:

        submission = db.query(Submission).filter(
            Submission.id == submission_id
        ).first()

        if submission is None:

            raise HTTPException(
                status_code=404,
                detail="Submission not found."
            )

        risk = db.query(RiskAssessment).filter(
            RiskAssessment.submission_id == submission_id
        ).first()

        if risk is None:

            raise HTTPException(
                status_code=404,
                detail="Risk assessment not found."
            )

        if risk.recommendation != "APPROVE":

            raise HTTPException(
                status_code=400,
                detail="Only approved projects can be minted."
            )

        blockchain = BlockchainService()
        print("=" * 60)
        print("Mint Request")
        print("Submission ID:", submission.id)
        print("Contract:", blockchain.contract_address)
        print("Wallet:", blockchain.account.address)
        print("=" * 60)

        submit_result = blockchain.submit_project(

            project_id=submission.id,

            project_name=f"Project {submission.id}",

            organization=submission.industry_type,

            owner=blockchain.account.address,

            credits=int(submission.credits_traded_tco2),

            ml_score=int(risk.ml_score * 100),

            llm_score=int(risk.llm_score * 100),

            overall_score=int(risk.overall_score * 100)

        )
        print("Submit Result:", submit_result)

        if not submit_result["success"]:
            raise HTTPException(
                status_code=400,
                detail=submit_result["error"]
            )

        vote_result = blockchain.vote_project(

            submission.id,

            True

        )
        print("Vote Result:", vote_result)

        if not vote_result["success"]:
            raise HTTPException(
                status_code=400,
                detail=vote_result["error"]
            )

        result = blockchain.mint_credits(

            submission.id

        )

        print("Mint Result:", result)

        if not result["success"]:

            raise HTTPException(
                status_code=400,
                detail=result["error"]
            )

        credit = db.query(CarbonCredit).filter(
            CarbonCredit.submission_id == submission_id
        ).first()

        if credit is None:

            carbon_credit_crud.create_credit(

                db,

                {

                    "submission_id": submission_id,

                    "token_id": str(result["token_id"]),

                    "uci": result["uci"],

                    "transaction_hash": result["transaction_hash"],

                    "contract_address": blockchain.contract_address,

                    "owner_wallet": blockchain.account.address,

                    "minted": True,

                    "retired": False

                }

            )

        else:

            credit.token_id = str(result["token_id"])
            credit.uci = result["uci"]
            credit.transaction_hash = result["transaction_hash"]
            credit.minted = True

            db.commit()

        return {

            "success": True,

            "message": "Carbon credits minted successfully.",

            "blockchain": result

        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)):

    return {

        "total_projects":
            db.query(Submission).count(),

        "approved":
            db.query(RiskAssessment)
            .filter(RiskAssessment.recommendation == "APPROVE")
            .count(),

        "review":
            db.query(RiskAssessment)
            .filter(RiskAssessment.recommendation == "REVIEW")
            .count(),

        "rejected":
            db.query(RiskAssessment)
            .filter(RiskAssessment.recommendation == "REJECT")
            .count(),

        "minted":
            db.query(CarbonCredit)
            .filter(CarbonCredit.minted == True)
            .count(),

        "retired":
            db.query(CarbonCredit)
            .filter(CarbonCredit.retired == True)
            .count()

    }

@router.get("/projects")
def get_projects(db: Session = Depends(get_db)):

    submissions = submission_crud.get_all_submissions(db)

    return submissions

@router.get("/projects/{submission_id}")
def get_project(
    submission_id: int,
    db: Session = Depends(get_db)
):

    submission = db.query(Submission).filter(
        Submission.id == submission_id
    ).first()

    if submission is None:

        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    risk = db.query(RiskAssessment).filter(
        RiskAssessment.submission_id == submission_id
    ).first()

    credit = db.query(CarbonCredit).filter(
        CarbonCredit.submission_id == submission_id
    ).first()

    return {

        "project": {

            "id": submission.id,
            "industry_type": submission.industry_type,
            "fuel_type": submission.fuel_type,
            "energy_demand_mwh": submission.energy_demand_mwh,
            "credits_traded_tco2": submission.credits_traded_tco2,
            "project_description": submission.project_description,
            "monitoring_report": submission.monitoring_report,
            "additionality_statement": submission.additionality_statement

        },

        "risk": None if risk is None else {

            "ml_score": risk.ml_score,
            "llm_score": risk.llm_score,
            "overall_score": risk.overall_score,
            "recommendation": risk.recommendation,
            "reason": risk.decision_reason

        },

        "blockchain": None if credit is None else {

            "minted": credit.minted,
            "retired": credit.retired,
            "token_id": credit.token_id,
            "uci": credit.uci,
            "transaction_hash": credit.transaction_hash,
            "owner_wallet": credit.owner_wallet,
            "contract_address": credit.contract_address

        }

    }

@router.get("/carbon-credits")
def get_carbon_credits(
    db: Session = Depends(get_db)
):

    return (

        db.query(CarbonCredit)

        .order_by(CarbonCredit.id.desc())

        .all()

    )

@router.get("/carbon-credits/{submission_id}")
def get_credit(
    submission_id: int,
    db: Session = Depends(get_db)
):

    credit = carbon_credit_crud.get_by_submission(
        db,
        submission_id
    )

    if not credit:

        raise HTTPException(
            status_code=404,
            detail="Carbon credit not found"
        )

    return credit

@router.get("/dashboard/recent-projects")
def get_recent_projects(db: Session = Depends(get_db)):
    
    projects = (
        db.query(Submission)
        .order_by(Submission.created_at.desc())
        .limit(5)
        .all()
    )

    return [
        {
            "id": p.id,
            "industry": p.industry_type,
            "fuel": p.fuel_type,
            "credits": p.credits_traded_tco2,
            "created_at": p.created_at.strftime("%d %b %Y"),
        }
        for p in projects
    ]

