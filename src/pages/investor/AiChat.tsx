import { PageHeader } from "@/components/shared/PageHeader";
import { aiSuggestedPrompts, aiChatMessages } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, BarChart3, FileText } from "lucide-react";
import { useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>(aiChatMessages);
  const [input, setInput] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    const assistantMsg: Message = {
      role: "assistant",
      content: `Based on the available data, here's what I found regarding "${text}":\n\nThe health score improvement has been trending upward over the past 2 quarters, from 67 to 78 (+16.4%). This is primarily driven by the Medically Tailored Meals program which accounts for 42% of the improvement. The data is validated through EHR integration and meets the threshold for statistical significance (p<0.05).`,
      sources: ["2025 Annual Impact Report", "Outcome Data — Q3/Q4 2025", "Methodology Document"]
    };
    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 h-[calc(100vh-8rem)] flex flex-col">
      <PageHeader title="AI Data Assistant" description="Ask questions about outcomes, methodology, and program performance." />

      <div className="flex-1 overflow-auto space-y-4 pb-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div className={msg.role === "user"
              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3 max-w-lg text-sm"
              : "bg-card border rounded-2xl rounded-bl-sm px-4 py-3 max-w-2xl text-sm"
            }>
              <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50 space-y-1.5">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Sources</p>
                  {msg.sources.map((s, j) => (
                    <div key={j} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <FileText className="h-3 w-3" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {messages.length <= 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {aiSuggestedPrompts.map((prompt) => (
            <button key={prompt} onClick={() => handleSend(prompt)}
              className="p-3 rounded-lg border bg-card text-left text-xs hover:bg-accent/50 transition-colors leading-relaxed">
              <Sparkles className="h-3.5 w-3.5 text-teal mb-1.5" />
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          placeholder="Ask about outcomes, methodology, or program data..."
          className="flex-1"
        />
        <Button onClick={() => handleSend(input)} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
