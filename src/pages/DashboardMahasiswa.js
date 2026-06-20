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
  FiLogOut,
  FiUser,
  FiTrendingUp,
  FiActivity,
  FiBarChart2,
  FiClipboard,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

export default function DashboardMahasiswa() {

  const [alat, setAlat] = useState([]);
  const [riwayat, setRiwayat] = useState([]);

  const navigate = useNavigate();
 

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

  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    localStorage.clear();

    navigate("/", { replace: true });

  };

  /* ================= FETCH DATA ================= */
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    if (!token) return;

    fetchData();
    fetchProfile();

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

  const fetchData = async () => {

    try {

      const resAlat = await axios.get(
     `${API_URL}/api/alat`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resRiwayat = await axios.get(
        `${API_URL}/api/peminjaman/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAlat(resAlat.data);
      setRiwayat(resRiwayat.data);

    } catch (err) {

      if (err.response?.status === 401) {

        localStorage.clear();
        navigate("/");

      }

    }

  };

  /* ================= DATA ================= */

  const dipinjam = riwayat.filter(
    (r) => r.status === "dipinjam"
  ).length;

  const tersedia = alat.filter(
    (a) => a.status === "tersedia"
  ).length;

  const progress = alat.length
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
          lg:bg-[length:90%]
        "
        style={{
          backgroundImage: `url(${kampus})`,
        }}
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-orange-700/40 to-black/80" />

      {/* ================= SIDEBAR ================= */}

      <div className="hidden lg:flex relative w-72 flex flex-col backdrop-blur-xl bg-gradient-to-b from-orange-600/40 via-orange-500/30 to-orange-800/40 border-r border-orange-300/30 text-white">

        {/* LOGO */}

        <div className="p-6 border-b border-orange-200/30">

          <h1 className="text-2xl font-bold">
            Media<span className="text-orange-300">Lend</span>
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
          className="m-4 p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 flex items-center gap-3 cursor-pointer hover:bg-white/30 hover:scale-[1.02] transition"
        >

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
            active
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

      {/* MOBILE ONLY */}

      <div className="lg:hidden relative z-20 p-4 w-full">

        {/* CARD BESAR */}

        <div className="
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
        ">

          {/* LOGO */}

          <div className="p-2 border-b border-orange-300/10">

            <h1 className="text-2xl font-bold text-white">
              Media
              <span className="text-orange-400">
                Lend
              </span>
            </h1>

            <p className="text-white/70">
              Sistem Peminjaman Kampus
            </p>

          </div>

          {/* PROFILE */}

          <div className="p-1">

            <div 
              onClick={() =>
                navigate("/profile-mahasiswa")
              }

            className="
              p-2
              rounded-lg
              bg-orange-500/15
              border
              border-orange-300/20
              flex
              items-center
              gap-3
              cursor-pointer
              hover:bg-orange-500/20
              transition
            ">

              <FiUser className="text-xl text-orange-200" />

              <div>

                <p className="font-semibold text-white">
                  {nama}
                </p>

                <p className="text-orange-200 text-sm">
                  Mahasiswa
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

              <div
              className="
                flex
                gap-3
                min-w-max
                pb-2
              "
            >
              <div className="flex-shrink-0">
                <MobileMenuItem
                  icon={<FiHome />}
                  label="Dashboard"
                  active
                  onClick={() =>
                    navigate("/dashboard-mahasiswa")
                  }
                />
              </div>
              
              <div className="flex-shrink-0">
                <MobileMenuItem
                  icon={<FiBox />}
                  label="Daftar Alat"
                  onClick={() =>
                    navigate("/alat")
                  }
                />
              </div>

              <div className="flex-shrink-0">
                <MobileMenuItem
                  icon={<FiClipboard />}
                  label="Peminjaman"
                  onClick={() =>
                    navigate("/peminjaman")
                  }
                />
              </div>

              <div className="flex-shrink-0">
                <MobileMenuItem
                  icon={<FiClock />}
                  label="Riwayat"
                  onClick={() =>
                    navigate("/riwayat")
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

      {/* ================= CONTENT DESKTOP ================= */}

      <div className="
      relative
      flex-1
      p-4
      lg:p-6
      flex
      flex-col
      gap-3
      text-white
      overflow-visible
      lg:overflow-y-auto
    ">

        {/* HEADER */}

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-3 lg:p-5 rounded-2xl flex justify-between items-center">

          <div>

            <h1 className="text-sm lg:text-lg font-semibold">
              Selamat datang, {nama}
            </h1>

            <p className="text-xs text-white/70">
              Sistem peminjaman alat multimedia kampus
            </p>

          </div>

          <span className="text-[10px] text-green-400 whitespace-nowrap">
            ● Online
          </span>

        </div>

        {/* CARD */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

          <Card
            title="Total Alat"
            value={alat.length}
            icon={<FiBarChart2 />}
          />

          <Card
            title="Alat Tersedia"
            value={tersedia}
            icon={<FiCheckCircle />}
          />

          <Card
            title="Sedang Dipinjam"
            value={dipinjam}
            icon={<FiTrendingUp />}
          />

          <Card
            title="Riwayat"
            value={riwayat.length}
            icon={<FiActivity />}
          />

        </div>

        {/* PROGRESS */}

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-3 rounded-2xl">

          <div className="flex justify-between items-center mb-2">

            <p className="text-xs text-white/60">
              Status Penggunaan Alat
            </p>

            <p className="text-[10px] text-orange-200">
              {dipinjam} digunakan
            </p>

          </div>

          <div className="w-full bg-white/10 h-2 rounded-full">

            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* BUTTON */}

        <div className="flex gap-3">

          <button
            onClick={() =>
              navigate("/alat")
            }
            className="bg-orange-500 px-3 py-2 rounded-xl text-sm hover:scale-105 transition"
          >
            Lihat Daftar Alat
          </button>

          <button
            onClick={() =>
              navigate("/peminjaman")
            }
            className="bg-white/20 border border-white/20 px-3 lg:px-4 py-2 rounded-xl text-sm hover:bg-white/30 transition"
          >
            Ajukan Peminjaman
          </button>

        </div>

        {/* RIWAYAT */}

        <div className="flex-1 bg-white/20 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex flex-col overflow-hidden">

          <div className="flex justify-between items-center mb-3">

            <h2 className="text-sm text-orange-200">
              Riwayat Peminjaman
            </h2>

            <span className="text-[10px] text-white/40">
              {riwayat.length} transaksi
            </span>

          </div>

          <div
            className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >

            {riwayat.length === 0 ? (

              <div className="flex items-center justify-center h-full text-center text-white/60">

                <div>

                  <p className="text-sm">
                    Belum ada riwayat peminjaman
                  </p>

                  <p className="text-xs text-white/40 mt-1">
                    Silakan lakukan peminjaman alat multimedia terlebih dahulu
                  </p>

                </div>

              </div>

            ) : (

              <table className="w-full text-xs">

                <thead className="text-white/60 border-b border-white/10">

                  <tr>

                    <th className="text-left py-2">
                      Nama Alat
                    </th>

                    <th className="text-left">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {riwayat.map((item, i) => (

                    <tr
                      key={i}
                      className="border-b border-white/5"
                    >

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

/* ================= CARD DESKTOP ================= */

function Card({
  title,
  value,
  icon,
}) {

  return (
    <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-3 rounded-2xl cursor-pointer hover:scale-105 hover:bg-white/30 transition">
      <div className="flex justify-between text-xs text-white/60">

        {title}

        {icon}

      </div>

      <p className="text-lg lg:text-xl font-bold mt-1">
        {value}
      </p>

    </div>
  );
}