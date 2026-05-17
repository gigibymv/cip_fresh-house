import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, FileText, ShieldAlert, ArrowRight } from "lucide-react";
import { useState } from "react";
import { ConfidenceBadge, ConfidenceLevel } from "@/components/shared/ConfidenceBadge";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  confidence?: ConfidenceLevel;
  limitation?: string;
  nextAction?: string;
}

const starterPrompts = [
  "What evidence supports renewal?",
  "Which program has the strongest outcomes?",
  "Where are beneficiary satisfaction scores declining?",
  "What metrics are validated vs proxy?",
  "Summarize this program for a board update.",
  "What would $500K additional funding unlock?"
];

const initialMessages: Message[] = [
  { 
    role: "assistant", 
    content: "Welcome to the Data Room. I am the Impact Analyst for Fresh House. I can help you explore validated outcomes, compare cohorts, and understand our methodology. What would you like to know?" 
  }
];

export default function AskTheData() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    
    // Analyst-style response
    const assistantMsg: Message = {
      role: "assistant",
      content: `Based on the available records, here is the assessment regarding "${text}":\n\nThe health score improvement has trended upward over the past two quarters, moving from 67 to 78. This is primarily driven by the Medically Tailored Meals program, which accounts for 42% of the overall improvement. Current evidence suggests this meets the threshold for statistical significance (p<0.05).`,
      sources: ["2025 Annual Impact Report", "Outcome Data — Q3/Q4 2025", "Methodology Document"],
      confidence: "validated",
      limitation: "This metric relies on claims data which has a 90-day lag. Recent quarters use proxy indicators for early estimates.",
      nextAction: "Review the 'Outcome Benchmarking Analysis' for a full breakdown by cohort."
    };
    
    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 h-[calc(100vh-8rem)] flex flex-col">
      <PageHeader 
        title="Ask the Data" 
        description="Query the impact analyst to explore evidence, methodology, and program performance." 
      />

      <div className="flex-1 overflow-auto space-y-4 pb-4 pr-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div className={msg.role === "user"
              ? "bg-forest text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3 max-w-lg text-sm"
              : "bg-card border border-border rounded-2xl rounded-bl-sm px-5 py-4 max-w-2xl text-sm"
            }>
              <p className="whitespace-pre-line leading-relaxed text-foreground">{msg.content}</p>
              
              {msg.role === "assistant" && (msg.sources || msg.confidence) && (
                <div className="mt-4 pt-4 border-t border-border/60 space-y-3">
                  
                  {msg.confidence && (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Confidence:</span>
                      <ConfidenceBadge level={msg.confidence} />
                    </div>
                  )}

                  {msg.limitation && (
                    <div className="flex items-start gap-2 bg-status-warning-muted/30 p-2.5 rounded-lg border border-status-warning/20">
                      <ShieldAlert className="h-4 w-4 text-status-warning shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-status-warning">Data Limitation</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{msg.limitation}</p>
                      </div>
                    </div>
                  )}
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Sources Referenced</p>
                      {msg.sources.map((s, j) => (
                        <div key={j} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <FileText className="h-3.5 w-3.5 text-forest/70" />
                          <span className="underline underline-offset-2 cursor-pointer hover:text-forest transition-colors">{s}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.nextAction && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-forest cursor-pointer hover:text-forest/80 pt-1">
                      <span>Next Action: {msg.nextAction}</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {messages.length <= 1 && (
        <div className="grid grid-cols-2 gap-3 mb-2">
          {starterPrompts.map((prompt) => (
            <button key={prompt} onClick={() => handleSend(prompt)}
              className="p-3.5 rounded-xl border border-border bg-card text-left text-sm text-foreground/90 hover:border-forest/30 hover:bg-forest/5 transition-all leading-relaxed shadow-sm">
              <Sparkles className="h-4 w-4 text-teal mb-2" />
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
          className="flex-1 bg-card border-border/60 focus-visible:ring-forest"
        />
        <Button onClick={() => handleSend(input)} size="icon" className="bg-forest hover:bg-forest/90 text-white">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
