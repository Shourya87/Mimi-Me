import api from "./api";


// Get Categories
const getCategoriesApi = async () => {
    const response = await api.get("/categories/");
    return response.data;
}


// Get Category By Slug
const getCategoryBySlugApi = async (slug) => {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
}


// Create Category
const createCategoryApi = async (formData) => {
    const response = await api.post("/categories/", formData);
    return response.data;
}


// Update Category
const updateCategoryApi = async (id, formData) => {
    const response = await api.patch(`/categories/${id}`, formData);
    return response.data;
}


// Delete Category
const deleteCategoryApi = async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
}


export {
    getCategoriesApi,
    getCategoryBySlugApi,
    createCategoryApi,
    updateCategoryApi,
    deleteCategoryApi,
}