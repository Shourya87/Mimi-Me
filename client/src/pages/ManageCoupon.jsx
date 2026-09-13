import { useEffect } from "react";
import { Plus } from "lucide-react";
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
      `Are you sure you want to delete coupon "${coupon.code}"?`,
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteCoupon(coupon._id);

      toast.success(
        response?.message || "Coupon deleted successfully.",
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete coupon.",
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5F1]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#eadfd5] border-t-[#c98f84]" />

          <p className="text-sm font-medium text-[#6d5b4d]">
            Loading Coupons...
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
        <AdminNavbar title="Coupons" />

        <main className="p-5 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-px w-6 bg-[#dfc2b3]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                  Store Management
                </span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-[#6d5b4d] sm:text-3xl">
                Manage Coupons
              </h1>

              <p className="mt-1.5 text-sm text-[#9a8879]">
                Create and manage discount coupons for your store.
              </p>
            </div>

            {/* Add Coupon */}
            <button
              type="button"
              onClick={handleCreate}
              className="group flex w-fit items-center gap-2 rounded-xl bg-[#6d5b4d] px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#594a3f] hover:shadow-md"
            >
              <Plus
                size={18}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:rotate-90"
              />

              Add Coupon
            </button>
          </div>

          {/* Coupons Table */}
          <div className="overflow-hidden rounded-2xl border border-[#eadfd5] bg-[#fffaf7] shadow-[0_8px_30px_rgba(109,91,77,0.05)]">
            <CouponTable
              coupons={coupons}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageCoupons;