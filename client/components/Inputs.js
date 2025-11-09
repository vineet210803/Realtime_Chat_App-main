import { useRef, useState } from "react";
import Image from "next/image";
import { send, upload } from "@/assets";

const Inputs = ({ user, socket, setChat }) => {
  const [input, setInput] = useState("");
  const uploadInput = useRef(null);

  const sendMessage = () => {
    if (input) {
      const msg = { content: input, type: "text", user };
      socket.emit("send_message", msg);
      socket.emit("user_typing", { user: user.name, typing: false });
      setChat((prev) => [...prev, msg]);
      setInput("");
    } else {
      uploadInput.current.click();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const img = URL.createObjectURL(file);
      const msg = { content: img, type: "image", user };
      setChat((prev) => [...prev, msg]);
      socket.emit("send_message", msg);
    }
  };

  const userTyping = (e) => {
    setInput(e.target.value);
    socket.emit("user_typing", {
      user: user.name,
      typing: e.target.value ? true : false,
    });
  };

  return (
    <div className="w-full fixed bottom-0 left-0 bg-[#1a1a1d] py-3 px-4 border-t border-[#2a2a2d] flex items-center justify-center md:relative">
      <div className="flex items-center w-full max-w-3xl gap-3">
        <input
          type="text"
          className="flex-grow bg-[#2a2a2d] text-gray-100 placeholder-gray-500 text-lg md:text-xl py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Type a message..."
          value={input}
          onChange={userTyping}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <input
          ref={uploadInput}
          type="file"
          className="hidden"
          onChange={handleImageUpload}
        />

        <button
          onClick={sendMessage}
          className={`rounded-lg p-3 md:p-4 transition-all duration-200 flex items-center justify-center ${
            input
              ? "bg-blue-600 hover:bg-blue-500"
              : "bg-[#3a3a3d] hover:bg-[#4a4a4d]"
          }`}
        >
          <Image
            src={input ? send : upload}
            alt="send"
            height={26}
            width={26}
            className="invert"
          />
        </button>
      </div>
    </div>
  );
};

export default Inputs;
