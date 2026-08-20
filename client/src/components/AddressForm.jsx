export default function AddressForm({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "pincode") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "address") {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };
  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">
        Shipping Address
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            autoComplete="name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={inputClass}
            required
          />
        </div>
        {/* Phone  */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            autoComplete="tel"
            inputMode="numeric"
            maxLength={10}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className={inputClass}
            required
          />
        </div>
        {/* Pincode */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Pincode
          </label>
          <input
            autoComplete="pin-code"
            type="text"
            inputMode="numeric"
            name="pincode"
            maxLength={6}
            value={formData.pincode}
            onChange={handleChange}
            placeholder="300123"
            className={inputClass}
            required
          />
        </div>
        {/* Address */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <textarea
            autoComplete="street-address"
            rows={2}
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House No, Street, Area"
            className={`${inputClass} resize-none overflow-hidden`}
            required
          />
        </div>
        {/* City */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            City
          </label>

          <input
            autoComplete="address-level2"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className={inputClass}
            required
          />
        </div>
        {/* State */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            autoComplete="address-level1"
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className={inputClass}
            required
          />
        </div>
        {/* Country */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="India"
            className={inputClass}
            required
          />
        </div>
      </div>
    </div>
  );
}
