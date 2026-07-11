import csv
import json
import os

input_csv = r"d:\All new Downloads\hospital_directory.csv"
output_json = r"d:\arogya-ai - part 2\frontend\public\hospitals.json"

hospitals = []
id_counter = 1

try:
    with open(input_csv, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            coords = row.get("Location_Coordinates", "")
            lat, lng = None, None
            if coords and "," in coords:
                parts = coords.split(",")
                try:
                    lat = float(parts[0].strip())
                    lng = float(parts[1].strip())
                except ValueError:
                    pass
            
            name = row.get("Hospital_Name", "").strip()
            state = row.get("State", "").strip()
            district = row.get("District", "").strip()
            
            if not name or not state or not district:
                continue
                
            # Fallback coordinates if missing
            if lat is None or lng is None:
                def hash_code(s):
                    h = 0
                    for c in s:
                        h = (h * 31 + ord(c)) & 0xFFFFFFFF
                    return h
                dist_hash = hash_code(district + state)
                center_lat = 8.0 + (dist_hash % 29000) / 1000.0
                center_lng = 68.0 + ((dist_hash * 7) % 29000) / 1000.0
                lat = center_lat + ((id_counter * 13) % 100 - 50) / 5000.0
                lng = center_lng + ((id_counter * 17) % 100 - 50) / 5000.0

            address = row.get("Address_Original_First_Line", "").strip()
            category = row.get("Hospital_Category", "").strip()
            beds = row.get("Total_Num_Beds", "").strip()
            emergency = row.get("Emergency_Services", "").strip()

            if not name or not state or not district:
                continue

            # Determine type
            h_type = "District Hospital"
            if "Medical College" in name or "Institute" in name:
                h_type = "Medical College"
            elif "Private" in category or "Trust" in category:
                h_type = "Private Hospital"
            elif "Primary" in name or "PHC" in name:
                h_type = "Primary Health Centre"
            elif "Community" in name or "CHC" in name:
                h_type = "Community Health Centre"

            # Parse beds
            try:
                beds_count = int(beds)
            except:
                beds_count = 50 # fallback
                
            hospital = {
                "id": str(id_counter),
                "name": name,
                "state": state,
                "district": district,
                "address": address,
                "type": h_type,
                "lat": lat,
                "lng": lng,
                "total_beds": beds_count,
                "emergency_available": emergency.lower() == "yes" or h_type == "Medical College" or h_type == "District Hospital",
                "is_ayushman_empanelled": "Private" not in h_type # Assume govt is empanelled
            }
            hospitals.append(hospital)
            id_counter += 1

    print(f"Parsed {len(hospitals)} valid hospitals.")
    
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(hospitals, f, separators=(',', ':')) # compact JSON
    print(f"Saved to {output_json}")

except Exception as e:
    print(f"Error: {e}")
