import api from "./api";




// Create Order
const createOrderApi = async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
}

// Get My Order
const getMyOrdersApi = async () => {
    const response = await api.get('/orders');
    return response.data;
}

// Get Order By Id
const getOrderByIdApi = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Clear Order
const cancelOrderApi = async (id) => {
  const response = await api.patch(`/orders/${id}/cancel`);
  return response.data;
};

// Get All Orders 
const getAllOrdersApi = async () => {
    const response = await api.get("/orders/admin");
    return response.data;
}

// Update Order
const updateOrderStatusApi = async (id, orderData) => {
    const response = await api.patch(`/orders/admin/${id}`, orderData);
    return response.data;
}


export {
    getAllOrdersApi,
    getOrderByIdApi,
    getMyOrdersApi,
    createOrderApi,
    updateOrderStatusApi,
    cancelOrderApi,
}