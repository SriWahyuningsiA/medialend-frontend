import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FiSave,
} from "react-icons/fi";

export default function ProfileMahasiswa() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const nim = localStorage.getItem("nim");

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");

  /* ================= PROTECT ================= */

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (!token || role !== "mahasiswa") {

      navigate("/", {
        replace: true,
      });

    }

  }, [token]);

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {

    if (!token) return;

    fetchProfile();

  }, []);

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

      setNama(res.data.nama || "");
      setEmail(res.data.email || "");

    } catch (err) {

      console.log(err);

    }

  };

  /* ================= UPDATE PROFILE ================= */

  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.put(
        `${API_URL}/api/mahasiswa/profile`,
        {
          nama,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "nama",
        res.data.data.nama
      );

      alert("Profile berhasil diupdate");

      navigate("/dashboard-mahasiswa");

    } catch (err) {

      console.log(err);

      alert("Gagal update profile");

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

      <div className="relative w-72 flex flex-col backdrop-blur-xl bg-gradient-to-b from-orange-600/40 via-orange-500/30 to-orange-800/40 border-r border-orange-300/30 text-white">

        {/* LOGO */}

        <div className="p-6 border-b border-orange-200/30">

          <h1 className="text-2xl font-bold">
            Media
            <span className="text-orange-300">
              Lend
            </span>
          </h1>

          <p className="text-xs text-white/70">
            Sistem Peminjaman Kampus
          </p>

        </div>

        {/* PROFILE */}

        <div
          onClick={() =>
            navigate("/profile-mahasiswa")
          }
          className="m-4 p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 flex items-center gap-3 cursor-pointer hover:bg-white/30 transition"
        >

          <FiUser className="text-orange-200 text-lg" />

          <div>

            <p className="text-sm font-semibold">
              {localStorage.getItem("nama") || nim}
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
            scrollbarColor:
              "rgba(251,146,60,0.35) transparent",
          }}
        >

          <SidebarItem
            icon={<FiHome />}
            label="Dashboard"
            onClick={() =>
              navigate("/dashboard-mahasiswa")
            }
          />

          <SidebarItem
            icon={<FiBox />}
            label="Daftar Alat"
            onClick={() =>
              navigate("/alat")
            }
          />

          <SidebarItem
            icon={<FiClipboard />}
            label="Ajukan Peminjaman"
            onClick={() =>
              navigate("/peminjaman")
            }
          />

          <SidebarItem
            icon={<FiClock />}
            label="Riwayat Peminjaman"
            onClick={() =>
              navigate("/riwayat")
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

      <div className="relative flex-1 p-6 flex items-center justify-center text-white">

        <form
          onSubmit={handleUpdate}
          className="w-full max-w-xl bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8"
        >

          <h1 className="text-2xl font-bold mb-2">
            Profile Mahasiswa
          </h1>

          <p className="text-sm text-white/60 mb-6">
            Kelola data profile akun mahasiswa
          </p>

          {/* NAMA */}

          <div className="mb-4">

            <label className="text-sm text-white/70 block mb-2">
              Nama Lengkap
            </label>

            <input
              type="text"
              value={nama}
              onChange={(e) =>
                setNama(e.target.value)
              }
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 outline-none"
            />

          </div>

          {/* NIM */}

          <div className="mb-4">

            <label className="text-sm text-white/70 block mb-2">
              NIM
            </label>

            <input
              type="text"
              value={nim}
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none text-white/60"
            />

          </div>

          {/* EMAIL */}

          <div className="mb-6">

            <label className="text-sm text-white/70 block mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 outline-none"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >

            <FiSave />

            Simpan Profile

          </button>

        </form>

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