from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from app.services.ai_service import get_ai_response, analyze_medical_image, get_faq_answer

router = APIRouter()

class ChatMessage(BaseModel):
    message: str
    language: str = "hinglish"

@router.post("/chat")
def chat(body: ChatMessage):
    response = get_ai_response(body.message, body.language)
    return {"reply": response}

@router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    file_bytes = await file.read()
    result = analyze_medical_image(file_bytes, mime_type=file.content_type)
    return result

class FAQQuery(BaseModel):
    query: str

@router.post("/faq")
def faq_search(body: FAQQuery):
    answer = get_faq_answer(body.query)
    return {"answer": answer}
