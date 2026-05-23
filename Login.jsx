import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Section } from "../components/Section";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../lib/api";

export function Login() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("");

  async function submit(event) {
    event.preventDefault();
    setStatus("Working...");
    try {
      const user = mode === "login" ? await login(form.email, form.password) : await signup(form);
      navigate(user.role === "admin" ? "/dashboard" : "/");
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function forgot() {
    if (!form.email) return setStatus("Enter your email first.");
    await api("/auth/forgot-password", { method: "POST", body: { email: form.email } });
    setStatus("Reset email sent if the account exists.");
  }

  return (
    <Section eyebrow="Secure Access" title={mode === "login" ? "Admin login" : "Create account"}>
      <Card className="mx-auto max-w-md">
        <form onSubmit={submit} className="space-y-4">
          {mode === "signup" && <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />}
          <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <Button className="w-full">{mode === "login" ? "Login" : "Sign Up"}</Button>
        </form>
        <div className="mt-4 flex justify-between text-sm text-cyan-200">
          <button onClick={() => setMode(mode === "login" ? "signup" : "login")}>{mode === "login" ? "Create account" : "Use login"}</button>
          <button onClick={forgot}>Forgot password</button>
        </div>
        {status && <p className="mt-4 text-sm text-slate-300">{status}</p>}
        <Link to="/" className="mt-5 block text-sm text-slate-400">Back to website</Link>
      </Card>
    </Section>
  );
}
