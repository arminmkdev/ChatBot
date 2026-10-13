import robot from "../assets/image/robot.png";

export default function ChatHeader({ onClear, hasMessages }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-700 bg-slate-900/80 px-5 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <img
          src={robot}
          alt="robot"
          className="h-10 w-10 rounded-full bg-slate-800 p-1 ring-2 ring-emerald-500/40"
        />
        <div className="leading-tight">
          <h1 className="text-base font-bold text-slate-100">
            چت‌بات Qwen 2.5
          </h1>
          <p className="text-xs text-emerald-400">آنلاین • مدل محلی</p>
        </div>
      </div>

      {hasMessages && (
        <button
          onClick={onClear}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 transition hover:border-rose-500 hover:text-rose-400"
        >
          پاک‌کردن گفتگو
        </button>
      )}
    </header>
  );
}
