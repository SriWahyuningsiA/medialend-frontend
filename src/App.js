import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

/* ================= PAGES ================= */

import Login from "./pages/Login";
import DashboardMahasiswa from "./pages/DashboardMahasiswa";
import DashboardAdmin from "./pages/DashboardAdmin";
import DaftarAlat from "./pages/DaftarAlat";
import Peminjaman from "./pages/Peminjaman";
import Riwayat from "./pages/Riwayat";
import ManajemenAlat from "./pages/ManajemenAlat";
import Pengajuan from "./pages/Pengajuan";
import Pengembalian from "./pages/Pengembalian";
import RiwayatAdmin from "./pages/RiwayatAdmin";
import Mahasiswa from "./pages/Mahasiswa";
import ProfileMahasiswa from "./pages/ProfileMahasiswa";

/* ================= PROTECTED ROUTE ================= */

function ProtectedRoute({
  children,
  role,
}) {

  const token = localStorage.getItem("token");

  const userRole = localStorage.getItem("role");

  /* BELUM LOGIN */

  if (!token) {
    return <Navigate to="/" />;
  }

  /* ROLE TIDAK SESUAI */

  if (
    role &&
    userRole !== role
  ) {
    return <Navigate to="/" />;
  }

  return children;
}

/* ================= APP ================= */

function App() {

  return (
    <Router>

      <Routes>

        {/* ================= LOGIN ================= */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* ================= MAHASISWA ================= */}

        <Route
          path="/dashboard-mahasiswa"
          element={
            <ProtectedRoute role="mahasiswa">
              <DashboardMahasiswa />
            </ProtectedRoute>
          }
        />

        <Route
          path="/alat"
          element={
            <ProtectedRoute role="mahasiswa">
              <DaftarAlat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/peminjaman"
          element={
            <ProtectedRoute role="mahasiswa">
              <Peminjaman />
            </ProtectedRoute>
          }
        />

        <Route
          path="/riwayat"
          element={
            <ProtectedRoute role="mahasiswa">
              <Riwayat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile-mahasiswa"
          element={
            <ProtectedRoute role="mahasiswa">
              <ProfileMahasiswa />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/dashboard-admin"
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manajemen-alat"
          element={
            <ProtectedRoute role="admin">
              <ManajemenAlat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pengajuan"
          element={
            <ProtectedRoute role="admin">
              <Pengajuan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pengembalian"
          element={
            <ProtectedRoute role="admin">
              <Pengembalian />
            </ProtectedRoute>
          }
        />

        <Route
          path="/riwayat-admin"
          element={
            <ProtectedRoute role="admin">
              <RiwayatAdmin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mahasiswa"
          element={
            <ProtectedRoute role="admin">
              <Mahasiswa />
            </ProtectedRoute>
          }
        />

      </Routes>

    </Router>
  );
}

export default App;