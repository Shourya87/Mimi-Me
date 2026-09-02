import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Ticket,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Coupons",
    path: "/admin/coupons",
    icon: Ticket,
  },
];

const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-orange-600">Mimi & Me</h1>
        <p className="px-2 text-sm text-gray-500">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav aria-label="Admin navigation" className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-gray-700 hover:bg-pink-50 hover:text-orange-600"
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
