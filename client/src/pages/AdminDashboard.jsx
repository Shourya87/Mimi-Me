import { useEffect } from "react";

import {
  Users,
  Package,
  ShoppingCart,
  Truck,
  Clock,
  IndianRupee,
} from "lucide-react";

import useAdminStore from "../store/adminStore";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import DashboardCard from "../components/DashboardCard";

import formatCurrency from "../utils/formatCurrency";

const AdminDashboard = () => {
  const { stats, loading, getDashboardStats } = useAdminStore();

  useEffect(() => {
    getDashboardStats();
  }, [getDashboardStats]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5F1]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#eadfd5] border-t-[#c98f84]" />

          <p className="text-sm font-medium text-[#6d5b4d]">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8F5F1]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        {/* Navbar */}
        <AdminNavbar title="Dashboard" />

        {/* Dashboard Content */}
        <main className="p-5 sm:p-6 lg:p-8">
          {/* Page Heading */}
          <div className="mb-7">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-6 bg-[#dfc2b3]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                Overview
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-[#6d5b4d] sm:text-3xl">
              Dashboard Overview
            </h1>

            <p className="mt-1.5 text-sm text-[#9a8879]">
              Here's what's happening with your store.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <DashboardCard
              title="Total Users"
              value={stats?.totalUsers || 0}
              icon={Users}
              color="bg-blue-500"
            />

            <DashboardCard
              title="Total Products"
              value={stats?.totalProducts || 0}
              icon={Package}
              color="bg-green-500"
            />

            <DashboardCard
              title="Total Orders"
              value={stats?.totalOrders || 0}
              icon={ShoppingCart}
              color="bg-purple-500"
            />

            <DashboardCard
              title="Delivered Orders"
              value={stats?.deliveredOrders || 0}
              icon={Truck}
              color="bg-emerald-500"
            />

            <DashboardCard
              title="Pending Orders"
              value={stats?.pendingOrders || 0}
              icon={Clock}
              color="bg-yellow-500"
            />

            <DashboardCard
              title="Revenue"
              value={formatCurrency(stats?.totalRevenue)}
              icon={IndianRupee}
              color="bg-pink-500"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
