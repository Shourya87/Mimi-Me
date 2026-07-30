import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "react-hot-toast";

const SIZE_OPTIONS = [
  "0-3M",
  "3-6M",
  "6-9M",
  "9-12M",
  "12-18M",
  "18-24M",
  "2-3Y",
  "3-4Y",
  "4-5Y",
];

const COLOR_OPTIONS = [
  "White",
  "Black",
  "Pink",
  "Blue",
  "Yellow",
  "Green",
  "Red",
  "Purple",
  "Grey",
  "Brown",
];

const ProductForm = ({
  initialData = null,
  onSubmit,
  loading = false,
  submitText = "Create Product",
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discountPrice: "",
    brand: "Mimi & Me",
    category: "Babies",
    stock: 0,
    isFeatured: false,
    sizes: [],
    colors: [],
  });

  const [newImages, setNewImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (!initialData) return;

    setFormData({
      title: initialData.title || "",
      description: initialData.description || "",
      price: initialData.price || "",
      discountPrice: initialData.discountPrice || "",
      brand: initialData.brand || "Mimi & Me",
      category: initialData.category || "Babies",
      stock: initialData.stock || 0,
      isFeatured: initialData.isFeatured || false,
      sizes: initialData.sizes || [],
      colors: initialData.colors || [],
    });

    setExistingImages(initialData.images || []);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleColor = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setNewImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const removeNewImage = (index) => {
    const updatedFiles = [...newImages];
    const updatedPreview = [...previewImages];

    URL.revokeObjectURL(updatedPreview[index].url);

    updatedFiles.splice(index, 1);
    updatedPreview.splice(index, 1);

    setNewImages(updatedFiles);
    setPreviewImages(updatedPreview);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("discountPrice", formData.discountPrice);
    data.append("brand", formData.brand);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("isFeatured", formData.isFeatured);

    formData.sizes.forEach((size) => data.append("sizes", size));

    formData.colors.forEach((color) => data.append("colors", color));

    newImages.forEach((image) => data.append("images", image));

    if (onSubmit) {
      onSubmit(data, existingImages);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white rounded-xl shadow p-8"
    >
      <div>
        <h2 className="text-2xl font-bold">Product Information</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Title */}

        <div>
          <label className="block mb-2 font-medium">Product Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Cute Baby Dress"
            required
          />
        </div>

        {/* Brand */}

        <div>
          <label className="block mb-2 font-medium">Brand</label>

          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Price */}

        <div>
          <label className="block mb-2 font-medium">Price</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

        {/* Discount */}

        <div>
          <label className="block mb-2 font-medium">Discount Price</label>

          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Category */}

        <div>
          <label className="block mb-2 font-medium">Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option>Babies</option>
            <option>Girls</option>
            <option>Women</option>
          </select>
        </div>

        {/* Stock */}

        <div>
          <label className="block mb-2 font-medium">Stock</label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>
      </div>

      {/* Description */}

      <div>
        <label className="block mb-2 font-medium">Description</label>

        <textarea
          rows={6}
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3 resize-none"
          placeholder="Write product description..."
          required
        />
      </div>

      {/* Featured */}

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="isFeatured"
          checked={formData.isFeatured}
          onChange={handleChange}
        />

        <span className="font-medium">Featured Product</span>
      </label>

      {/* Remaining UI (Sizes, Colors, Images, Submit Button)
          will be added in Part 2 */}

      {/* Sizes */}

      <div>
        <h3 className="text-lg font-semibold mb-4">Available Sizes</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {SIZE_OPTIONS.map((size) => (
            <label
              key={size}
              className={`border rounded-lg px-4 py-3 text-center cursor-pointer transition
                ${
                  formData.sizes.includes(size)
                    ? "bg-pink-500 text-white border-pink-500"
                    : "hover:border-pink-400"
                }`}
            >
              <input
                type="checkbox"
                checked={formData.sizes.includes(size)}
                onChange={() => toggleSize(size)}
                className="hidden"
              />

              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Colors */}

      <div>
        <h3 className="text-lg font-semibold mb-4">Available Colors</h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {COLOR_OPTIONS.map((color) => (
            <label
              key={color}
              className={`border rounded-lg px-4 py-3 text-center cursor-pointer transition
                ${
                  formData.colors.includes(color)
                    ? "bg-pink-500 text-white border-pink-500"
                    : "hover:border-pink-400"
                }`}
            >
              <input
                type="checkbox"
                checked={formData.colors.includes(color)}
                onChange={() => toggleColor(color)}
                className="hidden"
              />

              {color}
            </label>
          ))}
        </div>
      </div>

      {/* Upload Images */}

      <div>
        <h3 className="text-lg font-semibold mb-4">Product Images</h3>

        <label className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-pink-400 transition">
          <Upload size={42} />

          <p className="mt-3 text-gray-600">Click to upload product images</p>

          <p className="text-sm text-gray-400">Maximum 5 images</p>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Existing Images (Edit Mode) */}

      {existingImages.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Existing Images</h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {existingImages.map((image, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden border"
              >
                <img
                  src={image.url}
                  alt=""
                  className="w-full h-40 object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Newly Selected Images */}

      {previewImages.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">New Images</h3>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {previewImages.map((image, index) => (
              <div
                key={index}
                className="relative rounded-xl overflow-hidden border"
              >
                <img
                  src={image.url}
                  alt=""
                  className="w-full h-40 object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t pt-6">
        <p className="text-sm text-gray-500">
          Selected Sizes:{" "}
          <span className="font-medium">{formData.sizes.length || 0}</span>
          <span className="mx-4">|</span>
          Selected Colors:{" "}
          <span className="font-medium">{formData.colors.length || 0}</span>
          <span className="mx-4">|</span>
          Images:{" "}
          <span className="font-medium">
            {existingImages.length + previewImages.length}
          </span>
        </p>
      </div>
      <div className="flex justify-end gap-4 border-t pt-6">
        <button
          type="reset"
          className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition"
        >
          {loading ? "Please wait..." : submitText}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
