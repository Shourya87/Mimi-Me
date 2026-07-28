import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useOrderStore from "../store/orderStore";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import OrderTable from "../components/OrderTable";

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
      "Enter New Status:\n\nPending\nProcessing\nShipped\nDelivered\nCancelled",
      order.orderStatus
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
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <div className="flex-1">
        <AdminNavbar />

        <main className="p-6">
          <h2 className="text-3xl font-bold mb-6">
            Manage Orders
          </h2>

          <OrderTable
            orders={orders}
            onView={handleView}
            onUpdateStatus={handleUpdateStatus}
          />
        </main>
      </div>
    </div>
  );
};

export default ManageOrders;