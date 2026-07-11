import sys
sys.path.append(".")
from app.core.database import SessionLocal, engine, Base
from app.models.hospital import Hospital
from app.models.department import Department
from app.models import *

Base.metadata.create_all(bind=engine)
db = SessionLocal()

hospitals_data = [
    {"name": "Ram Manohar Lohia Hospital", "type": "District", "district": "Lucknow", "state": "Uttar Pradesh", "address": "Vibhuti Khand, Gomti Nagar, Lucknow", "phone": "0522-2237968", "lat": 26.8467, "lng": 80.9462, "emergency_available": True, "total_beds": 500, "is_ayushman_empanelled": True},
    {"name": "Balrampur Hospital", "type": "District", "district": "Lucknow", "state": "Uttar Pradesh", "address": "Golaganj, Lucknow", "phone": "0522-2612591", "lat": 26.8553, "lng": 80.9173, "emergency_available": True, "total_beds": 700, "is_ayushman_empanelled": True},
    {"name": "Civil Hospital Agra", "type": "District", "district": "Agra", "state": "Uttar Pradesh", "address": "Mahatma Gandhi Road, Agra", "phone": "0562-2360330", "lat": 27.1767, "lng": 78.0081, "emergency_available": True, "total_beds": 400, "is_ayushman_empanelled": True},
    {"name": "SN Medical College Hospital", "type": "Medical College", "district": "Agra", "state": "Uttar Pradesh", "address": "Hospital Road, Agra", "phone": "0562-2411500", "lat": 27.1995, "lng": 78.0136, "emergency_available": True, "total_beds": 1200, "is_ayushman_empanelled": True},
    {"name": "Moti Lal Nehru Medical College", "type": "Medical College", "district": "Prayagraj", "state": "Uttar Pradesh", "address": "MLN Medical College Road, Prayagraj", "phone": "0532-2256222", "lat": 25.4358, "lng": 81.8463, "emergency_available": True, "total_beds": 1500, "is_ayushman_empanelled": True},
    {"name": "District Hospital Varanasi", "type": "District", "district": "Varanasi", "state": "Uttar Pradesh", "address": "Kabirchaura, Varanasi", "phone": "0542-2206666", "lat": 25.3176, "lng": 82.9739, "emergency_available": True, "total_beds": 350, "is_ayushman_empanelled": True},
    {"name": "BHU Sir Sunderlal Hospital", "type": "Medical College", "district": "Varanasi", "state": "Uttar Pradesh", "address": "BHU Campus, Varanasi", "phone": "0542-2368888", "lat": 25.2677, "lng": 82.9913, "emergency_available": True, "total_beds": 2000, "is_ayushman_empanelled": True},
    {"name": "District Hospital Kanpur", "type": "District", "district": "Kanpur", "state": "Uttar Pradesh", "address": "Generalganj, Kanpur", "phone": "0512-2330000", "lat": 26.4499, "lng": 80.3319, "emergency_available": True, "total_beds": 450, "is_ayushman_empanelled": True},
    {"name": "Ganesh Shankar Vidyarthi Medical College", "type": "Medical College", "district": "Kanpur", "state": "Uttar Pradesh", "address": "Swaroop Nagar, Kanpur", "phone": "0512-2530400", "lat": 26.5124, "lng": 80.3482, "emergency_available": True, "total_beds": 1000, "is_ayushman_empanelled": True},
    {"name": "District Hospital Gorakhpur", "type": "District", "district": "Gorakhpur", "state": "Uttar Pradesh", "address": "Bank Road, Gorakhpur", "phone": "0551-2201234", "lat": 26.7606, "lng": 83.3732, "emergency_available": True, "total_beds": 300, "is_ayushman_empanelled": False},
]

departments_data = [
    {"name": "General Medicine (OPD)", "opd_days": "Monday,Tuesday,Wednesday,Thursday,Friday", "opd_timing": "8AM - 2PM", "is_free": True},
    {"name": "Orthopaedics", "opd_days": "Monday,Wednesday,Friday", "opd_timing": "9AM - 1PM", "is_free": True},
    {"name": "Gynaecology & Obstetrics", "opd_days": "Monday,Tuesday,Wednesday,Thursday,Friday", "opd_timing": "8AM - 12PM", "is_free": True},
    {"name": "Paediatrics", "opd_days": "Monday,Tuesday,Wednesday,Thursday,Friday", "opd_timing": "9AM - 1PM", "is_free": True},
    {"name": "Eye (Ophthalmology)", "opd_days": "Tuesday,Thursday", "opd_timing": "9AM - 12PM", "is_free": True},
    {"name": "ENT", "opd_days": "Monday,Wednesday,Friday", "opd_timing": "10AM - 1PM", "is_free": True},
    {"name": "Surgery", "opd_days": "Monday,Tuesday,Wednesday,Thursday,Friday", "opd_timing": "8AM - 1PM", "is_free": True},
    {"name": "Cardiology", "opd_days": "Monday,Wednesday,Friday", "opd_timing": "9AM - 12PM", "is_free": True},
]

print("Seeding hospitals...")
for h in hospitals_data:
    existing = db.query(Hospital).filter(Hospital.name == h["name"]).first()
    if not existing:
        hospital = Hospital(**h)
        db.add(hospital)
        db.flush()
        for dept in departments_data:
            department = Department(hospital_id=hospital.id, **dept)
            db.add(department)

db.commit()
print(f"✅ Done! Seeded {len(hospitals_data)} hospitals with {len(departments_data)} departments each.")
db.close()
