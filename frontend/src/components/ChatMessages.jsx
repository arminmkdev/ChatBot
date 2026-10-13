import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import robot from "../assets/image/robot.png";

const SUGGESTIONS = [
  "یه جوک بگو 😄",
  "تفاوت React و Vue چیه؟",
  "یه تابع پایتون برای فیبوناچی بنویس",
  "برای شروع یادگیری ML چی پیشنهاد می‌دی؟",
];

export default function ChatMessages({ messages, loading, onSuggest }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);
  const stickToBottom = useRef(true);

  // تشخیص این‌که کاربر اسکرول کرده یا نه
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    stickToBottom.current = distance < 80;
  };

  useEffect(() => {
    if (stickToBottom.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
        <img
          src={robot}
          alt="robot"
          className="h-24 w-24 rounded-full bg-slate-800 p-3 ring-2 ring-emerald-500/30"
        />
        <div>
          <h2 className="text-xl font-bold text-slate-100">سلام! 👋</h2>
          <p className="mt-1 text-sm text-slate-400">
            هر سوالی داری بپرس، من با Qwen 2.5 جواب می‌دم.
          </p>
        </div>
        <div className="grid w-full max-w-md grid-cols-1 gap-2 sm:grid-cols-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onSuggest(s)}
              className="rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-right text-xs text-slate-300 transition hover:border-emerald-500 hover:bg-slate-800 hover:text-emerald-300"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const lastIndex = messages.length - 1;

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 space-y-4 overflow-y-auto px-4 py-6"
    >
      {messages.map((m, i) => (
        <ChatMessage
          key={i}
          role={m.role}
          content={m.content}
          isStreaming={loading && i === lastIndex && m.role === "assistant"}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
