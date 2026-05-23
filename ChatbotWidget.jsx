import { Bot, Send, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "bot", text: "Hi, I am the Vedanix AI concierge. What would you like to automate?" }]);
  const [input, setInput] = useState("");

  function send(event) {
    event.preventDefault();
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((items) => [
      ...items,
      { role: "user", text: userMessage },
      { role: "bot", text: "Great. Share your current tools, workflow, and target outcome through the contact form, and our team can map the automation path." }
    ]);
    setInput("");
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-[min(360px,calc(100vw-40px))] rounded-lg border border-cyan-200/20 bg-slate-950/95 p-4 shadow-glow">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold"><Bot size={18} /> Vedanix AI</div>
            <button onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button>
          </div>
          <div className="mb-3 max-h-72 space-y-2 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`rounded-lg px-3 py-2 text-sm ${message.role === "user" ? "ml-8 bg-cyan-300 text-slate-950" : "mr-8 bg-white/10"}`}>{message.text}</div>
            ))}
          </div>
          <form onSubmit={send} className="flex gap-2">
            <Input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about automation..." />
            <Button className="w-12 px-0"><Send size={16} /></Button>
          </form>
        </div>
      )}
      <Button className="h-14 w-14 rounded-full px-0" onClick={() => setOpen(!open)} aria-label="Open chatbot"><Bot /></Button>
    </div>
  );
}
