import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (email === "admin@nexgile.com" && password === "admin123") {
        onLogin({ role: "Admin", name: "Arjun Mehta", email });
      } else if (email === "jane@customer.com" && password === "customer123") {
        onLogin({ role: "Customer", name: "Jane Smith", email });
      } else {
        setError("Invalid credentials. Please check email and password.");
      }
      setLoading(false);
    }, 900);
  };

  return (
    <div style={s.root}>
      {/* Left panel */}
      <div style={s.left}>
        <div style={s.leftInner}>
          <div style={s.logoRow}>
            <div style={s.logoBox}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="12" height="12" rx="3" fill="#fff"/>
                <rect x="16" width="12" height="12" rx="3" fill="rgba(255,255,255,0.6)"/>
                <rect y="16" width="12" height="12" rx="3" fill="rgba(255,255,255,0.6)"/>
                <rect x="16" y="16" width="12" height="12" rx="3" fill="rgba(255,255,255,0.3)"/>
              </svg>
            </div>
            <div>
              <div style={s.logoName}>Nexgile</div>
              <div style={s.logoSub}>FactoryIQ Portal</div>
            </div>
          </div>

          <div style={s.heroText}>
            Manufacturing<br />
            <span style={s.heroAccent}>Excellence,</span><br />
            Simplified.
          </div>

          <div style={s.featureList}>
            {[
              ["⊞", "End-to-end program visibility"],
              ["⚙", "Real-time production tracking"],
              ["✓", "Quality & compliance management"],
              ["◎", "Analytics & smart reporting"],
            ].map(([icon, text]) => (
              <div key={text} style={s.featureItem}>
                <div style={s.featureIcon}>{icon}</div>
                <span style={s.featureText}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={s.leftBg} />
      </div>

      {/* Right panel */}
      <div style={s.right}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <h1 style={s.cardTitle}>Welcome back</h1>
            <p style={s.cardSub}>Sign in to your portal account</p>
          </div>

          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.field}>
              <label style={s.label}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={s.input}
                placeholder="you@nexgile.com"
                required
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={s.input}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div style={s.errorBox}>
                <span style={s.errorIcon}>⚠</span> {error}
              </div>
            )}

            <button type="submit" style={s.btn} disabled={loading}>
              {loading ? (
                <span style={s.btnLoading}>
                  <span style={s.spinner} /> Signing in...
                </span>
              ) : "Sign in →"}
            </button>
          </form>

          <div style={s.demoBox}>
            <div style={s.demoTitle}>Demo Credentials</div>
            <div style={s.demoGrid}>
              <div style={s.demoItem}>
                <div style={s.demoRole}>Admin</div>
                <div style={s.demoCred}>admin@nexgile.com</div>
                <div style={s.demoCred}>admin123</div>
              </div>
              <div style={s.demoDivider} />
              <div style={s.demoItem}>
                <div style={s.demoRole}>Customer</div>
                <div style={s.demoCred}>jane@customer.com</div>
                <div style={s.demoCred}>customer123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const s = {
  root: { display: "flex", height: "100vh", fontFamily: "var(--font)" },
  left: {
    flex: "0 0 480px", background: "linear-gradient(145deg, #1D40AF 0%, #2563EB 50%, #0EA5E9 100%)",
    display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden",
  },
  leftBg: {
    position: "absolute", inset: 0, opacity: 0.08,
    backgroundImage: "radial-gradient(circle at 20% 80%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  },
  leftInner: { position: "relative", zIndex: 1, padding: "48px", width: "100%" },
  logoRow: { display: "flex", alignItems: "center", gap: 14, marginBottom: 56 },
  logoBox: { width: 48, height: 48, background: "rgba(255,255,255,0.2)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" },
  logoName: { color: "#fff", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" },
  logoSub: { color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 1 },
  heroText: { color: "#fff", fontSize: 40, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-1px", marginBottom: 40 },
  heroAccent: { color: "#7DD3FC" },
  featureList: { display: "flex", flexDirection: "column", gap: 16 },
  featureItem: { display: "flex", alignItems: "center", gap: 12 },
  featureIcon: { width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16 },
  featureText: { color: "rgba(255,255,255,0.85)", fontSize: 15, fontWeight: 500 },
  right: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: 24 },
  card: { width: "100%", maxWidth: 440, background: "var(--surface)", borderRadius: "var(--radius-xl)", padding: "40px 40px", boxShadow: "var(--shadow-lg)", border: "1px solid var(--border)" },
  cardHeader: { marginBottom: 32 },
  cardTitle: { fontSize: 28, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.5px" },
  cardSub: { fontSize: 15, color: "var(--text-secondary)", marginTop: 6 },
  form: { display: "flex", flexDirection: "column", gap: 20 },
  field: { display: "flex", flexDirection: "column", gap: 7 },
  label: { fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" },
  input: {
    padding: "11px 14px", border: "1.5px solid var(--border)", borderRadius: "var(--radius-sm)",
    fontSize: 14, color: "var(--text-primary)", background: "var(--surface)", transition: "all 0.15s",
  },
  errorBox: { background: "var(--red-light)", border: "1px solid var(--red-mid)", borderRadius: "var(--radius-sm)", padding: "10px 14px", color: "var(--red)", fontSize: 13, display: "flex", alignItems: "center", gap: 8 },
  errorIcon: { fontSize: 15 },
  btn: {
    padding: "13px", background: "var(--blue)", color: "#fff", border: "none",
    borderRadius: "var(--radius-sm)", fontSize: 15, fontWeight: 700, cursor: "pointer",
    transition: "all 0.15s", boxShadow: "0 4px 12px rgba(37,99,235,0.35)",
    marginTop: 4,
  },
  btnLoading: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8 },
  spinner: {
    width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff",
    borderRadius: "50%", display: "inline-block",
    animation: "spin 0.8s linear infinite",
  },
  demoBox: { marginTop: 28, background: "var(--surface2)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", padding: "16px 18px" },
  demoTitle: { fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 },
  demoGrid: { display: "flex", gap: 16, alignItems: "center" },
  demoItem: { flex: 1 },
  demoDivider: { width: 1, height: 36, background: "var(--border)" },
  demoRole: { fontSize: 12, fontWeight: 700, color: "var(--blue)", marginBottom: 4 },
  demoCred: { fontSize: 12, color: "var(--text-secondary)", fontFamily: "var(--font-mono)" },
};

export default Login;
