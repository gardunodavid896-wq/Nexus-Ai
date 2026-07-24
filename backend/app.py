from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ai import chat

app = FastAPI(title="Nexus AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {
        "status": "online",
        "name": "Nexus AI"
    }


@app.post("/chat")
def chat_endpoint(request: ChatRequest):

    reply = chat(request.message)

    return {
        "response": reply
    }
