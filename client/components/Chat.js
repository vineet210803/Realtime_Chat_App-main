import { Message, ServerMessage, Typing } from "./Messages";
import { useEffect, useRef } from "react";

const Chat = ({ chat, user, typing }) => {
  const scroller = useRef(null);

  useEffect(() => {
    if (!scroller.current) return;
    scroller.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [chat]);

  return (
    <div className="h-full pb-20 md:p-6 bg-[#0f0f11] flex flex-col justify-end">
      <div
        className="w-full h-full max-h-[calc(100vh-5rem)] overflow-y-auto p-4 rounded-xl 
        bg-[#1a1a1d] shadow-inner border border-[#2a2a2d]
        scrollbar-thin scrollbar-thumb-[#3a3a3d] scrollbar-track-[#1a1a1d]"
      >
        {chat.map((message, index) => {
          message = { ...message, own: message.user?.id === user.id };
          return message.type === "server" ? (
            <ServerMessage key={index} {...message} />
          ) : (
            <Message key={index} {...message} />
          );
        })}

        {typing[0] && <Typing user={typing[0]} />}

        <div ref={scroller} className="pb-6" />
      </div>
    </div>
  );
};

export default Chat;
