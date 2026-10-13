from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import httpx
import json

app = FastAPI()

# اجازه دادن به React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # آدرس Vite
    allow_methods=["*"],
    allow_headers=["*"],
)

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "qwen2.5:7b"

class Message(BaseModel):
    role: str      # "user" | "assistant" | "system"
    content: str

class ChatRequest(BaseModel):
    messages: list[Message]

# --- حالت غیر استریم ---
@app.post("/chat")
async def chat(req: ChatRequest):
    async with httpx.AsyncClient(timeout=120) as client:
        r = await client.post(OLLAMA_URL, json={
            "model": MODEL,
            "messages": [m.dict() for m in req.messages],
            "stream": False,
        })
        data = r.json()
        return {"reply": data["message"]["content"]}

# --- حالت استریم (توصیه می‌شه) ---
@app.post("/chat/stream")
async def chat_stream(req: ChatRequest):
    async def event_gen():
        async with httpx.AsyncClient(timeout=None) as client:
            async with client.stream("POST", OLLAMA_URL, json={
                "model": MODEL,
                "messages": [m.dict() for m in req.messages],
                "stream": True,
            }) as resp:
                async for line in resp.aiter_lines():
                    if not line.strip():
                        continue
                    try:
                        chunk = json.loads(line)
                        token = chunk.get("message", {}).get("content", "")
                        if token:
                            yield f"data: {json.dumps({'token': token})}\n\n"
                        if chunk.get("done"):
                            yield "data: [DONE]\n\n"
                            break
                    except json.JSONDecodeError:
                        continue

    return StreamingResponse(event_gen(), media_type="text/event-stream")