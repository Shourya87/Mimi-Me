import api from "./api";

// Dashboard
const getDashboardStatsApi = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

// Users
const getAllUsersApi = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

// Delete User
const deleteUserApi = async (id) => {
  const response = await api.delete(`/admin/users/${id}`);
  return response.data;
};

export { getDashboardStatsApi, getAllUsersApi, deleteUserApi };