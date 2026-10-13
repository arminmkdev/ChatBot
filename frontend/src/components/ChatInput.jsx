import { useEffect, useRef, useState } from "react";

export default function ChatInput({ onSend, onStop, loading }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  // autosize
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [value]);

  const submit = () => {
    const text = value.trim();
    if (!text || loading) return;
    onSend(text);
    setValue("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t border-slate-700 bg-slate-900/80 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-slate-700 bg-slate-800 p-2 focus-within:border-emerald-500">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="پیامت رو بنویس... (Enter برای ارسال، Shift+Enter خط جدید)"
          rows={1}
          disabled={loading}
          className="max-h-40 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm leading-6 text-slate-100 placeholder:text-slate-500 focus:outline-none disabled:opacity-60"
        />

        {loading ? (
          <button
            onClick={onStop}
            title="توقف"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-white transition hover:bg-rose-500"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect x="2" y="2" width="10" height="10" rx="2" />
            </svg>
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!value.trim()}
            title="ارسال"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
