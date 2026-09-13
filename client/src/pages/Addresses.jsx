import { useEffect, useState } from "react";
import { Edit, MapPin, Plus, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

import useAddressStore from "../store/addressStore";

const initialFormData = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  isDefault: false,
};

const Addresses = () => {
  const {
    addresses,
    loading,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddressStore();

  const [formData, setFormData] = useState(initialFormData);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getAddresses().catch((error) => {
      toast.error(
        error?.response?.data?.message || "Failed to load addresses.",
      );
    });
  }, [getAddresses]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setShowForm(false);
  };

  const validateForm = () => {
    const {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
      country,
    } = formData;

    if (!fullName.trim()) {
      toast.error("Full name is required.");
      return false;
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      toast.error("Phone number must be 10 digits.");
      return false;
    }

    if (!address.trim()) {
      toast.error("Address is required.");
      return false;
    }

    if (!city.trim()) {
      toast.error("City is required.");
      return false;
    }

    if (!state.trim()) {
      toast.error("State is required.");
      return false;
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      toast.error("Pincode must be 6 digits.");
      return false;
    }

    if (!country.trim()) {
      toast.error("Country is required.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const addressData = {
      ...formData,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      pincode: formData.pincode.trim(),
      country: formData.country.trim(),
    };

    try {
      if (editingId) {
        await updateAddress(editingId, addressData);
        toast.success("Address updated successfully.");
      } else {
        await addAddress(addressData);
        toast.success("Address added successfully.");
      }

      resetForm();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          (editingId
            ? "Failed to update address."
            : "Failed to add address."),
      );
    }
  };

  const handleEdit = (address) => {
    setEditingId(address._id);

    setFormData({
      fullName: address.fullName || "",
      phone: address.phone || "",
      address: address.address || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      country: address.country || "India",
      isDefault: Boolean(address.isDefault),
    });

    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) return;

    try {
      await deleteAddress(id);
      toast.success("Address deleted successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete address.",
      );
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultAddress(id);
      toast.success("Default address updated.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update default address.",
      );
    }
  };

  return (
    <section className="container mx-auto max-w-6xl px-4 py-8 md:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Addresses
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your saved delivery addresses.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingId(null);
            setFormData(initialFormData);
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#c98f84] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#b97d73]"
        >
          <Plus size={18} />
          Add Address
        </button>
      </div>

      {/* Address Form */}
      {showForm && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {editingId ? "Edit Address" : "Add New Address"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter your delivery details below.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
              aria-label="Close form"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#c98f84]"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit phone number"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#c98f84]"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House no., street, locality..."
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#c98f84]"
                />
              </div>

              {/* City */}
              <div>
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  City
                </label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#c98f84]"
                />
              </div>

              {/* State */}
              <div>
                <label
                  htmlFor="state"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  State
                </label>

                <input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#c98f84]"
                />
              </div>

              {/* Pincode */}
              <div>
                <label
                  htmlFor="pincode"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Pincode
                </label>

                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter 6-digit pincode"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#c98f84]"
                />
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Country
                </label>

                <input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#c98f84]"
                />
              </div>
            </div>

            {/* Default Address */}
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="h-4 w-4 accent-[#c98f84]"
              />

              <span className="text-sm font-medium text-gray-700">
                Set as default address
              </span>
            </label>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#c98f84] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#b97d73] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? editingId
                    ? "Updating..."
                    : "Adding..."
                  : editingId
                    ? "Update Address"
                    : "Add Address"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Loading */}
      {loading && addresses.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Loading addresses...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && addresses.length === 0 && !showForm && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8ebe3] text-[#c98f84]">
            <MapPin size={26} />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-gray-800">
            No saved addresses
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Add an address to make checkout faster.
          </p>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="mt-6 rounded-lg bg-[#c98f84] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#b97d73]"
          >
            Add Your First Address
          </button>
        </div>
      )}

      {/* Address List */}
      {addresses.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              {/* Card Header */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8ebe3] text-[#c98f84]">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {address.fullName}
                    </h2>

                    {address.isDefault && (
                      <span className="mt-1 inline-block rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-600">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div className="space-y-1.5 text-sm text-gray-600">
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.state} - {address.pincode}
                </p>
                <p>{address.country}</p>
                <p className="pt-2 font-medium text-gray-700">
                  Phone: {address.phone}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                {!address.isDefault && (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(address._id)}
                    disabled={loading}
                    className="rounded-lg border border-[#dfc2b3] px-3 py-2 text-xs font-semibold text-[#c98f84] transition hover:bg-[#fdf3ed] disabled:opacity-50"
                  >
                    Set Default
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleEdit(address)}
                  className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  <Edit size={14} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(address._id)}
                  disabled={loading}
                  className="flex items-center gap-1.5 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Addresses;