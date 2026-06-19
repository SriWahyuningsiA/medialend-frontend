import { useEffect, useState } from "react";
import {
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import kampus from "../assets/kampus.jpeg";

import {
  FiHome,
  FiBox,
  FiClipboard,
  FiClock,
  FiLogOut,
  FiUser,
  FiCheckCircle,
} from "react-icons/fi";

export default function Riwayat() {

  const navigate = useNavigate();
 
  const token = localStorage.getItem("token");
  const [nama, setNama] = useState(
    localStorage.getItem("nama") || ""
  );
  const [riwayat, setRiwayat] = useState([]);

  /* ================= PROTECT ================= */

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (!token || role !== "mahasiswa") {
      navigate("/", { replace: true });
    }

  }, [navigate, token]);

  /* ================= FETCH ================= */
 // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

  fetchProfile();
  fetchRiwayat();

}, [token]);

  const fetchProfile = async () => {

  try {

    const res = await axios.get(
      `${API_URL}/api/mahasiswa/profile`,
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

  const fetchRiwayat = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/peminjaman/user`,
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

    navigate("/", { replace: true });

  };

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
        <div className="flex-1 px-4 py-2 space-y-2">

          <SidebarItem
            icon={<FiHome />}
            label="Dashboard"
            onClick={() => navigate("/dashboard-mahasiswa")}
          />

          <SidebarItem
            icon={<FiBox />}
            label="Daftar Alat"
            onClick={() => navigate("/alat")}
          />

          <SidebarItem
            icon={<FiClipboard />}
            label="Ajukan Peminjaman"
            onClick={() => navigate("/peminjaman")}
          />

          <SidebarItem
            icon={<FiClock />}
            label="Riwayat Peminjaman"
            active
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
      <div className="relative flex-1 p-6 text-white flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-5 rounded-2xl mb-4 flex justify-between items-center">

          <div>

            <h1 className="text-xl font-bold">
              Riwayat Peminjaman
            </h1>

            <p className="text-sm text-white/60">
              Semua data peminjaman alat multimedia
            </p>

          </div>

          <span className="text-xs text-green-400">
            ● Sistem Aktif
          </span>

        </div>

        {/* TABLE */}
        <div className="flex-1 bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-5 overflow-auto">

          {riwayat.length === 0 ? (

            <div className="flex items-center justify-center h-full text-center text-white/60">

              <div>

                <FiCheckCircle className="text-5xl mx-auto mb-3 text-orange-300" />

                <p className="text-lg">
                  Belum Ada Riwayat
                </p>

                <p className="text-sm text-white/40">
                  Silakan lakukan peminjaman alat terlebih dahulu
                </p>

              </div>

            </div>

          ) : (

            <table className="w-full text-sm">

              <thead className="text-white/60 border-b border-white/10">

                <tr>

                  <th className="text-left py-3">
                    Nama Alat
                  </th>

                  <th className="text-left">
                    Status
                  </th>

                  <th className="text-left">
                    Tanggal
                  </th>

                </tr>

              </thead>

              <tbody>

                {riwayat.map((item, i) => (

                  <tr
                    key={i}
                    className="border-b border-white/5"
                  >

                    <td className="py-3">
                      {item.Alat?.nama_alat || "-"}
                    </td>

                    <td>

                      <span
                        className={`px-3 py-1 rounded-full text-xs
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

                    <td className="text-white/60 text-xs">

                      {new Date(
                        item.createdAt
                      ).toLocaleDateString("id-ID")}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

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