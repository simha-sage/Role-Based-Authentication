// frontend/app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 1. Import the router

export default function LoginPage() {
  const router = useRouter(); // 2. Initialize the router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // ... other state ...

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // This is correct!
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // 3. Use router.push() instead of window.location
        router.push("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="w-full px-3 py-2 border rounded"
        />
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full px-3 py-2 border rounded"
        />

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
