import { NextRequest, NextResponse } from "next/server";
import { ollama } from "@/lib/ollama";

export async function POST(req: NextRequest) {
  try {
    const { prompt, messages } = await req.json();
    console.log(prompt);
    console.log(messages);

    if (messages) {
      const response = await ollama.chat(messages);
      return NextResponse.json({ response });
    }

    if (prompt) {
      const response = await ollama.generate(prompt);
      console.log("response: ", response);
      return NextResponse.json({ response });
    }

    return NextResponse.json(
      { error: "No prompt or messages provided" },
      { status: 400 }
    );
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
