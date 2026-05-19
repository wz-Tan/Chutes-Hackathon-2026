"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "ai" | "user";
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    role: "ai",
    text: "Hi! I'm your campus study assistant. Ask me anything about your modules, assignments, or course materials.",
  },
  {
    role: "user",
    text: "Can you help me understand the first law of thermodynamics?",
  },
  {
    role: "ai",
    text: "Of course! The first law states that energy cannot be created or destroyed — only converted from one form to another. In equation form: ΔU = Q − W, where ΔU is the change in internal energy, Q is heat added to the system, and W is work done by the system. Want me to walk through an example problem?",
  },
];

const SIDEBAR_CHATS = [
  { title: "Thermodynamics revision", meta: "Today", active: true },
  { title: "Assignment 2 help", meta: "Yesterday" },
  { title: "Explain Laplace transforms", meta: "May 15" },
  { title: "Case study outline", meta: "May 12" },
  { title: "Quiz prep — week 8", meta: "May 10" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const val = input.trim();
    if (!val) return;
    setMessages((prev) => [...prev, { role: "user", text: val }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "That's a great question. Connect the backend to get live AI responses — this is just a frontend preview!",
        },
      ]);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="flex flex-1 overflow-hidden"
      style={{ height: "calc(100vh - 56px)" }}
    >
      {/* Sidebar */}
      <div
        className="flex flex-col flex-shrink-0"
        style={{
          width: 240,
          background: "#fff",
          borderRight: "1px solid #e5ede9",
        }}
      >
        <div
          className="flex flex-col"
          style={{
            padding: "14px 14px 10px",
            borderBottom: "1px solid #f0f4f2",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: "#9ca3af",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 8,
            }}
          >
            Conversations
          </p>
          <button className="new-chat-btn">
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            New chat
          </button>
        </div>

        <div className="flex flex-col gap-0.5 flex-1 overflow-y-auto p-2">
          {SIDEBAR_CHATS.map((chat, i) => (
            <div key={i} className={`chat-item ${chat.active ? "active" : ""}`}>
              <div className="chat-item-title">{chat.title}</div>
              <div style={{ fontSize: 11.5, color: "#9ca3af", marginTop: 2 }}>
                {chat.meta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto flex flex-col gap-4"
          style={{ padding: "1.5rem 2rem" }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 items-start max-w-2xl ${msg.role === "user" ? "flex-row-reverse self-end" : ""}`}
            >
              {/* Avatar */}
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0 mt-0.5"
                style={{
                  width: 30,
                  height: 30,
                  fontSize: 12,
                  fontWeight: 600,
                  background: msg.role === "ai" ? "var(--teal-50)" : "#e5e7eb",
                  color: msg.role === "ai" ? "var(--teal-600)" : "#6b7280",
                }}
              >
                {msg.role === "ai" ? "AI" : "You"}
              </div>
              {/* Bubble */}
              <div
                className={
                  msg.role === "ai" ? "msg-bubble-ai" : "msg-bubble-user"
                }
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          style={{
            padding: "14px 2rem 16px",
            borderTop: "1px solid #e5ede9",
            background: "#fff",
          }}
        >
          <div className="chat-input-wrap">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your coursework…"
            />
            <button
              onClick={sendMessage}
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width: 32,
                height: 32,
                background: "var(--teal-600)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "var(--teal-700)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "var(--teal-600)")
              }
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
