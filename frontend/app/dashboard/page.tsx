// frontend/app/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";

type User = { id: string; name: string; email: string; role: string };

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include",
        });
        if (!res.ok) {
          // not authenticated -> redirect to login
          window.location.href = "/login";
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleLogout() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  }

  if (loading) return <div className="text-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">
          Welcome, {user.name} ({user.role})
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <p className="text-gray-600">Email: {user.email}</p>

      {user.role === "admin" && (
        <div className="mt-6 p-4 bg-gray-50 rounded border">
          <h2 className="font-medium">Admin area</h2>
          <p className="text-sm text-gray-600">
            You can add admin-specific UI here.
          </p>
        </div>
      )}
    </div>
  );
}
