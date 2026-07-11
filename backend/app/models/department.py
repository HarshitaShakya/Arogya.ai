from sqlalchemy import Column, String, Boolean, Integer, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
import uuid

def gen_uuid():
    return str(uuid.uuid4())

class Department(Base):
    __tablename__ = "departments"

    id = Column(String, primary_key=True, default=gen_uuid)
    hospital_id = Column(String, ForeignKey("hospitals.id"))
    name = Column(String)
    opd_days = Column(String)    # "Monday,Wednesday,Friday"
    opd_timing = Column(String)  # "9AM - 1PM"
    is_free = Column(Boolean, default=True)
    charges_if_paid = Column(Integer, default=0)
    doctor_count = Column(Integer, default=1)

    hospital = relationship("Hospital", back_populates="departments")
