from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.hospital import Hospital

router = APIRouter()

@router.get("/")
def get_hospitals(
    district: str = Query(None),
    state: str = Query(None),
    type: str = Query(None),
    ayushman: bool = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Hospital).filter(Hospital.is_active == True)
    if district:
        query = query.filter(Hospital.district.ilike(f"%{district}%"))
    if state:
        query = query.filter(Hospital.state.ilike(f"%{state}%"))
    if type:
        query = query.filter(Hospital.type.ilike(f"%{type}%"))
    if ayushman is not None:
        query = query.filter(Hospital.is_ayushman_empanelled == ayushman)
    return query.all()

@router.get("/{hospital_id}")
def get_hospital(hospital_id: str, db: Session = Depends(get_db)):
    hospital = db.query(Hospital).filter(Hospital.id == hospital_id).first()
    if not hospital:
        return {"error": "Hospital not found"}
    return hospital

@router.get("/search/query")
def search_hospitals(q: str = Query(...), db: Session = Depends(get_db)):
    results = db.query(Hospital).filter(
        Hospital.name.ilike(f"%{q}%") |
        Hospital.district.ilike(f"%{q}%") |
        Hospital.address.ilike(f"%{q}%")
    ).all()
    return results
