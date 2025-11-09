"use client";

const SignUp = ({ user, socket, input, setInput }) => {
  const addUser = () => {
    user.current = { name: input, id: socket.id };
    socket.emit("new_user", { user: input });
    setInput("");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#0f0f11]">
      <div className="bg-[#1a1a1d] p-10 rounded-xl shadow-xl w-[90%] max-w-md flex flex-col items-center border border-[#2a2a2d]">
        <h1 className="text-5xl font-bold text-white mb-4">Chat App</h1>
        <h2 className="text-lg text-gray-400 mb-6">Enter your name to join</h2>

        <input
          type="text"
          className="w-full bg-[#2a2a2d] text-gray-100 text-lg py-3 px-4 rounded-lg mb-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Type your name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addUser()}
        />

        <button
          className={`w-full text-lg font-semibold py-3 px-4 rounded-lg transition-all duration-300 ${
            input
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "bg-[#3a3a3d] text-gray-400 cursor-not-allowed"
          }`}
          disabled={!input}
          onClick={addUser}
        >
          Join Chat
        </button>
      </div>
    </div>
  );
};

export default SignUp;
