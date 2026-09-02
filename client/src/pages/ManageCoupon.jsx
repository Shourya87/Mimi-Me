import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import CouponTable from "../components/CouponTable";

import useCouponStore from "../store/couponStore";

const ManageCoupons = () => {
  const navigate = useNavigate();

  const {
    coupons,
    loading,
    getCoupons,
    deleteCoupon,
  } = useCouponStore();

  useEffect(() => {
    getCoupons();
  }, [getCoupons]);

  const handleCreate = () => {
    navigate("/admin/coupons/create");
  };

  const handleEdit = (coupon) => {
    navigate(`/admin/coupons/update/${coupon._id}`);
  };

  const handleDelete = async (coupon) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete coupon "${coupon.code}"?`
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteCoupon(coupon._id);

      toast.success(
        response?.message || "Coupon deleted successfully."
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete coupon."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-semibold">
        Loading Coupons...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1">
        <AdminNavbar />

        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Manage Coupons
              </h2>

              <p className="mt-1 text-gray-500">
                Create and manage discount coupons.
              </p>
            </div>

            <button
              onClick={handleCreate}
              className="rounded-lg bg-orange-500 px-5 py-2 text-white transition hover:bg-orange-600"
            >
              + Add Coupon
            </button>
          </div>

          <CouponTable
            coupons={coupons}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  );
};

export default ManageCoupons;