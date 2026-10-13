import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import { useChat } from "./hooks/useChat";

export default function App() {
  const { messages, loading, error, send, stop, clear } = useChat();

  return (
    <div className="flex h-screen flex-col bg-slate-950">
      <ChatHeader onClear={clear} hasMessages={messages.length > 0} />

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden">
        {error && (
          <div className="mx-4 mt-3 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
            ⚠️ {error}
          </div>
        )}

        <ChatMessages messages={messages} loading={loading} onSuggest={send} />
      </main>

      <ChatInput onSend={send} onStop={stop} loading={loading} />
    </div>
  );
}
