"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        router.refresh();
        router.push("/admin");
      } else {
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#f4f1ea] px-4">
      <div className="w-full max-w-md rounded-2xl border-4 border-black bg-white p-6 shadow-gumroad-lg sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-3 border-black bg-[#ffc700] shadow-gumroad-sm mb-4">
            <Lock className="h-6 w-6 text-black stroke-[2.5]" />
          </div>
          <h1 className="font-heading text-2xl font-black text-black">Admin Panel Gate</h1>
          <p className="mt-2 text-sm font-bold text-zinc-700">Enter the admin password to unlock management dashboards.</p>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          {error && (
            <div className="rounded-xl border-2 border-black bg-red-100 p-3 text-sm font-bold text-red-700 shadow-gumroad-sm">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-black uppercase text-black mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-11 w-full rounded-xl border-2 border-black bg-white px-3 font-bold text-black focus:outline-none placeholder:text-zinc-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-gumroad w-full py-3.5 text-xs font-black uppercase tracking-wider gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Unlocking...
              </>
            ) : (
              "Unlock Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
