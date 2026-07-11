from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.department import Department

router = APIRouter()

@router.get("/{hospital_id}")
def get_departments(hospital_id: str, db: Session = Depends(get_db)):
    return db.query(Department).filter(
        Department.hospital_id == hospital_id
    ).all()
