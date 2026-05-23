import { useState } from "react";
import { Section } from "../components/Section";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { api } from "../lib/api";

const initial = { name: "", email: "", phone: "", companyName: "", serviceRequired: "", budget: "", message: "", website: "" };

export function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("");

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setStatus("Sending...");
    try {
      await api("/contact", { method: "POST", body: form });
      setForm(initial);
      setStatus("Inquiry sent. Vedanix will reach out shortly.");
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <Section eyebrow="Contact" title="Tell us what you want to automate." text="Share your workflow, tools, budget, and target outcome. The backend stores every inquiry securely in MongoDB and can notify both you and the admin team by email.">
      <Card>
        <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
          <Input name="name" value={form.name} onChange={update} placeholder="Name" required />
          <Input name="email" type="email" value={form.email} onChange={update} placeholder="Email" required />
          <Input name="phone" value={form.phone} onChange={update} placeholder="Phone" required />
          <Input name="companyName" value={form.companyName} onChange={update} placeholder="Company Name" />
          <Input as="select" name="serviceRequired" value={form.serviceRequired} onChange={update} required>
            <option value="">Service Required</option>
            <option>AI Automation</option>
            <option>Chatbot Development</option>
            <option>Workflow Automation</option>
            <option>AI Integrations</option>
            <option>Web Development</option>
            <option>SaaS Solutions</option>
            <option>API Automation</option>
          </Input>
          <Input name="budget" value={form.budget} onChange={update} placeholder="Budget" />
          <Input className="hidden" name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" />
          <Input as="textarea" name="message" value={form.message} onChange={update} placeholder="Message" required className="min-h-36 md:col-span-2" />
          <div className="flex items-center gap-4 md:col-span-2">
            <Button>Send Inquiry</Button>
            {status && <p className="text-sm text-cyan-200">{status}</p>}
          </div>
        </form>
      </Card>
    </Section>
  );
}
