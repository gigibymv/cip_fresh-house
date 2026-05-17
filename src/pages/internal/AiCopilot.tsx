import { PageHeader } from "@/components/shared/PageHeader";
import { aiSuggestedPrompts } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, Bot, FileText } from "lucide-react";
import { useState } from "react";

interface Message { role: "user" | "assistant"; content: string; sources?: string[]; }

export default function AiCopilot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "I'm your capital strategy copilot. I can help draft outreach materials, analyze funder fit, predict objections, and recommend capital structures. What are you working on?", sources: [] }
  ]);
  const [input, setInput] = useState("");

  const internalPrompts = [
    "Draft a renewal email for Blue Shield Foundation",
    "What objections might Kaiser raise?",
    "Which funders best fit our maternal health program?",
    "Generate a one-pager for UnitedHealth Group",
    "Compare payer vs foundation capital for our renal program",
    "What's our weakest evidence area?",
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev,
      { role: "user", content: text },
      { role: "assistant", content: `Here's my analysis regarding "${text}":\n\nBased on our current funder data and program metrics, I recommend focusing on three key points:\n\n1. Our health score improvement (78%) exceeds the industry top quartile (74%), which is our strongest evidence point.\n\n2. The medically tailored meals program has the highest cost-effectiveness ratio, making it ideal for payer conversations.\n\n3. For outreach, lead with our validated outcomes data — 4 of 5 core metrics are independently verified.\n\nWould you like me to draft specific materials or dig deeper into any of these areas?`, sources: ["Outcome Data", "Benchmark Analysis", "Funder Profiles"] }
    ]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 h-[calc(100vh-8rem)] flex flex-col">
      <PageHeader title="AI Copilot" description="Your capital strategy assistant for outreach, analysis, and material generation." />

      <div className="flex-1 overflow-auto space-y-4 pb-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div className={msg.role === "user"
              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3 max-w-lg text-sm"
              : "bg-card border rounded-2xl rounded-bl-sm px-4 py-3 max-w-2xl text-sm"
            }>
              {msg.role === "assistant" && <Bot className="h-4 w-4 text-teal mb-2" />}
              <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50 space-y-1">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">References</p>
                  {msg.sources.map((s, j) => (
                    <div key={j} className="flex items-center gap-1.5 text-xs text-muted-foreground"><FileText className="h-3 w-3" />{s}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {messages.length <= 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {internalPrompts.map(p => (
            <button key={p} onClick={() => handleSend(p)} className="p-3 rounded-lg border bg-card text-left text-xs hover:bg-accent/50 transition-colors">
              <Sparkles className="h-3.5 w-3.5 text-teal mb-1.5" />{p}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend(input)} placeholder="Ask about capital strategy, funder fit, or draft materials..." className="flex-1" />
        <Button onClick={() => handleSend(input)} size="icon"><Send className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}
