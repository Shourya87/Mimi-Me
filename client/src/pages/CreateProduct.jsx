import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import ProductForm from "../components/ProductForm";

import useProductStore from "../store/productStore";

const CreateProduct = () => {
  const navigate = useNavigate();

  const {
    createProduct,
    loading,
  } = useProductStore();

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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}

      <AdminSidebar />

      {/* Main Content */}

      <div className="flex-1 flex flex-col">

        <AdminNavbar />

        <main className="flex-1 p-6 overflow-y-auto">

          <div className="mb-6">

            <h1 className="text-3xl font-bold">
              Create Product
            </h1>

            <p className="text-gray-500 mt-1">
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