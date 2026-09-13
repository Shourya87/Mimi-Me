import { useEffect } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useProductStore from "../store/productStore";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import ProductTable from "../components/ProductTable";

export default function ManageProducts() {
  const navigate = useNavigate();

  const {
    products,
    loading,
    getProducts,
    deleteProduct,
  } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleEdit = (product) => {
    navigate(`/admin/products/update/${product.slug}`);
  };

  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(
      `Delete "${product.title}"?`,
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(product._id);
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
            Loading Products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8F5F1]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main */}
      <div className="min-w-0 flex-1">
        <AdminNavbar title="Products" />

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
                Manage Products
              </h1>

              <p className="mt-1.5 text-sm text-[#9a8879]">
                Add, update, and manage products in your store.
              </p>
            </div>

            {/* Add Product */}
            <button
              type="button"
              onClick={() => navigate("/admin/products/create")}
              className="group flex w-fit items-center gap-2 rounded-xl bg-[#6d5b4d] px-5 py-3 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#594a3f] hover:shadow-md"
            >
              <Plus
                size={18}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:rotate-90"
              />

              Add Product
            </button>
          </div>

          {/* Products Table */}
          <div className="overflow-hidden rounded-2xl border border-[#eadfd5] bg-[#fffaf7] shadow-[0_8px_30px_rgba(109,91,77,0.05)]">
            <ProductTable
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>
    </div>
  );
}