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
    <div className="w-full fixed bottom-0 left-0 bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-900 py-4 px-3 flex items-center justify-center shadow-[0_-2px_15px_rgba(0,0,0,0.4)] md:relative">
      <div className="flex items-center w-full max-w-3xl gap-3">
        <input
          type="text"
          className="flex-grow bg-white/15 text-white placeholder-gray-400 text-lg md:text-xl py-3 px-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
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
          className={`rounded-2xl p-3 md:p-4 transition-all duration-300 flex items-center justify-center shadow-md ${
            input
              ? "bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400"
              : "bg-slate-600 hover:bg-slate-500"
          }`}
        >
          <Image
            src={input ? send : upload}
            alt="send"
            height={28}
            width={28}
            className="md:w-8 w-6 invert"
          />
        </button>
      </div>
    </div>
  );
};

export default Inputs;
