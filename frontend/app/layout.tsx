// frontend/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "RBAC App",
  description: "Role based auth demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-semibold">
              RBAC App
            </a>
            <nav className="space-x-4">
              <a
                href="/signup"
                className="text-sm text-gray-700 hover:underline"
              >
                Signup
              </a>
              <a
                href="/login"
                className="text-sm text-gray-700 hover:underline"
              >
                Login
              </a>
              <a
                href="/dashboard"
                className="text-sm text-gray-700 hover:underline"
              >
                Dashboard
              </a>
            </nav>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
