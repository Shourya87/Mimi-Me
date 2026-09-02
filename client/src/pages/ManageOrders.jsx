import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">
          Loading Orders...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="min-w-0 flex-1">
        <AdminNavbar title="Orders" />

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Manage Orders
            </h2>

            <p className="mt-1 text-gray-500">
              View and manage customer orders.
            </p>
          </div>

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