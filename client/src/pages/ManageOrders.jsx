import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, RefreshCw } from "lucide-react";

import useOrderStore from "../store/orderStore";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import OrderTable from "../components/OrderTable";

import { ORDER_STATUSES } from "../constants/order";

const ManageOrders = () => {
  const navigate = useNavigate();

  const {
    orders,
    loading,
    getAllOrders,
    updateOrderStatus,
  } = useOrderStore();

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  const handleView = (order) => {
    navigate(`/orders/${order._id}`);
  };

  const handleUpdateStatus = async (order) => {
    const status = prompt(
      `Enter New Status:\n\n${ORDER_STATUSES.join("\n")}`,
      order.orderStatus,
    );

    if (!status) return;

    try {
      await updateOrderStatus(order._id, {
        orderStatus: status,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5F1]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#eadfd5] border-t-[#c98f84]" />

          <p className="text-sm font-medium text-[#6d5b4d]">
            Loading Orders...
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
        <AdminNavbar title="Orders" />

        <main className="p-5 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-7">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-6 bg-[#dfc2b3]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                Store Management
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-[#6d5b4d] sm:text-3xl">
              Manage Orders
            </h1>

            <p className="mt-1.5 text-sm text-[#9a8879]">
              View and manage customer orders.
            </p>
          </div>

          {/* Orders Table */}
          <div className="overflow-hidden rounded-2xl border border-[#eadfd5] bg-[#fffaf7] shadow-[0_8px_30px_rgba(109,91,77,0.05)]">
            <OrderTable
              orders={orders}
              onView={handleView}
              onUpdateStatus={handleUpdateStatus}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageOrders;