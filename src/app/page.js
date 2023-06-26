"use client";

import { useChat } from "ai/react";
import { useEffect } from "react";
import { useRef } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat();
  const containerMessagesRef = useRef(null);

  useEffect(() => {
    containerMessagesRef.current.scrollTo({
      top: containerMessagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="mx-auto w-full h-[95vh] max-w-md  flex flex-col stretch space-y-4 bg-white shadow-xl rounded-lg">
      <div className="pt-6 px-6">
        <h1 className="text-2xl font-bold border-b border-gray-300 pb-2">Chat</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-6 space-y-5 pt-2" ref={containerMessagesRef}>
        {messages.map((m) => (
          <div key={m.id}>
            <div className="flex items-center pb-1">
              <div
                className={`w-8 h-8 rounded-full mr-2 ${
                  m.role === "user" ? "bg-gray-300" : "bg-gray-500"
                }`}
              ></div>

              <p className="text-lg">{m.role === "user" ? "Tú" : "AI"}</p>
            </div>

            {m.content.split("\n").map((line, i) => (
              <p className="mt-1" key={i}>
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2  px-6 pb-4">
        <input
          className=" border-gray-300 rounded border p-2 flex-1"
          placeholder="Preguntar algo..."
          value={input}
          onChange={handleInputChange}
        />
        {!isLoading ? (
          <button type="submit" className="bg-green-600 text-white hover:bg-green-700 px-4 rounded">
            Enviar
          </button>
        ) : (
          <button
            type="button"
            className="bg-red-600 text-white hover:bg-red-700 px-4 rounded"
            onClick={stop}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}
