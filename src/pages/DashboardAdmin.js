import { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import axios from "axios";
import { API_URL } from "../config";
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
  FiTrendingUp,
  FiActivity,
  FiBarChart2,
} from "react-icons/fi";

export default function DashboardAdmin() {

  const navigate = useNavigate();

  const location = useLocation();

  const [alat, setAlat] = useState([]);

  const [riwayat, setRiwayat] = useState([]);

  const token = localStorage.getItem("token");

  const admin =
    localStorage.getItem("username");

  /* ================= PROTECT ================= */

  useEffect(() => {

    const role =
      localStorage.getItem("role");

    if (!token || role !== "admin") {

      navigate("/", {
        replace: true,
      });

    }

  }, [navigate, token]);

  /* ================= FETCH ================= */
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    if (token) {
      fetchData();
    }

  }, []);

  const fetchData = async () => {

    try {

      const resAlat =
        await axios.get(
          `${API_URL}/api/alat`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const resRiwayat =
        await axios.get(
        `${API_URL}/api/peminjaman`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setAlat(resAlat.data);

      setRiwayat(resRiwayat.data);

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

  /* ================= DATA ================= */

  const dipinjam =
    riwayat.filter(
      (r) =>
        r.status === "dipinjam"
    ).length;

  const dikembalikan =
    riwayat.filter(
      (r) =>
        r.status === "dikembalikan"
    ).length;

  const progress =
    alat.length > 0
      ? (dipinjam / alat.length) * 100
      : 0;

  return (
    <div className="flex h-screen overflow-hidden">

      {/* BACKGROUND */}

      <div
        className="absolute inset-0 bg-[length:90%] bg-center bg-no-repeat"
        style={{
          backgroundImage:
            `url(${kampus})`,
        }}
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-orange-700/40 to-black/80" />

      {/* ================= SIDEBAR ================= */}

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
          className="flex-1 overflow-y-auto px-4 py-2 space-y-2"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor:
              "rgba(251,146,60,0.35) transparent",
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

      {/* ================= CONTENT ================= */}

      <div className="relative flex-1 p-6 flex flex-col gap-3 text-white overflow-hidden">

        {/* HEADER */}

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-5 rounded-2xl flex justify-between items-center">

          <div>

            <h1 className="text-lg font-semibold">
              Selamat datang, Admin
            </h1>

            <p className="text-xs text-white/70">
              Sistem pengelolaan peminjaman multimedia kampus
            </p>

          </div>

          <span className="text-xs text-green-400">
            ● Sistem Aktif
          </span>

        </div>

        {/* CARD */}

        <div className="grid grid-cols-4 gap-3">

          <Card
            title="Total Alat"
            value={alat.length}
            icon={<FiBarChart2 />}
          />

          <Card
            title="Peminjaman"
            value={riwayat.length}
            icon={<FiActivity />}
          />

          <Card
            title="Dipinjam"
            value={dipinjam}
            icon={<FiTrendingUp />}
          />

          <Card
            title="Dikembalikan"
            value={dikembalikan}
            icon={<FiRotateCcw />}
          />

        </div>

        {/* PROGRESS */}

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-3 rounded-2xl">

          <p className="text-xs text-white/60 mb-1">
            Penggunaan Alat Multimedia
          </p>

          <div className="w-full bg-white/10 h-2 rounded-full">

            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="text-[10px] text-white/50 mt-1">
            {dipinjam} alat sedang digunakan
          </p>

        </div>

        {/* BUTTON */}

        <div className="flex gap-3">

          <button
            onClick={() =>
              navigate("/manajemen-alat")
            }
            className="bg-orange-500 px-4 py-2 rounded-xl text-sm hover:scale-105 transition"
          >
            Kelola Alat
          </button>

          <button
            onClick={() =>
              navigate("/pengajuan")
            }
            className="bg-white/20 border border-white/20 px-4 py-2 rounded-xl text-sm hover:bg-white/30 transition"
          >
            Lihat Pengajuan
          </button>

        </div>

        {/* RIWAYAT */}

        <div className="flex-1 bg-white/20 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex flex-col overflow-hidden">

          <h2 className="text-sm text-orange-200 mb-2">
            Aktivitas Peminjaman
          </h2>

          <div
            className="flex-1 overflow-y-auto pr-1"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor:
                "rgba(251,146,60,0.35) transparent",
            }}
          >
            {riwayat.length === 0 ? (

              <div className="flex items-center justify-center h-full text-center text-white/60">

                <div>

                  <p className="text-sm">
                    Belum ada aktivitas peminjaman
                  </p>

                  <p className="text-xs text-white/40">
                    Data transaksi peminjaman akan tampil di sini
                  </p>

                </div>

              </div>

            ) : (

              <table className="w-full text-xs">

                <tbody>

                  {riwayat.map((item, i) => (

                    <tr key={i}>

                      <td className="py-2">
                        {item.Alat?.nama_alat || "-"}
                      </td>

                      <td>

                        <span
                          className={`px-2 py-1 rounded text-[10px]
                          ${
                            item.status === "pending"
                            ? "bg-yellow-500 text-black"
                            : item.status === "dipinjam"
                            ? "bg-orange-500 text-white"
                            : item.status === "ditolak"
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {item.status}
                      </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

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

/* ================= CARD ================= */

function Card({
  title,
  value,
  icon,
}) {

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-3 rounded-2xl hover:scale-105 hover:bg-white/30 transition">

      <div className="flex justify-between text-xs text-white/60">

        {title}

        {icon}

      </div>

      <p className="text-xl font-bold mt-1">
        {value}
      </p>

    </div>
  );
}