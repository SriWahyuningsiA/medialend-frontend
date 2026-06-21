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

  useEffect(() => {
  const sidebar =
    document.getElementById("sidebar-menu");

  const savedScroll =
    sessionStorage.getItem("sidebarScroll");

  if (sidebar && savedScroll) {
    sidebar.scrollTop =
      parseInt(savedScroll);
  }
  }, []);


  /* ================= TAMBAHAN  ================= */

  useEffect(() => {

  const menu = document.getElementById(
    "mobile-menu-scroll"
  );

  const savedScroll =
    sessionStorage.getItem(
      "mobileMenuScroll"
    );

  if (menu && savedScroll) {
    menu.scrollLeft = parseInt(savedScroll);
  }

}, []);

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
    <div
      className="
        relative
        flex
        flex-col
        lg:flex-row
        min-h-screen
        w-full
        overflow-x-hidden
      "
    >

      {/* BACKGROUND */}

      <div
        className="
          fixed
          inset-0
          bg-center
          bg-no-repeat
          bg-cover
        "
        style={{
          backgroundImage:
            `url(${kampus})`,
        }}
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-orange-700/40 to-black/80" />

      {/* ================= SIDEBAR ================= */}

      <div className="hidden lg:flex relative w-72 h-screen flex-col backdrop-blur-xl bg-gradient-to-b from-orange-600/40 via-orange-500/30 to-orange-800/40 border-r border-orange-300/30 text-white">

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

    {/* MOBILE ONLY */}

  <div className="lg:hidden relative z-20 p-4 w-full">

    <div
      className="
        w-full
        rounded-3xl
        bg-gradient-to-br
        from-orange-700/40
        via-orange-600/20
        to-orange-900/40
        backdrop-blur-xl
        border
        border-orange-300/20
        shadow-2xl
      "
    >

      {/* LOGO */}

      <div className="p-2 border-b border-orange-300/10">

        <h1 className="text-2xl font-bold text-white">
          Media
          <span className="text-orange-400">
            Lend
          </span>
        </h1>

        <p className="text-white/70">
          Dashboard Admin
        </p>

      </div>

      {/* PROFILE */}

      <div className="p-1">

        <div
          className="
            p-2
            rounded-lg
            bg-orange-500/15
            border
            border-orange-300/20
            flex
            items-center
            gap-3
          "
        >

          <FiUser className="text-xl text-orange-200" />

          <div>

            <p className="font-semibold text-white">
              {admin || "Administrator"}
            </p>

            <p className="text-orange-200 text-sm">
              Administrator
            </p>

          </div>

        </div>

      </div>

      {/* MENU */}

      <div className="p-2 pt-0">

        <div
          id="mobile-menu-scroll"
          className="
            w-full
            overflow-x-auto
            overflow-y-hidden
            [&::-webkit-scrollbar]:hidden
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onScroll={(e) => {

            sessionStorage.setItem(
              "mobileMenuScroll",
              e.target.scrollLeft
            );

          }}
        >

          <div className="flex gap-3 min-w-max pb-2">
            <div className="flex-shrink-0">
              <MobileMenuItem
                icon={<FiHome />}
                label="Dashboard"
                active
                onClick={() =>
                  navigate("/dashboard-admin")
                }
              />
            </div>

            <div className="flex-shrink-0">
              <MobileMenuItem
                icon={<FiBox />}
                label="Alat"
                onClick={() =>
                  navigate("/manajemen-alat")
                }
              />
            </div>

            <div className="flex-shrink-0">
              <MobileMenuItem
                icon={<FiClipboard />}
                label="Pengajuan"
                onClick={() =>
                  navigate("/pengajuan")
                }
              />
            </div>

            <div className="flex-shrink-0">
              <MobileMenuItem
                icon={<FiRotateCcw />}
                label="Kembali"
                onClick={() =>
                  navigate("/pengembalian")
                }
              />
            </div>

            <div className="flex-shrink-0">
              <MobileMenuItem
                icon={<FiClock />}
                label="Riwayat"
                onClick={() =>
                  navigate("/riwayat-admin")
                }
              />
            </div>

            <div className="flex-shrink-0">
              <MobileMenuItem
                icon={<FiUsers />}
                label="Mahasiswa"
                onClick={() =>
                  navigate("/mahasiswa")
                }
              />
            </div>

            <div className="flex-shrink-0">
              <MobileMenuItem
                icon={<FiLogOut />}
                label="Logout"
                onClick={handleLogout}
              />
            </div>
          </div>

          </div>
      </div>
    </div>

  </div>

      {/* ================= CONTENT  DESKTOP ================= */}

      <div className="hidden lg:flex relative flex-1 p-6 flex-col gap-3 text-white overflow-hidden">

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
            ● Online
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

      {/* ================= CONTENT MOBILE ================= */}


      <div className="lg:hidden relative z-20 px-4 pb-6 text-white">

        {/* HEADER */}

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-4 rounded-2xl mb-3">

          <h1 className="text-lg font-semibold">
            Selamat datang, Admin
          </h1>

          <p className="text-xs text-white/70">
            Sistem pengelolaan peminjaman multimedia kampus
          </p>

        </div>

        {/* CARD */}

        <div className="grid grid-cols-2 gap-3 mb-3">

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

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-4 rounded-2xl mb-3">

          <p className="text-xs text-white/60 mb-2">
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

          <p className="text-[10px] text-white/50 mt-2">
            {dipinjam} alat sedang digunakan
          </p>

        </div>

        {/* BUTTON */}

        <div className="flex gap-3 mb-3">

          <button
            onClick={() =>
              navigate("/manajemen-alat")
            }
            className="flex-1 bg-orange-500 py-2 rounded-xl text-sm"
          >
            Kelola Alat
          </button>

          <button
            onClick={() =>
              navigate("/pengajuan")
            }
            className="flex-1 bg-white/20 border border-white/20 py-2 rounded-xl text-sm"
          >
            Pengajuan
          </button>

        </div>

        {/* RIWAYAT */}

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-4">

          <div className="flex justify-between items-center mb-3">

            <h2 className="text-sm text-orange-200">
              Aktivitas Peminjaman
            </h2>

            <span className="text-[10px] text-white/50">
              {riwayat.length} transaksi
            </span>

          </div>

          {riwayat.length === 0 ? (

            <div className="text-center py-6 text-white/60">

              <p className="text-sm">
                Belum ada aktivitas peminjaman
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {riwayat.slice(0, 5).map((item, i) => (

                <div
                  key={i}
                  className="
                    bg-white/10
                    border
                    border-white/10
                    rounded-2xl
                    p-3
                  "
                >

                  <p className="font-semibold">
                    {item.Alat?.nama_alat || "-"}
                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs
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

                </div>

              ))}

            </div>

          )}

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

/* ================= SIDEBAR MOBILE ================= */
function MobileMenuItem({
  icon,
  label,
  active,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-2
        px-4 py-2
        rounded-xl
        whitespace-nowrap
        cursor-pointer
        transition
        ${
          active
            ? "bg-orange-500 text-white shadow-md"
            : "bg-white/10 text-white hover:bg-white/20"
        }
      `}
    >
      {icon}

      <span className="text-sm">
        {label}
      </span>
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