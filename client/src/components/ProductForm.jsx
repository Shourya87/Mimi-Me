import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";

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

const CATEGORY_OPTIONS = [
  "Women",
  "Girls",
  "Babies",
  "New Arrivals",
  "Accessories",
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

  useEffect(() => {
    return () => {
      previewImages.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [previewImages]);

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
        ? prev.sizes.filter((item) => item !== size)
        : [...prev.sizes, size],
    }));
  };

  const toggleColor = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((item) => item !== color)
        : [...prev.colors, color],
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const totalImages =
      existingImages.length + newImages.length + files.length;

    if (totalImages > 5) {
      e.target.value = "";
      return;
    }

    setNewImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    setPreviewImages((prev) => [...prev, ...previews]);

    e.target.value = "";
  };

  const removeNewImage = (index) => {
    const image = previewImages[index];

    if (image?.url) {
      URL.revokeObjectURL(image.url);
    }

    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    if (initialData) {
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
    } else {
      setFormData({
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

      setExistingImages([]);
    }

    previewImages.forEach((image) => {
      if (image?.url) URL.revokeObjectURL(image.url);
    });

    setNewImages([]);
    setPreviewImages([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title.trim());
    data.append("description", formData.description.trim());
    data.append("price", formData.price);
    data.append("discountPrice", formData.discountPrice);
    data.append("brand", formData.brand.trim());
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("isFeatured", formData.isFeatured);

    formData.sizes.forEach((size) => {
      data.append("sizes", size);
    });

    formData.colors.forEach((color) => {
      data.append("colors", color);
    });

    newImages.forEach((image) => {
      data.append("images", image);
    });

    if (onSubmit) {
      onSubmit(data, existingImages);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#eadfd5] bg-[#fffaf7] px-4 py-3 text-sm text-[#6d5b4d] outline-none transition placeholder:text-[#b5a69a] focus:border-[#c98f84] focus:ring-2 focus:ring-[#c98f84]/10";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#6d5b4d]";

  const sectionClass =
    "rounded-2xl border border-[#eadfd5] bg-white p-5 shadow-[0_6px_24px_rgba(109,91,77,0.04)] sm:p-6";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Information */}
      <section className={sectionClass}>
        <div className="mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c98f84]">
            Product Details
          </p>
          <h2 className="mt-1 text-xl font-semibold text-[#6d5b4d]">
            Product Information
          </h2>
          <p className="mt-1 text-sm text-[#9a8879]">
            Add the basic information for your product.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              placeholder="Cute Baby Dress"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className={inputClass}
              placeholder="Mimi & Me"
            />
          </div>

          <div>
            <label className={labelClass}>Price</label>
            <input
              type="number"
              min={0}
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={inputClass}
              placeholder="999"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Discount Price</label>
            <input
              type="number"
              min={0}
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              className={inputClass}
              placeholder="799"
            />
          </div>

          <div>
            <label className={labelClass}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
            >
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Stock</label>
            <input
              type="number"
              name="stock"
              min={0}
              value={formData.stock}
              onChange={handleChange}
              className={inputClass}
              placeholder="0"
            />
          </div>
        </div>

        <div className="mt-5">
          <label className={labelClass}>Description</label>
          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
            placeholder="Write a clear description for your product..."
            required
          />
        </div>
      </section>

      {/* Product Options */}
      <section className={sectionClass}>
        <div className="mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c98f84]">
            Product Options
          </p>
          <h2 className="mt-1 text-xl font-semibold text-[#6d5b4d]">
            Sizes & Colors
          </h2>
        </div>

        {/* Featured */}
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#eadfd5] bg-[#fffaf7] px-4 py-3">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="h-4 w-4 accent-[#c98f84]"
          />

          <div>
            <p className="text-sm font-medium text-[#6d5b4d]">
              Featured Product
            </p>
            <p className="text-xs text-[#9a8879]">
              Show this product in the featured collection.
            </p>
          </div>
        </label>

        {/* Sizes */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-[#6d5b4d]">
            Available Sizes
          </h3>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {SIZE_OPTIONS.map((size) => {
              const selected = formData.sizes.includes(size);

              return (
                <label
                  key={size}
                  className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition ${
                    selected
                      ? "border-[#c98f84] bg-[#c98f84] text-white shadow-sm"
                      : "border-[#eadfd5] bg-[#fffaf7] text-[#7d6a59] hover:border-[#dfc2b3] hover:bg-[#f8ebe3]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleSize(size)}
                    className="hidden"
                  />

                  {size}
                </label>
              );
            })}
          </div>
        </div>

        {/* Colors */}
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-[#6d5b4d]">
            Available Colors
          </h3>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
            {COLOR_OPTIONS.map((color) => {
              const selected = formData.colors.includes(color);

              return (
                <label
                  key={color}
                  className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition ${
                    selected
                      ? "border-[#c98f84] bg-[#c98f84] text-white shadow-sm"
                      : "border-[#eadfd5] bg-[#fffaf7] text-[#7d6a59] hover:border-[#dfc2b3] hover:bg-[#f8ebe3]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleColor(color)}
                    className="hidden"
                  />

                  {color}
                </label>
              );
            })}
          </div>
        </div>
      </section>

      {/* Images */}
      <section className={sectionClass}>
        <div className="mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c98f84]">
            Visuals
          </p>
          <h2 className="mt-1 text-xl font-semibold text-[#6d5b4d]">
            Product Images
          </h2>
          <p className="mt-1 text-sm text-[#9a8879]">
            Add up to 5 product images.
          </p>
        </div>

        <label className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#dfc2b3] bg-[#fffaf7] px-6 text-center transition hover:border-[#c98f84] hover:bg-[#fdf3ed]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8ebe3] text-[#c98f84]">
            <Upload size={22} />
          </div>

          <p className="mt-4 text-sm font-medium text-[#6d5b4d]">
            Click to upload product images
          </p>

          <p className="mt-1 text-xs text-[#9a8879]">
            PNG, JPG or WEBP · Maximum 5 images
          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold text-[#6d5b4d]">
              Existing Images
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {existingImages.map((image, index) => (
                <div
                  key={`${image.url}-${index}`}
                  className="group relative overflow-hidden rounded-xl border border-[#eadfd5] bg-[#fffaf7]"
                >
                  <img
                    src={image.url}
                    alt={`Product ${index + 1}`}
                    className="h-36 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#9a665e] shadow-sm transition hover:bg-[#c98f84] hover:text-white"
                    aria-label="Remove existing image"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Images */}
        {previewImages.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold text-[#6d5b4d]">
              New Images
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {previewImages.map((image, index) => (
                <div
                  key={`${image.url}-${index}`}
                  className="relative overflow-hidden rounded-xl border border-[#eadfd5] bg-[#fffaf7]"
                >
                  <img
                    src={image.url}
                    alt={`New product ${index + 1}`}
                    className="h-36 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#9a665e] shadow-sm transition hover:bg-[#c98f84] hover:text-white"
                    aria-label="Remove new image"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#eadfd5] pt-5 text-xs text-[#9a8879]">
          <span>
            Sizes:{" "}
            <strong className="font-semibold text-[#6d5b4d]">
              {formData.sizes.length}
            </strong>
          </span>

          <span>
            Colors:{" "}
            <strong className="font-semibold text-[#6d5b4d]">
              {formData.colors.length}
            </strong>
          </span>

          <span>
            Images:{" "}
            <strong className="font-semibold text-[#6d5b4d]">
              {existingImages.length + previewImages.length}
            </strong>
          </span>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-[#eadfd5] pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="rounded-xl border border-[#dfc2b3] bg-[#fffaf7] px-6 py-3 text-sm font-medium text-[#7d6a59] transition hover:border-[#c98f84] hover:bg-[#f8ebe3] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#c98f84] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b97d73] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Please wait..." : submitText}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;