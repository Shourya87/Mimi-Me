import api from "./api";

// Get Cart Item
const getCartApi = async () => {
  const response = await api.get("/cart");
  return response.data;
};


// Add Cart
const addCartApi = async (productId, quantity = 1) => {
  const response = await api.post("/cart/", {
    product: productId,
    quantity,
  });
  return response.data;
};


// Update Cart 
const updateCartApi = async (cartItemId, quantity) => {
  const response = await api.patch(`/cart/${cartItemId}`, {
    quantity,
  });
  return response.data;
};


// Remove Cart
const removeCartApi = async (cartItemId) => {
  const response = await api.delete(`/cart/${cartItemId}`);
  return response.data;
};


// Clear Cart
const clearCartApi = async () => {
  const response = await api.delete("/cart/");
  return response.data;
};


export { 
    getCartApi,
    addCartApi,
    updateCartApi,
    removeCartApi,
    clearCartApi,
}