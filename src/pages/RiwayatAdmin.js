import { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import axios from "axios";
import kampus from "../assets/kampus.jpeg";


import {
  FiHome,
  FiBox,
  FiClipboard,
  FiRotateCcw,
  FiClock,
  FiUsers,
  FiLogOut,
  FiUser,
  FiArchive,
} from "react-icons/fi";

export default function RiwayatAdmin() {

  const navigate = useNavigate();
  const location = useLocation();
  
  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("username");

  const [riwayat, setRiwayat] = useState([]);

  /* ================= PROTECT ================= */

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (!token) return;

    if (role !== "admin") {

      navigate("/", {
        replace: true,
      });

    }

  }, [navigate, token]);

    useEffect(() => {

    const sidebar =
      document.getElementById(
        "sidebar-menu"
      );

    const savedScroll =
      sessionStorage.getItem(
        "sidebarScroll"
      );

    if (
      sidebar &&
      savedScroll
    ) {

      sidebar.scrollTop =
        parseInt(savedScroll);

    }

  }, []);

  /* ================= FETCH ================= */

  useEffect(() => {

    if (!token) return;

    fetchRiwayat();

  }, [token]);

  const fetchRiwayat = async () => {

    try {

      const res = await axios.get(
        "http://localhost:3000/api/peminjaman",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRiwayat(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    localStorage.clear();

    navigate("/", {
      replace: true,
    });

  };

  if (!token) return null;

  return (
    <div className="flex h-screen overflow-hidden">

      {/* BACKGROUND */}

      <div
        className="absolute inset-0 bg-[length:90%] bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${kampus})`,
        }}
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-orange-700/40 to-black/80" />

      {/* SIDEBAR */}

      <div className="relative w-72 h-screen flex flex-col backdrop-blur-xl bg-gradient-to-b from-orange-600/40 via-orange-500/30 to-orange-800/40 border-r border-orange-300/30 text-white">

        {/* LOGO */}

        <div className="p-6 border-b border-orange-200/20">

          <h1 className="text-2xl font-bold">
            Media
            <span className="text-orange-300">
              Lend
            </span>
          </h1>

          <p className="text-xs text-white/70">
            Dashboard Admin
          </p>

        </div>

        {/* PROFILE */}

        <div className="m-4 p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 flex items-center gap-3">

          <FiUser className="text-orange-200 text-lg" />

          <div>

            <p className="text-sm font-semibold">
              {admin || "Administrator"}
            </p>

            <p className="text-xs text-orange-200">
              Administrator
            </p>

          </div>

        </div>

        {/* MENU */}

        <div
          id="sidebar-menu"
          className="flex-1 overflow-y-auto px-4 py-2 space-y-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor:
              "rgba(251,146,60,0.35) transparent",
          }}
          onScroll={(e) => {

            sessionStorage.setItem(
              "sidebarScroll",
              e.target.scrollTop
            );

          }}
        >

          <SidebarItem
          icon={<FiHome />}
          label="Dashboard"
          active={
            location.pathname === "/dashboard-admin"
          }
          onClick={() =>
            navigate("/dashboard-admin")
          }
        />

        <SidebarItem
          icon={<FiBox />}
          label="Manajemen Alat"
          active={
            location.pathname === "/manajemen-alat"
          }
          onClick={() =>
            navigate("/manajemen-alat")
          }
        />

        <SidebarItem
          icon={<FiClipboard />}
          label="Pengajuan"
          active={
            location.pathname === "/pengajuan"
          }
          onClick={() =>
            navigate("/pengajuan")
          }
        />

        <SidebarItem
          icon={<FiRotateCcw />}
          label="Pengembalian"
          active={
            location.pathname === "/pengembalian"
          }
          onClick={() =>
            navigate("/pengembalian")
          }
        />

        <SidebarItem
          icon={<FiClock />}
          label="Riwayat"
          active={
            location.pathname === "/riwayat-admin"
          }
          onClick={() =>
            navigate("/riwayat-admin")
          }
        />

        <SidebarItem
          icon={<FiUsers />}
          label="Data Mahasiswa"
          active={
            location.pathname === "/mahasiswa"
          }
          onClick={() =>
            navigate("/mahasiswa")
          }
        />

      </div>

      {/* LOGOUT */}

      <div className="p-4 border-t border-white/10">

        <button
          onClick={handleLogout}
          className="w-full bg-orange-500 hover:bg-orange-600 transition flex items-center justify-center gap-2 p-3 rounded-xl font-semibold"
        >

          <FiLogOut />

          Logout

          </button>

        </div>

      </div>

      {/* CONTENT */}

      <div className="relative flex-1 p-6 flex flex-col text-white overflow-hidden">

        {/* HEADER */}

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-5 rounded-2xl flex justify-between items-center mb-4">

          <div>

            <h1 className="text-xl font-bold flex items-center gap-2">

              <FiArchive />

              Riwayat Peminjaman

            </h1>

            <p className="text-sm text-white/60 mt-1">
              Semua aktivitas peminjaman mahasiswa
            </p>

          </div>

          <div className="bg-orange-500/20 border border-orange-300/30 px-4 py-2 rounded-xl text-sm text-orange-200">

            Total :
            {" "}
            {riwayat.length}

          </div>

        </div>

        {/* TABLE */}

        <div className="flex-1 bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden flex flex-col">

          {/* TABLE HEADER */}

          <div className="grid grid-cols-5 text-white/60 text-sm font-semibold px-6 py-4 border-b border-white/10 bg-white/10">

            <div>Mahasiswa</div>
            <div>NIM</div>
            <div>Nama Alat</div>
            <div>Status</div>
            <div>Tanggal</div>

          </div>

          {/* TABLE BODY */}

          <div className="flex-1 overflow-y-auto">

            {riwayat.length === 0 ? (

              <div className="h-full flex items-center justify-center text-white/50">

                Belum ada data riwayat

              </div>

            ) : (

              riwayat.map((item, i) => (

                <div
                  key={i}
                  className="grid grid-cols-5 px-6 py-4 border-b border-white/5 hover:bg-white/5 transition text-sm"
                >

                  <div>
                    {item.Mahasiswa?.nama || "-"}
                  </div>

                  <div>
                    {item.Mahasiswa?.nim || "-"}
                  </div>

                  <div>
                    {item.Alat?.nama_alat || "-"}
                  </div>

                  <div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        item.status === "pending"
                          ? "bg-yellow-500 text-black"
                          : item.status === "dipinjam"
                          ? "bg-orange-500"
                          : item.status === "ditolak"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                    >

                      {item.status}

                    </span>

                  </div>

                  <div className="text-white/60">

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString(
                      "id-ID"
                    )}

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

/* ================= SIDEBAR ================= */

function SidebarItem({
  icon,
  label,
  active,
  onClick,
}) {

  return (
    <div
      onClick={onClick}
      className={`flex gap-3 p-3 rounded-xl cursor-pointer transition hover:bg-white/10 ${
        active
          ? "bg-orange-500 text-white shadow-lg"
          : ""
      }`}
    >

      {icon}

      {label}

    </div>
  );
}