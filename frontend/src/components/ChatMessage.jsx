import robot from "../assets/image/robot.png";
import user from "../assets/image/user.png";

export default function ChatMessage({ role, content, isStreaming }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <img
        src={isUser ? user : robot}
        alt={role}
        className="mt-1 h-8 w-8 shrink-0 rounded-full bg-slate-800 p-0.5 ring-1 ring-slate-700"
      />

      <div
        className={`max-w-[80%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-7 shadow-sm ${
          isUser
            ? "rounded-tr-sm bg-emerald-600 text-white"
            : "rounded-tl-sm bg-slate-800 text-slate-100 ring-1 ring-slate-700"
        }`}
      >
        {content}
        {isStreaming && !content && (
          <span className="inline-flex gap-1">
            <span className="dot h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="dot h-1.5 w-1.5 rounded-full bg-slate-400" />
            <span className="dot h-1.5 w-1.5 rounded-full bg-slate-400" />
          </span>
        )}
        {isStreaming && content && (
          <span className="ms-1 inline-block h-3 w-1 animate-pulse bg-emerald-400 align-middle" />
        )}
      </div>
    </div>
  );
}
