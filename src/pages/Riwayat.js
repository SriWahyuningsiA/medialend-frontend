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

  /* ================= MOBILE MENU SCROLL ================= */

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
        className="
          fixed
          inset-0
          bg-center
          bg-no-repeat
          bg-cover
          min-h-screen
        "
        style={{
          backgroundImage: `url(${kampus})`,
        }}
      />

      {/* OVERLAY */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/70 via-orange-700/40 to-black/80" />

      {/* ================= SIDEBAR ================= */}
      <div className="hidden lg:flex relative w-72 flex flex-col backdrop-blur-xl bg-gradient-to-b from-orange-600/40 via-orange-500/30 to-orange-800/40 border-r border-orange-300/30 text-white">

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
              "
            >

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

              <div className="flex gap-3 min-w-max pb-2">

                <div className="flex-shrink-0">
                  <MobileMenuItem
                    icon={<FiHome />}
                    label="Dashboard"
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
                    active
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
      <div className="hidden lg:flex relative flex-1 p-6 text-white flex-col overflow-hidden">

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
            ● Online
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

        <div className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-4 min-h-[65vh]">

          <h1 className="text-lg font-bold">
            Riwayat Peminjaman
          </h1>

          <p className="text-xs text-white/60 mb-4">
            Semua data peminjaman alat multimedia
          </p>

          {riwayat.length === 0 ? (

            <div className="text-center py-8">

              <FiCheckCircle className="text-5xl mx-auto mb-3 text-orange-300" />

              <p className="font-semibold">
                Belum Ada Riwayat
              </p>

              <p className="text-xs text-white/50 mt-2">
                Silakan lakukan peminjaman alat terlebih dahulu
              </p>

            </div>

          ) : (

              <div
                className="
                  space-y-3
                  min-h-[300px]
                "
              >

              {riwayat.map((item, i) => (

                <div
                  key={i}
                  className="
                  bg-white/10
                  border
                  border-white/10
                  rounded-2xl
                  p-3
                  shadow-lg
                "
              >

                  <p className="font-semibold">
                    {item.Alat?.nama_alat || "-"}
                  </p>

                  <p className="text-xs text-white/60 mt-1">
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString("id-ID")}
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