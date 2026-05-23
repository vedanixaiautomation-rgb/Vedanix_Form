import { BarChart3, Edit3, FileText, FolderKanban, Inbox, LogOut, Plus, Trash2, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../lib/api";

const emptyProject = { title: "", category: "", summary: "", liveUrl: "", tags: "" };
const emptyPost = { title: "", category: "", excerpt: "", content: "", tags: "" };

function Stat({ icon: Icon, label, value }) {
  return (
    <Card>
      <Icon className="mb-4 text-cyan-200" />
      <div className="text-3xl font-black">{value ?? 0}</div>
      <div className="text-sm text-slate-400">{label}</div>
    </Card>
  );
}

export function AdminDashboard() {
  const { logout, user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [postForm, setPostForm] = useState(emptyPost);
  const [status, setStatus] = useState("");

  async function load() {
    try {
      const [dash, inquiryData, userData, projectData, postData] = await Promise.all([
        api("/dashboard"),
        api("/contact"),
        api("/users"),
        api("/projects"),
        api("/blog")
      ]);
      setDashboard(dash);
      setInquiries(inquiryData);
      setUsers(userData);
      setProjects(projectData);
      setPosts(postData);
    } catch (error) {
      setStatus(error.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(path, id) {
    await api(`${path}/${id}`, { method: "DELETE" });
    await load();
  }

  async function updateInquiry(id, statusValue) {
    await api(`/contact/${id}`, { method: "PATCH", body: { status: statusValue } });
    await load();
  }

  async function createProject(event) {
    event.preventDefault();
    await api("/projects", {
      method: "POST",
      body: { ...projectForm, tags: projectForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean) }
    });
    setProjectForm(emptyProject);
    await load();
  }

  async function createPost(event) {
    event.preventDefault();
    await api("/blog", {
      method: "POST",
      body: { ...postForm, tags: postForm.tags.split(",").map((tag) => tag.trim()).filter(Boolean), content: postForm.content || postForm.excerpt }
    });
    setPostForm(emptyPost);
    await load();
  }

  const cards = dashboard?.cards || {};

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-cyan-200">Admin Dashboard</p>
            <h1 className="text-4xl font-black">Vedanix command center</h1>
            <p className="mt-2 text-slate-400">Signed in as {user?.email}</p>
          </div>
          <Button variant="outline" onClick={logout}><LogOut size={16} /> Logout</Button>
        </div>

        {status && <Card className="mb-6 border-rose-300/40 text-rose-100">{status}</Card>}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Stat icon={Inbox} label="Inquiries" value={cards.inquiries} />
          <Stat icon={Users} label="Users" value={cards.users} />
          <Stat icon={FolderKanban} label="Projects" value={cards.projects} />
          <Stat icon={FileText} label="Posts" value={cards.posts} />
          <Stat icon={BarChart3} label="Subscribers" value={cards.subscribers} />
        </div>

        <Card className="mt-6">
          <h2 className="mb-4 text-xl font-black">Inquiry analytics</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboard?.chart || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(125,249,255,.15)" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(125,249,255,.25)" }} />
                <Bar dataKey="inquiries" fill="#22d3ee" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          <Card>
            <h2 className="mb-4 text-xl font-black">Form submissions</h2>
            <div className="space-y-3">
              {inquiries.map((item) => (
                <div key={item._id} className="rounded-lg border border-cyan-200/10 bg-white/5 p-4">
                  <div className="flex flex-col justify-between gap-3 md:flex-row">
                    <div>
                      <div className="font-bold">{item.name} · {item.companyName || "No company"}</div>
                      <div className="text-sm text-slate-400">{item.email} · {item.phone}</div>
                      <p className="mt-2 text-sm text-slate-300">{item.message}</p>
                    </div>
                    <div className="flex h-fit gap-2">
                      <Input as="select" value={item.status} onChange={(event) => updateInquiry(item._id, event.target.value)} className="min-h-10">
                        <option>new</option><option>contacted</option><option>qualified</option><option>closed</option>
                      </Input>
                      <Button variant="danger" className="h-10 w-10 px-0" onClick={() => remove("/contact", item._id)}><Trash2 size={15} /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><Plus size={18} /> Add project</h2>
              <form onSubmit={createProject} className="space-y-3">
                {["title", "category", "summary", "liveUrl", "tags"].map((field) => (
                  <Input key={field} placeholder={field} value={projectForm[field]} onChange={(e) => setProjectForm({ ...projectForm, [field]: e.target.value })} required={["title", "category", "summary"].includes(field)} />
                ))}
                <Button className="w-full">Create Project</Button>
              </form>
            </Card>

            <Card>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-black"><Edit3 size={18} /> Add blog post</h2>
              <form onSubmit={createPost} className="space-y-3">
                <Input placeholder="title" value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} required />
                <Input placeholder="category" value={postForm.category} onChange={(e) => setPostForm({ ...postForm, category: e.target.value })} required />
                <Input placeholder="excerpt" value={postForm.excerpt} onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })} required />
                <Input as="textarea" className="rich-editor" placeholder="rich text HTML content" value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} />
                <Input placeholder="tags, comma separated" value={postForm.tags} onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })} />
                <Button className="w-full">Publish Post</Button>
              </form>
            </Card>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="mb-4 text-xl font-black">Manage projects</h2>
            <div className="space-y-2">{projects.map((item) => <div key={item._id} className="flex items-center justify-between rounded-lg bg-white/5 p-3"><span>{item.title}</span><Button variant="danger" className="h-9 w-9 px-0" onClick={() => remove("/projects", item._id)}><Trash2 size={14} /></Button></div>)}</div>
          </Card>
          <Card>
            <h2 className="mb-4 text-xl font-black">Manage users & posts</h2>
            <div className="space-y-2">{users.map((item) => <div key={item._id} className="flex items-center justify-between rounded-lg bg-white/5 p-3"><span>{item.email}</span><span className="text-xs text-cyan-200">{item.role}</span></div>)}</div>
            <div className="mt-4 space-y-2">{posts.map((item) => <div key={item._id} className="flex items-center justify-between rounded-lg bg-white/5 p-3"><span>{item.title}</span><Button variant="danger" className="h-9 w-9 px-0" onClick={() => remove("/blog", item._id)}><Trash2 size={14} /></Button></div>)}</div>
          </Card>
        </div>
      </div>
    </section>
  );
}
