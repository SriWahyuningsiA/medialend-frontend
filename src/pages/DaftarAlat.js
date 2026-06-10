import { useEffect, useState } from "react";
import {
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import kampus from "../assets/kampus.jpeg";

import {
  FiHome,
  FiBox,
  FiClipboard,
  FiClock,
  FiLogOut,
  FiSearch,
  FiCheckCircle,
  FiXCircle,
  FiUser,
} from "react-icons/fi";

export default function DaftarAlat() {
  const navigate = useNavigate();

  const [alat, setAlat] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");
  const [nama, setNama] = useState(
      localStorage.getItem("nama") || ""
    );

  /* ================= PROTECT ================= */
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!token || role !== "mahasiswa") {
      navigate("/", { replace: true });
    }
  }, [navigate, token]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    fetchProfile();
    fetchData();
  }, [token]);

  const fetchProfile = async () => {

  try {

    const res = await axios.get(
      "http://localhost:3000/api/mahasiswa/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNama(res.data.nama);

  } catch (err) {

    console.log(err);

  }
};

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/alat",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlat(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  /* ================= FILTER ================= */

  const filteredAlat = alat.filter((item) =>
    item.nama_alat
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const tersedia = alat.filter(
    (a) => a.status === "tersedia"
  ).length;

  const dipinjam = alat.filter(
    (a) => a.status === "dipinjam"
  ).length;

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

      {/* ================= SIDEBAR ================= */}
      <div className="relative w-72 flex flex-col backdrop-blur-xl bg-gradient-to-b from-orange-600/40 via-orange-500/30 to-orange-800/40 border-r border-orange-300/30 text-white">

        {/* LOGO */}
        <div className="p-6 border-b border-orange-200/20">

          <h1 className="text-2xl font-bold">
            Media<span className="text-orange-300">Lend</span>
          </h1>

          <p className="text-xs text-white/70">
            Sistem Peminjaman Kampus
          </p>

        </div>

        {/* PROFILE */}
        <div className="m-4 p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 flex items-center gap-3">

          <FiUser className="text-orange-200 text-lg" />

          <div>
            <p className="text-sm font-semibold">
              {nama}
            </p>

            <p className="text-xs text-orange-200">
              Mahasiswa
            </p>
          </div>

        </div>

        {/* MENU */}
        <div
          className="flex-1 px-4 py-2 space-y-2 overflow-y-auto"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(251,146,60,0.35) transparent",
          }}
        >

          <SidebarItem
            icon={<FiHome />}
            label="Dashboard"
            onClick={() => navigate("/dashboard-mahasiswa")}
          />

          <SidebarItem
            icon={<FiBox />}
            label="Daftar Alat"
            active
            onClick={() => navigate("/alat")}
          />

          <SidebarItem
            icon={<FiClipboard />}
            label="Ajukan Peminjaman"
            onClick={() => navigate("/peminjaman")}
          />

          <SidebarItem
            icon={<FiClock />}
            label="Riwayat"
            onClick={() => navigate("/riwayat")}
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
      <div className="relative flex-1 p-6 flex flex-col gap-4 text-white overflow-hidden">

        {/* HEADER */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-5 rounded-2xl flex justify-between items-center">

          <div>
            <h1 className="text-lg font-semibold">
              Daftar Alat Multimedia
            </h1>

            <p className="text-xs text-white/70">
              Lihat dan pinjam alat multimedia kampus
            </p>
          </div>

          <span className="text-xs text-green-400">
            ● Sistem Aktif
          </span>

        </div>

        {/* STATISTIK */}
        <div className="grid grid-cols-3 gap-3">

          <StatCard
            title="Total Alat"
            value={alat.length}
          />

          <StatCard
            title="Tersedia"
            value={tersedia}
          />

          <StatCard
            title="Dipinjam"
            value={dipinjam}
          />

        </div>

        {/* SEARCH */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-3 rounded-2xl flex items-center gap-3">

          <FiSearch className="text-orange-200" />

          <input
            type="text"
            placeholder="Cari alat multimedia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full placeholder:text-white/40"
          />

        </div>

        {/* LIST ALAT */}
        <div
          className="flex-1 overflow-y-auto pr-2"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >

          <div className="grid grid-cols-3 gap-4">

            {filteredAlat.length === 0 ? (
              <div className="col-span-3 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-10 text-center text-white/60">

                <p className="text-sm">
                  Alat tidak ditemukan
                </p>

              </div>
            ) : (
              filteredAlat.map((item, i) => (

                <div
                  key={i}
                  className="bg-white/20 backdrop-blur-xl border border-white/20 p-4 rounded-2xl hover:bg-white/30 hover:scale-[1.02] shadow-lg shadow-black/20 transition flex flex-col justify-between"
                >

                  {/* TOP */}
                  <div>

                    <div className="flex justify-between items-start">

                      <div>
                        <h2 className="font-semibold text-sm">
                          {item.nama_alat}
                        </h2>

                        <p className="text-[11px] text-white/50 mt-1">
                          Kode : {item.kode_alat}
                        </p>
                      </div>

                      {item.status === "tersedia" ? (
                        <FiCheckCircle className="text-green-400" />
                      ) : (
                        <FiXCircle className="text-red-400" />
                      )}

                    </div>

                    <div className="mt-4">

                      <span
                        className={`px-2 py-1 rounded-full text-[10px]
                        ${
                          item.status === "tersedia"
                            ? "bg-green-500"
                            : "bg-orange-500"
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>

                  </div>

                  {/* BUTTON */}
                  <button
                    disabled={item.status !== "tersedia"}
                    onClick={() =>
                      navigate("/peminjaman", {
                        state: {
                          alatId: item.id,
                          namaAlat: item.nama_alat,
                        },
                      })
                    }
                    className={`mt-5 py-2 rounded-xl text-xs font-semibold transition
                    ${
                      item.status === "tersedia"
                        ? "bg-orange-500 hover:bg-orange-600 hover:scale-105 shadow-lg shadow-orange-500/20"
                        : "bg-white/10 cursor-not-allowed"
                    }`}
                  >
                    {item.status === "tersedia"
                      ? "Ajukan Peminjaman"
                      : "Tidak Tersedia"}
                  </button>

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
      className={`flex gap-3 p-3 rounded-xl cursor-pointer transition hover:bg-white/10
      ${
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

/* ================= STAT CARD ================= */

function StatCard({
  title,
  value,
}) {
  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-4 rounded-2xl">

      <p className="text-xs text-white/60">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-2">
        {value}
      </h2>

    </div>

    
  );
}