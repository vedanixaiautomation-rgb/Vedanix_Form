import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChatbotWidget } from "./components/ChatbotWidget";
import { CustomCursor } from "./components/CustomCursor";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { useAuth } from "./contexts/AuthContext";
import { About } from "./pages/About";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Projects } from "./pages/Projects";
import { Services } from "./pages/Services";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("vedanix_theme") || "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("vedanix_theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen aurora">
      <ScrollProgress />
      <CustomCursor />
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
