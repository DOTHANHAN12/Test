import { useState } from "react";

const API = "http://localhost:8080/api/users";

export default function App() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [form, setForm]       = useState({ email: "", fullName: "", phoneNumber: "" });
  const [adding, setAdding]   = useState(false);

  // ── Lấy danh sách user từ DB ──────────────────────────────────────────────
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      setError("❌ Không kết nối được backend: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Thêm user mới ─────────────────────────────────────────────────────────
  const addUser = async () => {
    if (!form.email || !form.fullName) {
      setError("⚠️ Email và Họ tên là bắt buộc.");
      return;
    }
    setAdding(true);
    setError("");
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setForm({ email: "", fullName: "", phoneNumber: "" });
      await fetchUsers(); // refresh list
    } catch (e) {
      setError("❌ Thêm user thất bại: " + e.message);
    } finally {
      setAdding(false);
    }
  };

  // ── UI ───────────────────────────────────────────────────────────────────
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🛒 SLife – Smoke Test</h1>
        <p style={styles.sub}>Kiểm tra kết nối <b>React → Spring Boot → MySQL</b></p>

        {/* ── Fetch button ─────────────────────────────────────────── */}
        <button style={styles.btnPrimary} onClick={fetchUsers} disabled={loading}>
          {loading ? "⏳ Đang tải..." : "📥 Lấy danh sách User từ DB"}
        </button>

        {/* ── Error ────────────────────────────────────────────────── */}
        {error && <div style={styles.error}>{error}</div>}

        {/* ── User table ───────────────────────────────────────────── */}
        {users.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Họ tên</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>SĐT</th>
                <th style={styles.th}>Role</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>⭐ Score</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.userId} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                  <td style={styles.td}>{u.userId}</td>
                  <td style={styles.td}>{u.fullName}</td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>{u.phoneNumber ?? "—"}</td>
                  <td style={styles.td}>
                    <span style={u.role === "ADMIN" ? styles.badgeAdmin : styles.badgeUser}>
                      {u.role}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={u.status === "ACTIVE" ? styles.badgeActive : styles.badgeRestrict}>
                      {u.status}
                    </span>
                  </td>
                  <td style={styles.td}>{u.reputationScore?.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ── Divider ──────────────────────────────────────────────── */}
        <hr style={styles.hr} />

        {/* ── Add user form ─────────────────────────────────────────── */}
        <h3 style={styles.sectionTitle}>➕ Thêm User mới vào DB</h3>
        <div style={styles.form}>
          <input style={styles.input} placeholder="Email *"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          <input style={styles.input} placeholder="Họ tên *"
            value={form.fullName}
            onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
          <input style={styles.input} placeholder="Số điện thoại"
            value={form.phoneNumber}
            onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))} />
          <button style={styles.btnGreen} onClick={addUser} disabled={adding}>
            {adding ? "⏳ Đang lưu..." : "💾 Lưu vào DB"}
          </button>
        </div>

        <p style={styles.hint}>
          ✅ Nếu bảng hiện ra → <b>FE ↔ BE ↔ DB</b> đều thông!
        </p>
      </div>
    </div>
  );
}

// ── Inline styles ─────────────────────────────────────────────────────────────
const styles = {
  page:          { minHeight: "100vh", background: "#f0f4f8", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 16px", fontFamily: "Arial, sans-serif" },
  card:          { background: "#fff", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,.1)", padding: 32, width: "100%", maxWidth: 900 },
  title:         { margin: 0, fontSize: 26, color: "#1F497D" },
  sub:           { color: "#555", marginBottom: 20 },
  btnPrimary:    { background: "#1F497D", color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontSize: 15, cursor: "pointer", marginBottom: 16 },
  btnGreen:      { background: "#27ae60", color: "#fff", border: "none", borderRadius: 8, padding: "10px 22px", fontSize: 15, cursor: "pointer", alignSelf: "flex-start" },
  error:         { background: "#fdecea", color: "#c0392b", padding: "10px 14px", borderRadius: 8, marginBottom: 16, fontSize: 14 },
  table:         { width: "100%", borderCollapse: "collapse", marginTop: 12, fontSize: 14 },
  thead:         { },
  th:            { background: "#1F497D", color: "#fff", padding: "10px 12px", textAlign: "left", fontWeight: 600 },
  trEven:        { background: "#f8fbff" },
  trOdd:         { background: "#fff" },
  td:            { padding: "9px 12px", borderBottom: "1px solid #e8e8e8" },
  badgeAdmin:    { background: "#e74c3c", color: "#fff", borderRadius: 4, padding: "2px 8px", fontSize: 12 },
  badgeUser:     { background: "#3498db", color: "#fff", borderRadius: 4, padding: "2px 8px", fontSize: 12 },
  badgeActive:   { background: "#27ae60", color: "#fff", borderRadius: 4, padding: "2px 8px", fontSize: 12 },
  badgeRestrict: { background: "#e67e22", color: "#fff", borderRadius: 4, padding: "2px 8px", fontSize: 12 },
  hr:            { border: "none", borderTop: "1px solid #e8e8e8", margin: "24px 0" },
  sectionTitle:  { margin: "0 0 14px", color: "#2E74B5" },
  form:          { display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 },
  input:         { border: "1px solid #ccc", borderRadius: 8, padding: "9px 13px", fontSize: 14, outline: "none" },
  hint:          { marginTop: 20, color: "#27ae60", fontWeight: 600 },
};
