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
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        {/* Navbar */}
        <AdminNavbar title="Dashboard" />

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h2>

            <p className="mt-1 text-gray-500">
              Here's what's happening with your store.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
