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

  // Get Addresses
  getAddresses: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const data = await getAddressesApi();

      set({
        addresses: data.addresses,
      });

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
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
    set({
      loading: true,
      error: null,
    });

    try {
      const data = await addAddressApi(addressData);

      set((state) => ({
        addresses: [...state.addresses, data.address],
      }));

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
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
    set({
      loading: true,
      error: null,
    });

    try {
      const data = await updateAddressApi(id, addressData);

      set((state) => ({
        addresses: state.addresses.map((address) =>
          address._id === id ? data.address : address,
        ),
      }));

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
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
    set({
      loading: true,
      error: null,
    });

    try {
      const data = await deleteAddressApi(id);

      set((state) => ({
        addresses: state.addresses.filter(
          (address) => address._id !== id,
        ),
      }));

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
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
    set({
      loading: true,
      error: null,
    });

    try {
      const data = await setDefaultAddressApi(id);

      set((state) => ({
        addresses: state.addresses.map((address) => ({
          ...address,
          isDefault: address._id === id,
        })),
      }));

      return data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
      });

      throw error;
    } finally {
      set({
        loading: false,
      });
    }
  },

  // Clear Addresses
  clearAddresses: () => {
    set({
      addresses: [],
    });
  },

  // Clear Error
  clearError: () => {
    set({
      error: null,
    });
  },
}));

export default useAddressStore;