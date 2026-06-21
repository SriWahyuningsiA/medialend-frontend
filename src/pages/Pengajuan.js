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
  FiCheckCircle,
} from "react-icons/fi";

export default function Pengajuan() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("username");

  const [pengajuan, setPengajuan] = useState([]);

  /* ================= PROTECT ================= */

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/", { replace: true });
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


    useEffect(() => {

      const menu =
        document.getElementById(
          "mobile-menu-scroll"
        );

      const saved =
        sessionStorage.getItem(
          "mobileMenuScroll"
        );

      if (menu && saved) {

        menu.scrollLeft =
          parseInt(saved);

      }

    }, []);

  /* ================= FETCH ================= */

  useEffect(() => {
    if (token) {
      fetchPengajuan();
    }
  }, []);

  const fetchPengajuan = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/peminjaman`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPengajuan(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= TERIMA ================= */

  const handleTerima = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/peminjaman/terima/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Pengajuan diterima");

      fetchPengajuan();

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= TOLAK ================= */

  const handleTolak = async (id) => {
    try {
      await axios.put(
        `${API_URL}/api/peminjaman/tolak/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Pengajuan ditolak");

      fetchPengajuan();

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
          backgroundImage: `url(${kampus})`,
        }}
      />

      {/* OVERLAY */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/70 via-orange-700/40 to-black/80" />

      {/* SIDEBAR */}
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
                    active
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

      {/* CONTENT */}
      <div className="hidden lg:flex relative flex-1 p-6 text-white flex-col gap-4 overflow-hidden">

        {/* HEADER */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-5 rounded-2xl flex justify-between items-center">

          <div>
            <h1 className="text-xl font-bold">
              Pengajuan Peminjaman
            </h1>

            <p className="text-sm text-white/60">
              Semua pengajuan peminjaman mahasiswa
            </p>
          </div>

          <span className="text-xs text-green-400">
            ● Online
          </span>
        </div>

        {/* TABLE */}
        <div
          className="flex-1 bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-5 overflow-y-auto [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >

          {pengajuan.length === 0 ? (

            <div className="flex items-center justify-center h-full text-center text-white/60">

              <div>
                <FiCheckCircle className="text-5xl mx-auto mb-3 text-orange-300" />

                <p className="text-lg">
                  Belum Ada Pengajuan
                </p>

                <p className="text-sm text-white/40">
                  Pengajuan mahasiswa akan tampil di sini
                </p>
              </div>

            </div>

          ) : (

            <table className="w-full text-sm">

              <thead className="text-white/60 border-b border-white/10">

                <tr>
                  <th className="text-left py-3">
                    Mahasiswa
                  </th>

                  <th className="text-left">
                    NIM
                  </th>

                  <th className="text-left">
                    Nama Alat
                  </th>

                  <th className="text-left">
                    Status
                  </th>

                  <th className="text-left">
                    Aksi
                  </th>

                  <th className="text-left">
                    Tanggal
                  </th>
                </tr>

              </thead>

              <tbody>

                {pengajuan.map((item, i) => (

                  <tr
                    key={i}
                    className="border-b border-white/5"
                  >

                    <td className="py-3">
                      {item.Mahasiswa?.nama || "-"}
                    </td>

                    <td>
                      {item.Mahasiswa?.nim || "-"}
                    </td>

                    <td>
                      {item.Alat?.nama_alat || "-"}
                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          item.status === "pending"
                            ? "bg-yellow-500"
                            : item.status === "dipinjam"
                            ? "bg-orange-500"
                            : item.status === "ditolak"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td>

                      {item.status === "pending" ? (

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              handleTerima(item.id)
                            }
                            className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg text-xs"
                          >
                            Terima
                          </button>

                          <button
                            onClick={() =>
                              handleTolak(item.id)
                            }
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-xs"
                          >
                            Tolak
                          </button>

                        </div>

                      ) : (

                        <span className="text-xs text-white/50">
                          Selesai
                        </span>

                      )}

                    </td>

                    <td className="text-xs text-white/60">

                      {new Date(
                        item.createdAt
                      ).toLocaleDateString(
                        "id-ID"
                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

      {/* ================= CONTENT MOBILE ================= */}

      <div
        className="
          lg:hidden
          relative
          z-20
          px-4
          pb-6
          text-white
        "
      >

        {/* HEADER */}

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-4 mb-3">

          <h1 className="text-lg font-bold">
            Pengajuan Peminjaman
          </h1>

          <p className="text-xs text-white/60">
            Semua pengajuan peminjaman mahasiswa
          </p>

        </div>

        {/* LIST PENGAJUAN */}

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-4">

          {pengajuan.length === 0 ? (

            <div className="text-center py-8">

              <FiCheckCircle className="text-5xl mx-auto mb-3 text-orange-300" />

              <p className="font-semibold">
                Belum Ada Pengajuan
              </p>

              <p className="text-xs text-white/50 mt-2">
                Pengajuan mahasiswa akan tampil di sini
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {pengajuan.map((item) => (

                <div
                  key={item.id}
                  className="
                    bg-white/10
                    border
                    border-white/10
                    rounded-2xl
                    p-4
                  "
                >

                  {/* MAHASISWA */}

                  <div className="mb-3">

                    <p className="font-semibold">
                      {item.Mahasiswa?.nama || "-"}
                    </p>

                    <p className="text-xs text-white/60">
                      NIM :
                      {" "}
                      {item.Mahasiswa?.nim || "-"}
                    </p>

                  </div>

                  {/* ALAT */}

                  <div className="mb-3">

                    <p className="text-sm text-white/70">
                      Alat
                    </p>

                    <p className="font-medium">
                      {item.Alat?.nama_alat || "-"}
                    </p>

                  </div>

                  {/* STATUS */}

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs
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

                  {/* TANGGAL */}

                  <p className="text-xs text-white/50 mt-3">

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString(
                      "id-ID"
                    )}

                  </p>

                  {/* AKSI */}

                  {item.status === "pending" && (

                    <div className="flex gap-2 mt-4">

                      <button
                        onClick={() =>
                          handleTerima(item.id)
                        }
                        className="
                          flex-1
                          bg-green-500
                          hover:bg-green-600
                          py-2
                          rounded-xl
                          text-sm
                          font-medium
                        "
                      >
                        Terima
                      </button>

                      <button
                        onClick={() =>
                          handleTolak(item.id)
                        }
                        className="
                          flex-1
                          bg-red-500
                          hover:bg-red-600
                          py-2
                          rounded-xl
                          text-sm
                          font-medium
                        "
                      >
                        Tolak
                      </button>

                    </div>

                  )}

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