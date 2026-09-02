import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function AdminNavbar({ title }) {
  const navigate = useNavigate();

  const { user, logOut } = useAuthStore();

  // const log = async () => {
  //   console.log(user);
  // };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="font-semibold text-gray-800">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}
