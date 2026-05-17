import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

const field = {
  width: "100%",
  border: "none",
  borderBottom: "1px solid #C45A3A",
  padding: "14px 0",
  fontFamily: "inherit",
  fontSize: "16px",
  fontWeight: 300,
  background: "transparent",
  outline: "none",
  color: "#2C1810",
};

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from ?? "/";
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (user) return (
    <main style={{ flex: 1, paddingTop: "80px", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "24px", backgroundColor: "#F0E4C8" }}>
      <p style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B89B95" }}>Signed in as</p>
      <p style={{ fontSize: "clamp(18px, 3vw, 32px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#2C1810" }}>{user.email}</p>
      <button onClick={() => supabase.auth.signOut()} style={{ backgroundColor: "#2C1810", color: "#F0E4C8", border: "none", padding: "14px 32px", fontFamily: "inherit", fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
        Sign Out
      </button>
    </main>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null); setMessage(null); setLoading(true);
    if (isSignup) {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } });
      if (error) setError(error.message);
      else setMessage("Check your email to confirm your account.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else navigate(from);
    }
    setLoading(false);
  }

  return (
    <main style={{ flex: 1, paddingTop: "80px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F0E4C8" }}>
      <div style={{ width: "100%", maxWidth: "560px", padding: "clamp(48px, 8vw, 100px) clamp(32px, 6vw, 80px)" }}>

        {/* Toggle tabs */}
        <div style={{ display: "flex", gap: "0", marginBottom: "48px", borderBottom: "1px solid #C45A3A" }}>
          <button
            onClick={() => { setIsSignup(false); setError(null); setMessage(null); }}
            style={{ flex: 1, padding: "12px", background: "none", border: "none", fontFamily: "inherit", fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", color: !isSignup ? "#D9531E" : "#B89B95", borderBottom: !isSignup ? "2px solid #D9531E" : "2px solid transparent", marginBottom: "-1px" }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsSignup(true); setError(null); setMessage(null); }}
            style={{ flex: 1, padding: "12px", background: "none", border: "none", fontFamily: "inherit", fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", color: isSignup ? "#D9531E" : "#B89B95", borderBottom: isSignup ? "2px solid #D9531E" : "2px solid transparent", marginBottom: "-1px" }}
          >
            New Here? Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {isSignup && (
            <div>
              <label style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B89B95", display: "block", marginBottom: "4px" }}>Name</label>
              <input style={field} type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
            </div>
          )}
          <div>
            <label style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B89B95", display: "block", marginBottom: "4px" }}>Email</label>
            <input style={field} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "#B89B95", display: "block", marginBottom: "4px" }}>Password</label>
            <input style={field} type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          {error && <p style={{ color: "#D9531E", fontSize: "13px", fontWeight: 400 }}>{error}</p>}
          {message && <p style={{ color: "#8A7A4E", fontSize: "13px", fontWeight: 400 }}>{message}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: "#2C1810", color: "#F0E4C8", border: "none", padding: "18px", fontFamily: "inherit", fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", marginTop: "8px", transition: "background-color 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#D9531E"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#2C1810"; }}
          >
            {loading ? "—" : isSignup ? "Create Account" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
