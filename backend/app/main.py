from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import app.models

from app.api.routes import router
from app.api.review_routes import router as review_router
from app.api.governance_routes import router as governance_router

app = FastAPI(
    title="AI-Governed Blockchain-Based Carbon Credit Validation Framework",
    description="Capstone Project Backend API",
    version="1.0.0"
)

# =========================
# CORS CONFIGURATION
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Allow local frontend as well
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# REGISTER ROUTES
# =========================
app.include_router(router)
app.include_router(review_router)
app.include_router(governance_router)


# =========================
# ROOT
# =========================
@app.get("/")
def root():
    return {
        "message": "AI-Governed Carbon Credit Validation Framework",
        "status": "Running"
    }


# =========================
# HEALTH CHECK
# =========================
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }