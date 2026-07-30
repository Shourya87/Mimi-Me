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
  }, [slug]);

  const handleUpdateProduct = async (formData) => {
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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">
          Loading Product...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminNavbar />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              Edit Product
            </h1>

            <p className="text-gray-500 mt-1">
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
};