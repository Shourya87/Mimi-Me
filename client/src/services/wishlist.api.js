import api from "./api";


// Get Wishlist
const getWishlistApi = async () => {
  const response = await api.get("/wishlist/");
  return response.data;
};

// Add to Wishlist
const addWishlistApi = async (product) => {
  const response = await api.post("/wishlist", {
    product,
  });
  return response.data;
};

// Remove from Wishlist
const removeWishlistApi = async (product) => {
  const response = await api.delete(`/wishlist/${product}`);
  return response.data;
};

// Clear Wishlist
const clearWishlistApi = async () => {
  const response = await api.delete("/wishlist/");
  return response.data;
};


export {
    getWishlistApi,
    addWishlistApi,
    removeWishlistApi,
    clearWishlistApi,
}