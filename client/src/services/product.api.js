import api from "./api";


// Get Products
const getProductsApi = async () => {
    const response = await api.get("/products/");
    return response.data;
}


// Get Product By Slug
const getProductBySlugApi = async (slug) => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
}


// Create Product
const createProductApi = async (formData) => {
    const response = await api.post("/products/", formData);
    return response.data;
}


// Update Product
const updateProductApi = async (id, formData) => {
    const response = await api.patch(`/products/${id}`, formData);
    return response.data;
}


// Delete Product
const deleteProductApi = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
}


export {
    getProductsApi,
    getProductBySlugApi,
    createProductApi,
    updateProductApi,
    deleteProductApi,
}