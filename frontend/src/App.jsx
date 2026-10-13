import "./App.css";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";

function App() {
  const chatMessages = [
    { id: "id1", message: "سلام", sender: "user" },
    { id: "id2", message: "سلام، چطور میتونم کمکتون کنم؟", sender: "robot" },
    { id: "id3", message: "امروز چندمه؟", sender: "user" },
    { id: "id4", message: "امروز 21 مهر ماه 1405 هست.", sender: "robot" },
    { id: "id5", message: "هوا چطوره؟", sender: "user" },
    { id: "id6", message: "نیمه ابری.", sender: "robot" },
    { id: "id7", message: "هوش مصنوعی رو خیلی کوتاه و مختصر توضیح بده!", sender: "user" },
    { id: "id8", message: "بزار سرچ کنم...", sender: "robot" },
  ];

  return (
    <div className="w-11/12 h-screen flex items-center justify-center flex-col relative m-auto px-2 overflow-y-auto">
      {chatMessages.map((msg) => (
        <ChatMessage key={msg.id} message={msg.message} sender={msg.sender} />
      ))}
      <ChatInput />
    </div>
  );
}

export default App;
