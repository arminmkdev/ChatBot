import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const API = "http://localhost:8000";

export default function App() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Msg = { role: "user", content: input };
    const newHistory = [...messages, userMsg];
    setMessages([...newHistory, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
      });

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const { token } = JSON.parse(data);
            setMessages((prev) => {
              const copy = [...prev];
              copy[copy.length - 1] = {
                role: "assistant",
                content: copy[copy.length - 1].content + token,
              };
              return copy;
            });
          } catch {}
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>🤖 چت‌بات Qwen 2.5</h2>

      <div style={{
        height: 400, overflowY: "auto", border: "1px solid #ccc",
        borderRadius: 8, padding: 12, marginBottom: 12, background: "#fafafa"
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            textAlign: m.role === "user" ? "right" : "left",
            margin: "8px 0",
          }}>
            <span style={{
              display: "inline-block",
              padding: "8px 12px",
              borderRadius: 12,
              background: m.role === "user" ? "#007bff" : "#e9ecef",
              color: m.role === "user" ? "white" : "black",
              whiteSpace: "pre-wrap",
              maxWidth: "80%",
              textAlign: "left",
              direction: "rtl",
            }}>
              {m.content || (loading && i === messages.length - 1 ? "…" : "")}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="پیامت رو بنویس..."
          style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ccc", direction: "rtl" }}
          disabled={loading}
        />
        <button onClick={send} disabled={loading}
          style={{ padding: "10px 20px", borderRadius: 8, cursor: "pointer" }}>
          {loading ? "..." : "ارسال"}
        </button>
      </div>
    </div>
  );
}