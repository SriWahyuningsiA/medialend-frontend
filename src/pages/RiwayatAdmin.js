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

  /* ================= Tambahan ================= */
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

    if (!token) return;

    fetchRiwayat();

  }, [token]);

  const fetchRiwayat = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/peminjaman`,
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

      <div className="hidden lg:flex relative w-72 h-screen flex flex-col backdrop-blur-xl bg-gradient-to-b from-orange-600/40 via-orange-500/30 to-orange-800/40 border-r border-orange-300/30 text-white">

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
                    active
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

      {/* CONTENT DESKTOP */}

      <div className="hidden lg:flex relative flex-1 p-6 flex-col text-white overflow-hidden">

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

          <div
            className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >

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

        {/* CONTENT MOBILE */}

          <div
            className="
              lg:hidden
              absolute
              top-[260px]
              left-0
              w-full
              px-4
              pb-6
              z-20
              text-white
            "
          >

            <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-4">

              <h1 className="text-lg font-bold flex items-center gap-2">

                <FiArchive />

                Riwayat Peminjaman

              </h1>

              <p className="text-xs text-white/60 mb-4">
                Semua aktivitas peminjaman mahasiswa
              </p>

              {riwayat.length === 0 ? (

                <div className="text-center py-8 text-white/60">

                  <FiArchive className="text-5xl mx-auto mb-3 text-orange-300" />

                  <p className="font-semibold">
                    Belum ada data riwayat
                  </p>

                </div>

              ) : (

                <div className="space-y-3">

                  {riwayat.map((item, i) => (

                    <div
                      key={i}
                      className="
                        bg-white/10
                        border
                        border-white/10
                        rounded-2xl
                        p-4
                      "
                    >

                      <p className="font-semibold text-lg">
                        {item.Mahasiswa?.nama || "-"}
                      </p>

                      <p className="text-sm text-white/60">
                        NIM : {item.Mahasiswa?.nim || "-"}
                      </p>

                      <div className="mt-3">

                        <p className="text-white/60 text-sm">
                          Alat
                        </p>

                        <p className="font-semibold">
                          {item.Alat?.nama_alat || "-"}
                        </p>

                      </div>

                      <div className="mt-3">

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

                      <p className="text-xs text-white/50 mt-3">

                        {new Date(
                          item.createdAt
                        ).toLocaleDateString(
                          "id-ID"
                        )}

                      </p>

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