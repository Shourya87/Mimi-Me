import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-bold text-gray-900">404</p>

        <h1 className="mt-4 text-2xl font-semibold text-gray-900">
          Page Not Found
        </h1>

        <p className="mt-2 text-gray-500">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Home size={17} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}