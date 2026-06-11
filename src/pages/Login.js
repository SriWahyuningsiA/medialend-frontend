import { useState, useEffect } from "react";
import axios from "axios";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaUser,
  FaLock,
} from "react-icons/fa";

import {
  FiCheckCircle,
  FiLogIn,
} from "react-icons/fi";

import {
  HiOutlineShieldCheck,
} from "react-icons/hi";

import kampus from "../assets/kampus.jpeg";

export default function Login() {

  const [mode, setMode] =
    useState("mahasiswa");

  const [nim, setNim] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();
  const location = useLocation();

  /* ================= AUTO REDIRECT ================= */

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const role =
      localStorage.getItem("role");

    if (token && role) {

      if (role === "mahasiswa") {

        navigate(
          "/dashboard-mahasiswa",
          { replace: true }
        );

      } else {

        navigate(
          "/dashboard-admin",
          { replace: true }
        );

      }

    }

  }, [navigate]);

  /* ================= LOGIN ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const url =
        mode === "mahasiswa"
          ? "http://localhost:3000/api/login-mahasiswa"
          : "http://localhost:3000/api/login-admin";

      const payload =
        mode === "mahasiswa"
          ? { nim, password }
          : {
              username: nim,
              password,
            };

      const res =
        await axios.post(
          url,
          payload
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

if (res.data.user.nim) {

  localStorage.setItem(
    "nim",
    res.data.user.nim
  );

  localStorage.setItem(
    "nama",
    res.data.user.nama
  );

}

      if (res.data.user.username) {

        localStorage.setItem(
          "username",
          res.data.user.username
        );

      }

      alert("Login berhasil");

      if (
        res.data.user.role ===
        "mahasiswa"
      ) {

        navigate(
          "/dashboard-mahasiswa",
          { replace: true }
        );

      } else {

        navigate(
          "/dashboard-admin",
          { replace: true }
        );

      }

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login gagal"
      );

    }

  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center relative">

      {/* BACKGROUND */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `url(${kampus})`,
        }}
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-orange-900/40 to-black/80" />

      {/* CONTAINER */}

      <div className="relative z-10 w-[92%] h-[88vh] rounded-[35px] overflow-hidden border border-orange-200/20 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.5)]">

        <div className="flex h-full">

          {/* LEFT */}

          <div className="w-5/12 border-r border-white/10 px-12 py-12 flex flex-col justify-center">

            <div>

              <h1 className="text-5xl font-extrabold text-white leading-tight">

                Media
                <span className="text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]">
                  Lend
                </span>

              </h1>

              <p className="text-white/70 text-base leading-8 mt-8 max-w-md">

              Platform digital untuk memudahkan proses
              peminjaman alat multimedia kampus secara
              cepat, aman, dan terintegrasi.

            </p>

            </div>

            <div className="space-y-4 my-8">

              <Feature text="Realtime monitoring alat" />
              <Feature text="Peminjaman cepat & efisien" />
              <Feature text="Riwayat otomatis tersimpan" />
              <Feature text="Akses dashboard mahasiswa & admin" />

            </div>

          </div>

          {/* RIGHT */}

          <div className="w-7/12 flex items-center justify-center px-16">

            <div className="w-full max-w-xl">

              {/* HEADER */}

              <div className="mb-8">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center text-white text-2xl shadow-lg">

                    <HiOutlineShieldCheck />

                  </div>

                  <div>

                    <h2 className="text-4xl font-bold text-white">
                      Selamat Datang
                    </h2>

                    <p className="text-white/60 text-sm mt-1">
                      Login ke dashboard MediaLend
                    </p>

                  </div>

                </div>

              </div>

              {/* TOGGLE */}

              <div className="flex mb-6 bg-white/10 border border-white/10 rounded-2xl p-1 backdrop-blur-xl">

                <button
                  type="button"
                  onClick={() =>
                    setMode("mahasiswa")
                  }
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                    mode === "mahasiswa"
                      ? "bg-orange-500 text-white shadow-lg"
                      : "text-white/60"
                  }`}
                >
                  Mahasiswa
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setMode("admin")
                  }
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                    mode === "admin"
                      ? "bg-orange-500 text-white shadow-lg"
                      : "text-white/60"
                  }`}
                >
                  Admin
                </button>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* USER */}

                <div className="relative">

                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-200" />

                  <input
                    type="text"
                    placeholder={
                      mode === "mahasiswa"
                        ? "Masukkan NIM"
                        : "Masukkan Username"
                    }
                    value={nim}
                    onChange={(e) =>
                      setNim(
                        e.target.value
                      )
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500 backdrop-blur-xl"
                    required
                  />

                </div>

                {/* PASSWORD */}

                <div className="relative">

                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-200" />

                  <input
                    type="password"
                    placeholder="Masukkan Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500 backdrop-blur-xl"
                    required
                  />

                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                >

                  <FiLogIn />

                  Masuk ke Dashboard

                </button>

              </form>

              {/* FOOTER */}

              <p className="text-xs text-white/40 mt-8 text-center">

                © 2026 MediaLend Campus System
                Institut Teknologi Bacharuddin Jusuf Habibie

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

/* ================= FEATURE ================= */

function Feature({ text }) {

  return (
    <div className="flex items-center gap-3 text-white/85">

      <FiCheckCircle className="text-orange-300 text-lg" />

      <p className="text-base">
        {text}
      </p>

    </div>
  );
}