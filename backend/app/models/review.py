from sqlalchemy import Column, String, Boolean, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime
import uuid

def gen_uuid():
    return str(uuid.uuid4())

class Review(Base):
    __tablename__ = "reviews"

    id = Column(String, primary_key=True, default=gen_uuid)
    hospital_id = Column(String, ForeignKey("hospitals.id"))
    wait_time_rating = Column(Integer)
    doctor_available = Column(Boolean)
    cleanliness_rating = Column(Integer)
    medicine_available = Column(Boolean)
    comment = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    hospital = relationship("Hospital", back_populates="reviews")
