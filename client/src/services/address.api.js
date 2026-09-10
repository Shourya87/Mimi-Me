import api from "./api";

// Get All Addresses
const getAddressesApi = async () => {
  const response = await api.get("/addresses");

  return response.data;
};

// Add Address
const addAddressApi = async (addressData) => {
  const response = await api.post("/addresses", addressData);

  return response.data;
};

// Update Address
const updateAddressApi = async (id, addressData) => {
  const response = await api.patch(`/addresses/${id}`, addressData);

  return response.data;
};

// Delete Address
const deleteAddressApi = async (id) => {
  const response = await api.delete(`/addresses/${id}`);

  return response.data;
};

// Set Default Address
const setDefaultAddressApi = async (id) => {
  const response = await api.patch(`/addresses/${id}/default`);

  return response.data;
};

export {
  getAddressesApi,
  addAddressApi,
  updateAddressApi,
  deleteAddressApi,
  setDefaultAddressApi,
};