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

origins = [
    "http://localhost:5173",
    "https://ai-governed-carbon-credit-framework-y8o6-4frofzd4v-capstone-89.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(review_router)
app.include_router(governance_router)


@app.get("/")
def root():
    return {
        "message": "AI-Governed Blockchain Carbon Credit Validation Backend",
        "status": "running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "Carbon Credit Validation Backend"
    }