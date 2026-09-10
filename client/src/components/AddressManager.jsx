import { useEffect, useState } from "react";
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

const AddressManager = () => {
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
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    getAddresses();
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateAddress(editingId, formData);

        toast.success("Address updated successfully.");
      } else {
        await addAddress(formData);

        toast.success("Address added successfully.");
      }

      resetForm();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to save address.",
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
      isDefault: address.isDefault || false,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id);

      toast.success("Address deleted successfully.");

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to delete address.",
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
          error?.message ||
          "Unable to update default address.",
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Address Form */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {editingId ? "Edit Address" : "Add New Address"}
          </h2>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm font-medium text-gray-500 hover:text-gray-800"
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              maxLength={10}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            rows={3}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              maxLength={6}
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="h-4 w-4"
            />

            <span>Make this my default address</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingId
                ? "Update Address"
                : "Add Address"}
          </button>
        </form>
      </div>

      {/* Saved Addresses */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Saved Addresses
        </h2>

        {!addresses?.length ? (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
            <p className="text-gray-500">No saved addresses yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {addresses.map((address) => (
              <div
                key={address._id}
                className={`rounded-xl border bg-white p-5 shadow-sm ${
                  address.isDefault
                    ? "border-orange-500"
                    : "border-gray-200"
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {address.fullName}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {address.phone}
                    </p>
                  </div>

                  {address.isDefault && (
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600">
                      Default
                    </span>
                  )}
                </div>

                <p className="text-sm leading-6 text-gray-600">
                  {address.address}
                  <br />
                  {address.city}, {address.state} - {address.pincode}
                  <br />
                  {address.country}
                </p>

                <div className="mt-5 flex flex-wrap gap-3 border-t pt-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(address)}
                    className="text-sm font-medium text-gray-700 hover:text-orange-500"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(address._id)}
                    disabled={loading}
                    className="text-sm font-medium text-red-500 hover:text-red-600 disabled:opacity-50"
                  >
                    Delete
                  </button>

                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(address._id)}
                      disabled={loading}
                      className="text-sm font-medium text-orange-500 hover:text-orange-600 disabled:opacity-50"
                    >
                      Set Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressManager;