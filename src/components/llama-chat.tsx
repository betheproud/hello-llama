// components/AiChatbox.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function LlamaChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{
      role: "user" | "assistant";
      content: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    const newMessages = [...messages, { role: "user", content: input }];
    console.log(newMessages);

    try {
      const response = await fetch("/api/chat/llama", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">
          NOANSWERCRAFT AI Creative Assistant
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.role === "user" ? "bg-blue-100 ml-auto" : "bg-gray-100"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your creative thoughts..."
          className="flex-1"
        />
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Thinking..." : "Send"}
        </Button>
      </CardFooter>
    </Card>
  );
}
