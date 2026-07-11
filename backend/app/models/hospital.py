from sqlalchemy import Column, String, Boolean, Integer, Float, Text
from sqlalchemy.orm import relationship
from app.core.database import Base
import uuid

def gen_uuid():
    return str(uuid.uuid4())

class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(String, primary_key=True, default=gen_uuid)
    name = Column(String, nullable=False)
    type = Column(String)        # PHC, CHC, District, Medical College
    district = Column(String)
    state = Column(String)
    address = Column(Text)
    phone = Column(String)
    lat = Column(Float)
    lng = Column(Float)
    emergency_available = Column(Boolean, default=False)
    total_beds = Column(Integer)
    is_ayushman_empanelled = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)

    departments = relationship("Department", back_populates="hospital")
    reviews = relationship("Review", back_populates="hospital")
