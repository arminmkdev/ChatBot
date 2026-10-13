import json
import httpx

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "qwen2.5:7b"


async def stream_chat(messages: list[dict]):
    """استریم پاسخ از Ollama به صورت SSE."""
    async with httpx.AsyncClient(timeout=None) as client:
        async with client.stream(
            "POST",
            OLLAMA_URL,
            json={"model": MODEL, "messages": messages, "stream": True},
        ) as resp:
            resp.raise_for_status()
            async for line in resp.aiter_lines():
                if not line.strip():
                    continue
                try:
                    chunk = json.loads(line)
                except json.JSONDecodeError:
                    continue

                token = chunk.get("message", {}).get("content", "")
                if token:
                    yield f"data: {json.dumps({'token': token}, ensure_ascii=False)}\n\n"

                if chunk.get("done"):
                    yield "data: [DONE]\n\n"
                    break
