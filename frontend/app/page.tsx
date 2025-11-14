import Image from "next/image";
// app/page.tsx
import Link from "next/link"; // 1. Import the Link component

export default function Home() {
  // 2. No 'use client' or 'useRouter' needed
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {/* Text Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to Our Application
          </h1>
          <p className="mt-2 text-gray-600">
            Please log in or sign up to continue.
          </p>
        </div>

        {/* Buttons Section - Now using <Link> styled as buttons */}
        <div className="mt-8 flex flex-col space-y-4">
          {/* 3. Use <Link> instead of <button> */}
          <Link
            href="/login"
            className="rounded-md bg-blue-600 px-4 py-2 text-center text-lg font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </Link>

          {/* 4. Use <Link> instead of <button> */}
          <Link
            href="/signup"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-lg font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Signup
          </Link>
        </div>
      </div>
    </main>
  );
}
