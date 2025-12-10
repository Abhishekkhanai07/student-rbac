import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import LoginBackground from "@/components/LoginBackground";
import "@/components/LoginBackground.css";
import LoginTyping from "@/components/LoginTyping";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  function submit(e) {
    e.preventDefault();
    const res = login(email, password);
    if (res.error) return setErr(res.error);
    nav("/");
  }

 return (
  <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-center">

    {/* 🔥 Background */}
    <LoginBackground />

    {/* ✔ LEFT SIDE — Login Form */}
    <div className="relative z-10 w-full max-w-md p-6 md:w-1/2 flex justify-center">
      <form
        onSubmit={submit}
        className="
          w-full p-8 rounded-2xl
          bg-white/20 backdrop-blur-xl 
          shadow-[0_8px_25px_rgba(0,0,0,0.45)]
          border border-white/30
          transform transition-all duration-300
          hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.55)]
        "
      >

        <h2 className="
          text-3xl font-bold mb-6 text-center 
          bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent
        ">
          Sign In
        </h2>

        {err && <div className="text-red-600 mb-3 text-center">{err}</div>}

        <label className="block mb-4">
          <div className="text-sm text-gray-200 mb-1">Email</div>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="
              bg-white/60 border-white/40 
              focus:ring-2 focus:ring-purple-400 focus:border-purple-400
              transition-all
            "
          />
        </label>

        <label className="block mb-6">
          <div className="text-sm text-gray-200 mb-1">Password</div>
          <Input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="
              bg-white/60 border-white/40 
              focus:ring-2 focus:ring-purple-400 focus:border-purple-400
              transition-all
            "
          />
        </label>

        <Button
          type="submit"
          className="
            w-full py-2 text-md font-semibold
            bg-gradient-to-r from-purple-600 to-blue-500
            hover:from-purple-700 hover:to-blue-600
            transition-all duration-300
            shadow-[0_4px_15px_rgba(0,0,0,0.3)]
            hover:shadow-[0_8px_25px_rgba(0,0,0,0.45)]
            rounded-xl
          "
        >
          Sign in
        </Button>

        <div className="text-xs text-gray-200 mt-4 text-center opacity-80">
          Try: admin@school.com / admin123
        </div>

      </form>
    </div>

    {/* ✔ RIGHT SIDE — Typing Animation */}
    <div className="relative z-10 hidden md:flex md:w-1/2 justify-center items-center p-10">
      <LoginTyping />
    </div>

  </div>
);

}





