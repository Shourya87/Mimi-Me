import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

export default function AdminNavbar({ title }) {
  const navigate = useNavigate();

  const { user, logOut } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-[#eadfd5] bg-[#fffaf7]/95 px-5 shadow-[0_2px_12px_rgba(109,91,77,0.04)] backdrop-blur-xl sm:px-6 lg:px-8">
      {/* Page Title */}
      <div>
        <p className="mb-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
          Admin Panel
        </p>

        <h1 className="text-xl font-semibold tracking-tight text-[#6d5b4d] sm:text-2xl">
          {title}
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* User Info */}
        <div className="hidden items-center gap-3 sm:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfcfc3] bg-[#f8ebe3] text-[#c98f84]">
            <User size={18} strokeWidth={1.8} />
          </div>

          <div className="text-right">
            <p className="max-w-[180px] truncate text-sm font-semibold text-[#6d5b4d]">
              {user?.name || "Admin"}
            </p>

            <p className="max-w-[200px] truncate text-xs text-[#9a8879]">
              {user?.email || ""}
            </p>
          </div>
        </div>

        {/* Mobile User Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfcfc3] bg-[#f8ebe3] text-[#c98f84] sm:hidden">
          <User size={18} strokeWidth={1.8} />
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="group flex h-10 items-center gap-2 rounded-full border border-[#dfcfc3] bg-[#fffaf5] px-3.5 text-sm font-medium text-[#7d6a59] transition-all duration-300 hover:border-[#d8b9ae] hover:bg-[#f8ebe3] hover:text-[#c98f84]"
        >
          <LogOut
            size={17}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />

          <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}