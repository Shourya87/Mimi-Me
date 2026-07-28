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

const AdminDashboard = () => {
  const { stats, loading, getDashboardStats } = useAdminStore();

  useEffect(() => {
    getDashboardStats();
  }, [getDashboardStats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <AdminNavbar />

        {/* Dashboard */}
        <main className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Dashboard Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
              value={`₹${stats?.totalRevenue || 0}`}
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