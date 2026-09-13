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
            "Failed to fetch product.",
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
        formData,
      );

      toast.success(
        response.message || "Product updated successfully.",
      );

      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update product.",
      );
    }
  };

  if (loading && !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5F1]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#eadfd5] border-t-[#c98f84]" />

          <p className="text-sm font-medium text-[#6d5b4d]">
            Loading Product...
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
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNavbar title="Edit Product" />

        <main className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-6 bg-[#dfc2b3]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                Product Management
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-[#6d5b4d] sm:text-3xl">
              Edit Product
            </h1>

            <p className="mt-1.5 text-sm text-[#9a8879]">
              Update your product details and keep your collection
              up to date.
            </p>
          </div>

          {/* Product Form */}
          {product && (
            <div className="overflow-hidden rounded-2xl border border-[#eadfd5] bg-[#fffaf7] shadow-[0_8px_30px_rgba(109,91,77,0.06)]">
              <div className="border-b border-[#eadfd5] px-5 py-4 sm:px-6">
                <h2 className="text-sm font-semibold text-[#6d5b4d]">
                  Product Information
                </h2>

                <p className="mt-0.5 text-xs text-[#9a8879]">
                  Make changes to your product information below.
                </p>
              </div>

              <div className="p-5 sm:p-6">
                <ProductForm
                  initialData={product}
                  loading={loading}
                  submitText="Update Product"
                  onSubmit={handleUpdateProduct}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}