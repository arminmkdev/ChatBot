import { useCallback, useRef, useState } from "react";
import { streamChat } from "../services/api";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const send = useCallback(
    async (text) => {
      const content = text.trim();
      if (!content || loading) return;

      setError(null);
      const userMsg = { role: "user", content };
      const history = [...messages, userMsg];

      setMessages([...history, { role: "assistant", content: "" }]);
      setLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        await streamChat(
          history,
          (token) => {
            setMessages((prev) => {
              const copy = [...prev];
              const last = copy.length - 1;
              copy[last] = {
                ...copy[last],
                content: copy[last].content + token,
              };
              return copy;
            });
          },
          controller.signal,
        );
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(
            "ارتباط با سرور برقرار نشد. مطمئن شو Ollama و بک‌اند در حال اجرا هستند.",
          );
          console.error(e);
        }
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [messages, loading],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    setLoading(false);
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setLoading(false);
  }, []);

  return { messages, loading, error, send, stop, clear };
}
