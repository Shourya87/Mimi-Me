import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import ProductForm from "../components/ProductForm";
import useProductStore from "../store/productStore";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { createProduct, loading } = useProductStore();

  const handleCreateProduct = async (formData) => {
    try {
      const response = await createProduct(formData);

      toast.success(
        response.message || "Product created successfully."
      );

      navigate("/admin/products");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create product."
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F5F1]">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNavbar title="Create Product" />

        <main className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-7">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-6 bg-[#c98f84]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                Product Management
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-[#6d5b4d] sm:text-3xl">
              Create Product
            </h1>

            <p className="mt-1.5 text-sm text-[#9a8879]">
              Add a new product to your store.
            </p>
          </div>

          {/* Product Form */}
          <div className="rounded-2xl border border-[#eadfd5] bg-[#fffaf7] p-5 shadow-[0_8px_30px_rgba(109,91,77,0.05)] sm:p-6">
            <ProductForm
              loading={loading}
              submitText="Create Product"
              onSubmit={handleCreateProduct}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateProduct;