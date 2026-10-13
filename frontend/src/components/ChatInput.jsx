import "../styles/chatInput.css";

function ChatInput() {
  return (
    <>

      <div className="absolute bottom-3 w-full h-15 flex items-center justify-center">

        <button type="button" className="bg-green-700 py-2 px-7 text-xl rounded-md hover:bg-green-600 active:bg-green-500 transition-all">
          ارسال
        </button>

        <input
          type="text"
          placeholder="به چت بات پیامی ارسال کنید."
          size="50"
          className="border border-black rounded-md text-xl px-2 py-2 mr-2 text-wrap focus:border-green-700 outline-none transition-all"
        />
      </div>
    </>
  );
}

export default ChatInput;
