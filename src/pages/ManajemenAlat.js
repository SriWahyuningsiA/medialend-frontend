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
  FiPlus,
  FiTrash2,
  FiEdit,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

export default function ManajemenAlat() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("username");

  const [alat, setAlat] = useState([]);
  const [nama_alat, setNamaAlat] = useState("");
  const [kode_alat, setKodeAlat] = useState("");
  const [status, setStatus] = useState("tersedia");
  const [editId, setEditId] = useState(null);

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

  /* ================= FETCH ================= */

  useEffect(() => {
    if (token) {
      fetchAlat();
    }
  }, []);

  const fetchAlat = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/alat`,
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

  /* ================= TAMBAH / EDIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editId) {

        await axios.put(
          `${API_URL}/api/alat ${editId}`,
          {
            nama_alat,
            kode_alat,
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      } else {

        await axios.post(
          `${API_URL}/api/alat`,
          {
            nama_alat,
            kode_alat,
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      }

      setNamaAlat("");
      setKodeAlat("");
      setStatus("tersedia");
      setEditId(null);

      fetchAlat();

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (item) => {
    setEditId(item.id);
    setNamaAlat(item.nama_alat);
    setKodeAlat(item.kode_alat);
    setStatus(item.status);
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus alat?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `${API_URL}/api/alat ${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAlat();

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
            Dashboard Admin
          </p>

        </div>

        {/* PROFILE */}
        <div className="m-4 p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 flex items-center gap-3">

          <FiUser className="text-orange-200 text-lg" />

          <div>

            <p className="text-sm font-semibold">
              {admin}
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

      {/* CONTENT */}
      <div className="relative flex-1 p-6 text-white flex flex-col gap-4 overflow-hidden">

        {/* HEADER */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/20 p-5 rounded-2xl flex justify-between items-center">

          <div>

            <h1 className="text-xl font-bold">
              Manajemen Alat
            </h1>

            <p className="text-sm text-white/60">
              Kelola alat multimedia kampus
            </p>

          </div>

          <span className="text-xs text-green-400">
            ● Admin Aktif
          </span>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl p-5 grid grid-cols-4 gap-3"
        >

          <input
            type="text"
            placeholder="Nama Alat"
            value={nama_alat}
            onChange={(e) =>
              setNamaAlat(e.target.value)
            }
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none text-white placeholder:text-white/40"
            required
          />

          <input
            type="text"
            placeholder="Kode Alat"
            value={kode_alat}
            onChange={(e) =>
              setKodeAlat(e.target.value)
            }
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none text-white placeholder:text-white/40"
            required
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 outline-none text-white"
          >

            <option
              value="tersedia"
              className="text-black"
            >
              Tersedia
            </option>

            <option
              value="dipinjam"
              className="text-black"
            >
              Dipinjam
            </option>

          </select>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 rounded-xl flex items-center justify-center gap-2 font-semibold transition"
          >

            <FiPlus />

            {editId
              ? "Update"
              : "Tambah"}

          </button>

        </form>

        {/* TABLE */}
        <div
          className="flex-1 bg-white/20 backdrop-blur-xl border border-white/20 rounded-3xl p-5 overflow-auto scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >

          <table className="w-full text-sm">

            <thead className="text-white/60 border-b border-white/10">

              <tr>

                <th className="text-left py-3">
                  Nama Alat
                </th>

                <th className="text-left">
                  Kode
                </th>

                <th className="text-left">
                  Status
                </th>

                <th className="text-left">
                  Aksi
                </th>

              </tr>

            </thead>

            <tbody>

              {alat.map((item, i) => (

                <tr
                  key={i}
                  className="border-b border-white/5"
                >

                  <td className="py-3">
                    {item.nama_alat}
                  </td>

                  <td>
                    {item.kode_alat}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 w-fit ${
                        item.status === "tersedia"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                    >

                      {item.status === "tersedia"
                        ? <FiCheckCircle />
                        : <FiXCircle />}

                      {item.status}

                    </span>

                  </td>

                  <td>

                    <div className="flex gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(item)
                        }
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg transition"
                      >

                        <FiEdit />

                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        className="bg-red-500 hover:bg-red-600 p-2 rounded-lg transition"
                      >

                        <FiTrash2 />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

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