"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const API_URL = "http://localhost:5000/api/auth";

export default function Page() {
  const [tab, setTab] = useState("login");
const router = useRouter();
  // ---------------- LOGIN ----------------
  const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");

        localStorage.setItem("token", data.token);
        alert("Login Successful!");
 router.push("/dash"); 
      } catch (err) {
        alert(err.message);
      }
    };

    return (
      <form onSubmit={handleLogin} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          required
        />
        <button className="w-full bg-green-400 hover:bg-green-500 text-white py-3 rounded-xl font-semibold shadow-md transition">
          Sign In
        </button>
      </form>
    );
  };

  // ---------------- REGISTER ----------------
  const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");

        localStorage.setItem("token", data.token);
        alert("Registration Successful!");
         router.push("/dashboard"); 
      } catch (err) {
        alert(err.message);
      }
    };

    return (
      <form onSubmit={handleRegister} className="space-y-5 text-black">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
          required
        />
        <button className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 rounded-xl font-semibold shadow-md transition">
          Register
        </button>
      </form>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-pink-100 to-green-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl relative">
        <h1 className="text-4xl font-bold text-green-500 text-center mb-6">
          Health<span className="text-pink-400">Kaire</span>
        </h1>

        {tab === "login" ? <LoginForm /> : <RegisterForm />}

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setTab("login")}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              tab === "login"
                ? "bg-green-400 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`px-5 py-2 rounded-full font-semibold transition ${
              tab === "register"
                ? "bg-pink-400 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
