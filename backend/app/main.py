from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from .schemas import ChatRequest
from .ollama_client import stream_chat

app = FastAPI(title="Qwen ChatBot API")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.get("/")
def root():
  return {"status": "ok", "model": "qwen2.5:7b"}


@app.post("/chat/stream")
async def chat_stream(req: ChatRequest):
  messages = [m.model_dump() for m in req.messages]
  return StreamingResponse(
    stream_chat(messages),
    media_type="text/event-stream",
    headers={
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
      "Connection": "keep-alive",
    },
  )
