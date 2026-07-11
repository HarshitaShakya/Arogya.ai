from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.core.database import get_db
from app.models.review import Review

router = APIRouter()

class ReviewCreate(BaseModel):
    wait_time_rating: Optional[int] = None
    doctor_available: Optional[bool] = None
    cleanliness_rating: Optional[int] = None
    medicine_available: Optional[bool] = None
    comment: Optional[str] = None

@router.get("/{hospital_id}")
def get_reviews(hospital_id: str, db: Session = Depends(get_db)):
    return db.query(Review).filter(Review.hospital_id == hospital_id).all()

@router.post("/{hospital_id}")
def add_review(hospital_id: str, review: ReviewCreate, db: Session = Depends(get_db)):
    new_review = Review(hospital_id=hospital_id, **review.dict())
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review
