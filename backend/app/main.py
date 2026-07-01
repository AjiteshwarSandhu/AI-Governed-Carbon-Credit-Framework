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

# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Later replace "*" with your React URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(router)
app.include_router(review_router)
app.include_router(governance_router)

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "Carbon Credit Validation Backend"
    }