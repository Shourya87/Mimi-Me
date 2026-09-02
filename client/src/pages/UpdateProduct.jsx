import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import ProductForm from "../components/ProductForm";
import useProductStore from "../store/productStore";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const {
    product,
    loading,
    getProductBySlug,
    updateProduct,
    clearProduct,
  } = useProductStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await getProductBySlug(slug);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to fetch product."
        );

        navigate("/admin/products");
      }
    };

    fetchProduct();

    return () => {
      clearProduct();
    };
  }, [slug, getProductBySlug, navigate, clearProduct]);

  const handleUpdateProduct = async (formData) => {
    if (!product?._id) return;

    try {
      const response = await updateProduct(
        product._id,
        formData
      );

      toast.success(
        response.message ||
          "Product updated successfully."
      );

      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update product."
      );
    }
  };

  if (loading && !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-700">
          Loading Product...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNavbar title="Edit Product" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Edit Product
            </h1>

            <p className="mt-1 text-gray-500">
              Update your product details.
            </p>
          </div>

          {product && (
            <ProductForm
              initialData={product}
              loading={loading}
              submitText="Update Product"
              onSubmit={handleUpdateProduct}
            />
          )}
        </main>
      </div>
    </div>
  );
}