from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.models import Hospital, Department, Review
from app.api.routes import hospitals, departments, reviews, ai

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Arogya.ai API",
    description="AI-powered government hospital navigator for India",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(hospitals.router, prefix="/api/hospitals", tags=["Hospitals"])
app.include_router(departments.router, prefix="/api/departments", tags=["Departments"])
app.include_router(reviews.router, prefix="/api/reviews", tags=["Reviews"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI"])

@app.get("/")
def root():
    return {"message": "Welcome to Arogya.ai 🏥", "status": "running"}
