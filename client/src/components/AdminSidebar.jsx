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
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-[#eadfd5] bg-[#fffaf7] md:block">
      {/* Logo */}
      <div className="border-b border-[#eadfd5] px-6 py-6">
        <h1 className="text-2xl font-semibold tracking-tight text-[#6d5b4d]">
          Mimi & Me
        </h1>

        <div className="mt-1 flex items-center gap-2">
          <span className="h-px w-5 bg-[#dfc2b3]" />

          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Admin navigation"
        className="space-y-1.5 px-4 py-6"
      >
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b09e90]">
          Management
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-[#f0dfd7] text-[#6d5b4d] shadow-sm"
                    : "text-[#8d7968] hover:bg-[#fdf0ea] hover:text-[#c98f84]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 ${
                      isActive
                        ? "bg-[#fffaf7] text-[#c98f84]"
                        : "bg-[#f8f1ec] text-[#9a8879] group-hover:bg-[#fffaf7] group-hover:text-[#c98f84]"
                    }`}
                  >
                    <Icon size={18} strokeWidth={1.8} />
                  </span>

                  <span>{item.name}</span>

                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#c98f84]" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Brand Note */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-[#eadfd5] px-6 py-5">
        <p className="text-xs leading-5 text-[#a99a8d]">
          Manage your store with simplicity and care.
        </p>
      </div>
    </aside>
  );
};

export default AdminSidebar;