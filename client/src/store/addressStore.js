import { create } from "zustand";

import {
  getAddressesApi,
  addAddressApi,
  updateAddressApi,
  deleteAddressApi,
  setDefaultAddressApi,
} from "../services/address.api";

const useAddressStore = create((set) => ({
  // State
  addresses: [],
  loading: false,
  error: null,

  // Get All Addresses
  getAddresses: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await getAddressesApi();

      set({
        addresses: data.addresses || [],
      });

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to fetch addresses.";

      set({
        error: message,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Add Address
  addAddress: async (addressData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await addAddressApi(addressData);

      set((state) => ({
        addresses: [...state.addresses, data.address],
      }));

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to add address.";

      set({
        error: message,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Update Address
  updateAddress: async (id, addressData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await updateAddressApi(id, addressData);

      set((state) => ({
        addresses: state.addresses.map((address) =>
          address._id === id ? data.address : address,
        ),
      }));

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to update address.";

      set({
        error: message,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Delete Address
  deleteAddress: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await deleteAddressApi(id);

      set((state) => ({
        addresses: state.addresses.filter(
          (address) => address._id !== id,
        ),
      }));

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to delete address.";

      set({
        error: message,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Set Default Address
  setDefaultAddress: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const data = await setDefaultAddressApi(id);

      set((state) => ({
        addresses: state.addresses.map((address) => ({
          ...address,
          isDefault: address._id === id,
        })),
      }));

      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to update default address.";

      set({
        error: message,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Clear Error
  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useAddressStore;