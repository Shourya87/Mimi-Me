import { useEffect } from "react";
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
      `Delete "${product.name}"?`
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
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading Products...
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">
              Manage Products
            </h2>

            <button
              onClick={() => navigate("/admin/products/create")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
            >
              + Add Product
            </button>
          </div>

          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  );
};