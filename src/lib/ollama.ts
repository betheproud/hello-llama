// lib/ollama.ts
export class OllamaClient {
  private baseUrl: string;
  private model: string;

  constructor(
    baseUrl: string = "http://127.0.0.1:11434",
    model: string = "llama3.2"
  ) {
    this.baseUrl = baseUrl;
    this.model = model;
  }

  async generate(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          prompt: prompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error calling Ollama:", error);
      throw error;
    }
  }

  async chat(
    messages: Array<{ role: "user" | "assistant"; content: string }>
  ): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.message.content;
    } catch (error) {
      console.error("Error calling Ollama chat:", error);
      throw error;
    }
  }
}

export const ollama = new OllamaClient();
