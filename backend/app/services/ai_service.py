import os
from groq import Groq
from dotenv import load_dotenv
# pyrefly: ignore [missing-import]
import google.generativeai as genai
import json

load_dotenv()


client = Groq(api_key=os.getenv("GROQ_API_KEY"))
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_ai_response(message: str, language: str = "auto") -> str:
    system_prompt = """You are Arogya Assistant, a knowledgeable medical triage AI for Indian government hospitals.

LANGUAGE RULE - HIGHEST PRIORITY:
Detect the language of the user message and respond in that EXACT same language.
English input = English response. Hindi input = Hindi response. Tamil input = Tamil response. NEVER mix.

SYMPTOM TO DEPARTMENT MAPPING:
- Fever, headache, body ache, cold, nausea, vomiting = General Medicine OPD
- Severe chest pain, breathlessness = Cardiology / EMERGENCY if severe
- Stomach pain, diarrhea, acidity = Gastroenterology or General Medicine
- Eye problems = Ophthalmology
- Ear, nose, throat = ENT Department
- Skin rash, itching = Dermatology
- Bone, joint, back pain = Orthopaedics
- Child illness = Paediatrics
- Pregnancy, delivery = Gynaecology and Obstetrics
- Dental pain = Dental OPD
- Mental health, depression = Psychiatry
- Diabetes, thyroid = Endocrinology or General Medicine
- Kidney, urine issues = Nephrology or Urology
- Nerve problems, seizures = Neurology
- Injury, fracture = Orthopaedics or Emergency
- Burns = Surgery or Emergency
- High BP = General Medicine or Cardiology
- Cancer screening = Oncology

RESPONSE FORMAT:
1. One sentence acknowledging the symptom warmly
2. What condition it could be (brief, educational)
3. Which department to visit (specific)
4. Urgency: Routine OPD / Within 24 hours / EMERGENCY - go now
5. One practical tip
6. Carry Aadhar card and Ayushman Bharat card if available

RULES:
- If emergency symptoms detected say GO TO EMERGENCY NOW
- Never diagnose definitively
- Max 150 words
- Be warm but accurate and professional
- Temperature is low so be factual not creative"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message}
        ],
        max_tokens=400,
        temperature=0.2,
    )
    return response.choices[0].message.content

def analyze_medical_image(image_bytes: bytes, mime_type: str = "image/jpeg") -> dict:
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        prompt = """
        You are an expert AI Radiologist. 
        Analyze this medical image (X-ray, MRI, or CT scan). 
        Determine if there are any visible anomalies.
        
        Respond ONLY with a valid JSON object in the following format:
        {
            "detected_anomaly": true or false,
            "confidence_score": number between 0 and 100,
            "severity": "None", "Low", "Moderate", "High", or "Severe",
            "analysis_text": "A simple, easy-to-understand summary (at least 4-6 sentences) explaining the visual findings, any potential anomalies or diseases, and the recommended next steps. Use plain English suitable for a patient without a medical background. Avoid complex medical jargon where possible, or explain it simply."
        }
        """
        
        image_parts = [
            {
                "mime_type": mime_type,
                "data": image_bytes
            }
        ]
        
        response = model.generate_content([prompt, image_parts[0]])
        
        # Clean markdown if present
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
            
        result = json.loads(text.strip())
        
        # Ensure boolean
        if isinstance(result.get("detected_anomaly"), str):
            result["detected_anomaly"] = result["detected_anomaly"].lower() == "true"
            
        return result
    except Exception as e:
        print(f"Error in Gemini Vision API: {e}")
        return {
            "detected_anomaly": False,
            "confidence_score": 0,
            "severity": "None",
            "analysis_text": "Failed to analyze image due to an internal error."
        }

def get_faq_answer(query: str) -> str:
    system_prompt = """You are the official Support Assistant for Arogya.ai.
Answer the user's question concisely and accurately based on the following facts:

- Arogya.ai is an AI-powered healthcare platform that helps users discover government hospitals, check OPD timings, explore free healthcare services, and receive intelligent healthcare guidance.
- Searching hospitals and accessing government healthcare information is completely free.
- Appointment booking is available only for hospitals that support online scheduling.
- We provide healthcare information and AI assistance but do not replace professional medical advice.
- User privacy and data security are our highest priorities.

If the question is not covered by these facts, provide a polite, helpful, and logical response that aligns with a free public healthcare platform in India. Keep answers under 3 sentences."""
    
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": query}
            ],
            max_tokens=200,
            temperature=0.3,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error in Groq FAQ API: {e}")
        return "I'm currently unable to answer that, please try again later or contact support@arogya.ai."
