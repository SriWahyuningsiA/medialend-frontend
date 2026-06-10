import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={{
      width: "200px",
      background: "#f97316",
      color: "white",
      padding: "20px",
      minHeight: "100vh"
    }}>
      <h2>MediaLend</h2>

      <div style={{ marginTop: "20px" }}>
        <Link to="/dashboard-mahasiswa" style={{ display: "block", marginBottom: "10px", color: "white" }}>
          Dashboard
        </Link>

        <Link to="/alat" style={{ display: "block", marginBottom: "10px", color: "white" }}>
          Daftar Alat
        </Link>

        <Link to="/pinjam" style={{ display: "block", marginBottom: "10px", color: "white" }}>
          Peminjaman
        </Link>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          style={{ marginTop: "20px", padding: "5px", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}