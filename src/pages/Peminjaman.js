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
  FiClock,
  FiLogOut,
  FiUser,
  FiSend,
} from "react-icons/fi";

export default function Peminjaman() {

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const [nama, setNama] = useState(
      localStorage.getItem("nama") || ""
    );

  const [alat, setAlat] = useState([]);

  const [alatId, setAlatId] = useState(
    location.state?.alatId || ""
  );

  const [tanggal, setTanggal] = useState("");
  const [catatan, setCatatan] = useState("");

  const namaAlat =
    location.state?.namaAlat || "";

  /* ================= PROTECT ================= */

  useEffect(() => {

    const role = localStorage.getItem("role");

    if (!token || role !== "mahasiswa") {

      navigate("/", {
        replace: true,
      });

    }

  }, [navigate, token]);

  /* ================= FETCH ALAT ================= */

  useEffect(() => {

    fetchProfile();
    fetchAlat();

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

  const fetchAlat = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/api/alat`,
      );

      const tersedia = res.data.filter(
        (a) => a.status === "tersedia"
      );

      setAlat(tersedia);

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

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        `${API_URL}/api/peminjaman`,
        {
          alat_id: alatId,
          tanggal_pinjam: tanggal,
          catatan: catatan,
          status: "pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Pengajuan peminjaman berhasil ✅"
      );

      navigate("/dashboard-mahasiswa");

    } catch (err) {

      console.log(err);

      alert(
        "Gagal mengajukan peminjaman"
      );

    }
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

        <div className="p-6 border-b border-orange-200/20">

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
            active
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
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-8"
        >

          <h1 className="text-2xl font-bold mb-2">
            Ajukan Peminjaman
          </h1>

          <p className="text-sm text-white/60 mb-6">
            Silakan isi form peminjaman alat multimedia
          </p>

          
          {/* PILIH ALAT */}

          <div className="mb-4">

            <label className="text-sm text-white/70 block mb-2">
              Pilih Alat
            </label>

            <select
              value={alatId}
              onChange={(e) =>
                setAlatId(e.target.value)
              }
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 outline-none"
            >

              <option value="">
                -- Pilih Alat --
              </option>

              {alat.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                  className="text-black"
                >

                  {item.nama_alat}

                </option>

              ))}

            </select>

          </div>

          {/* TANGGAL */}

          <div className="mb-4">

            <label className="text-sm text-white/70 block mb-2">
              Tanggal Pinjam
            </label>

            <input
              type="date"
              value={tanggal}
              onChange={(e) =>
                setTanggal(e.target.value)
              }
              required
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 outline-none"
            />

          </div>

          {/* CATATAN */}

          <div className="mb-6">

            <label className="text-sm text-white/70 block mb-2">
              Keperluan
            </label>

            <textarea
              rows="4"
              value={catatan}
              onChange={(e) =>
                setCatatan(e.target.value)
              }
              placeholder="Contoh : Presentasi seminar..."
              className="w-full bg-white/10 border border-white/20 rounded-xl p-3 outline-none resize-none"
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >

            <FiSend />

            Ajukan Sekarang

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