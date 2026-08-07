"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function login(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href =
      "/dashboard/whatsapp";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">

      <form
        onSubmit={login}
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8"
      >

        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Admin Login
        </h1>

        <p className="mb-8 text-center text-slate-400">
          RISNAR WhatsApp CRM
        </p>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 text-white outline-none focus:border-green-500"
            required
          />

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 pr-12 text-white outline-none focus:border-green-500"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-xl bg-green-600 font-semibold text-white transition hover:bg-green-500 disabled:opacity-50"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </div>

      </form>

    </div>
  );
}