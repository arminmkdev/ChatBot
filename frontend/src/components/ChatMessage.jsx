import "../styles/chatMessage.css";
import userImg from "../assets/image/user.png";
import robotImg from "../assets/image/robot.png";

function ChatMessage({ message, sender }) {
  const isRobot = sender === "robot";

  return (
    <div
      className={`flex items-center w-full ${
        isRobot ? "justify-end" : "justify-start"
      }`}
    >
      {!isRobot && <img src={userImg} alt="User Image" width={50} />}

      <p className="bg-gray-200 rounded-md mr-2 text-center px-5 py-2 mb-4 text-lg">
        {message}
      </p>

      {isRobot && <img src={robotImg} alt="Robot Image" width={50} />}
    </div>
  );
}

export default ChatMessage;