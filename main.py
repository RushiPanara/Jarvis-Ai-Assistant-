from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv
from typing import Optional

if os.getenv("ENV") != "production":
    load_dotenv()

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class ChatRequest(BaseModel):
    message: str
    mode: Optional[str] = "chat"

@app.get("/")
def home():
    return FileResponse("templates/index.html")

@app.post("/chat")
async def chat(request: ChatRequest):

    if request.mode == "voice":
        system_prompt = """
        You are Jarvish, a futuristic AI assistant.
        Give short, clear spoken answers.
        Maximum 2 sentences.
        Sound natural in conversation.
        """
    else:
        system_prompt = """
        You are Jarvish, a AI assistant.
        Give short, clear answers.
        Sound natural in conversation.
        """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.message}
        ]
    )

    return {"response": response.choices[0].message.content}
