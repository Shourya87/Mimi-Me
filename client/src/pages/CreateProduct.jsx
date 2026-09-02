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
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminNavbar title="Create Product" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Product
            </h1>

            <p className="mt-1 text-gray-500">
              Add a new product to your store.
            </p>
          </div>

          <ProductForm
            loading={loading}
            submitText="Create Product"
            onSubmit={handleCreateProduct}
          />
        </main>
      </div>
    </div>
  );
};

export default CreateProduct;