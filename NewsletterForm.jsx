import { Send } from "lucide-react";
import { useState } from "react";
import { api } from "../lib/api";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function submit(event) {
    event.preventDefault();
    setStatus("Subscribing...");
    try {
      await api("/newsletter", { method: "POST", body: { email } });
      setEmail("");
      setStatus("Subscribed.");
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex gap-2">
        <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" required />
        <Button className="w-12 px-0" aria-label="Subscribe"><Send size={16} /></Button>
      </div>
      {status && <p className="text-xs text-cyan-200">{status}</p>}
    </form>
  );
}
