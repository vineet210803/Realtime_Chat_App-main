"use client";

const SignUp = ({ user, socket, input, setInput }) => {
  const addUser = () => {
    user.current = { name: input, id: socket.id };
    socket.emit("new_user", { user: input });
    setInput("");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl flex flex-col items-center w-[90%] max-w-md">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500 mb-4">
          Chat App
        </h1>
        <h2 className="text-lg text-gray-200 mb-6">
          Enter your name to join the chat
        </h2>

        <input
          type="text"
          className="w-full text-xl text-center bg-white/20 text-blue-100 rounded-lg py-3 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          placeholder="Type your name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addUser()}
        />

        <button
          className={`w-full text-lg font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md ${
            input
              ? "bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white"
              : "bg-slate-600 text-gray-300 cursor-not-allowed"
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
