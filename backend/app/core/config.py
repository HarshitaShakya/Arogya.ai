from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./arogya.db"
    ANTHROPIC_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    APP_NAME: str = "Arogya.ai"
    DEBUG: bool = True

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
