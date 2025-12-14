// ============================================
// ChatView Component
// AI Assistant to explain how MegaLive works
// ============================================

import { Button, Card } from "@/components/ui";
import { callGemini } from "@/services/gemini";
import { Bot, Send, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SYSTEM_CONTEXT = `You are MegaBot, the friendly AI assistant for MegaLive.app - a gaming community platform.

About MegaLive:
- It's a hub for gamer communities (like Discord meets Challonge meets LinkedIn for gamers)
- Users can create "Spaces" (communities) for their favorite games
- Each Space can host tournaments with bracket visualization
- Users have "Gamer IDs" - profiles with stats, ranks, and AI-generated bios
- AI features include: auto-generating community descriptions, tags, gamer bios, and esports shoutcasting

Key features to explain:
1. Explore - Discover gaming communities
2. Create Space - Start your own community with AI-generated descriptions
3. Tournaments - Single/Double elimination brackets with live AI commentary
4. Gamer ID - Your profile with stats and AI-generated bio
5. My Matches - Track your tournament participation

Be friendly, use gaming terminology, keep responses concise (2-3 sentences max unless asked for details). Add some personality!`;

const SUGGESTED_QUESTIONS = [
  "What is MegaLive?",
  "How do I create a community?",
  "What are the AI features?",
  "How do tournaments work?",
];

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hey! I'm MegaBot. I can help you understand how the platform works. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const prompt = `${SYSTEM_CONTEXT}\n\nUser question: ${content}\n\nRespond helpfully and concisely:`;
      const response = await callGemini(prompt);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Connection error. Try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-180px)] flex flex-col">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-800 mx-auto mb-3 flex items-center justify-center border border-zinc-700">
          <Bot className="w-6 h-6 text-zinc-400" />
        </div>
        <h2 className="text-lg font-semibold text-zinc-100">MegaBot</h2>
        <p className="text-zinc-500 text-sm">Your guide to MegaLive</p>
      </div>

      {/* Messages */}
      <Card className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2.5 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === "assistant" ? "bg-zinc-800" : "bg-zinc-700"
                }`}
              >
                {message.role === "assistant" ? (
                  <Bot className="w-3.5 h-3.5 text-zinc-400" />
                ) : (
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                  message.role === "assistant"
                    ? "bg-zinc-800/50 text-zinc-300"
                    : "bg-violet-600/90 text-white"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-zinc-400" />
              </div>
              <div className="bg-zinc-800/50 rounded-lg px-3 py-2.5">
                <div className="flex gap-1">
                  <span
                    className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-4 pb-3">
            <p className="text-[11px] text-zinc-600 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTED_QUESTIONS.map((question) => (
                <button
                  key={question}
                  onClick={() => sendMessage(question)}
                  className="text-xs bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="p-3 border-t border-zinc-800/60"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-zinc-900 border border-zinc-800/60 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none transition-colors"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              size="sm"
              className="px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
