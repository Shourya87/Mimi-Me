import { NavLink, useNavigate } from "react-router-dom";
import {
  Heart,
  MapPin,
  Package,
  ShoppingBag,
  User,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";

const AccountSidebar = () => {
  const navigate = useNavigate();
  const { logOut, user } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully.");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to logout.",
      );
    }
  };

  const links = [
    {
      name: "My Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "My Orders",
      path: "/orders",
      icon: Package,
    },
    {
      name: "Wishlist",
      path: "/wishlist",
      icon: Heart,
    },
    {
      name: "Cart",
      path: "/cart",
      icon: ShoppingBag,
    },
    {
      name: "Addresses",
      path: "/profile/addresses",
      icon: MapPin,
    },
  ];

  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 border-b border-gray-100 px-3 pb-4">
        <p className="text-sm text-gray-500">Hello,</p>
        <p className="font-semibold text-gray-800">
          {user?.name || "User"}
        </p>
      </div>

      <nav className="space-y-1">
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-[#f8ebe3] text-[#c98f84]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-[#c98f84]"
              }`
            }
          >
            <Icon size={18} />
            <span>{name}</span>
          </NavLink>
        ))}

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-red-50 hover:text-red-500"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default AccountSidebar;