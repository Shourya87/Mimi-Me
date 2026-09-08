import api from "./api";

// SignUp
const signUpApi = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

// Verify OTP
const verifyOtpApi = async (otpData) => {
  const response = await api.post("/auth/verify-otp", otpData);
  return response.data;
};

// Login
const logInApi = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

// Logout
const logOutApi = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// Get Current User
const getCurrentUserApi = async () => {
  const response = await api.get("/auth/user");
  return response.data;
};

// Update Profile
const updateProfileApi = async (profileData) => {
  const response = await api.patch("/auth/profile", profileData);
  return response.data;
};

// Change Password
const changePasswordApi = async (passwordData) => {
  const response = await api.patch("/auth/change-password", passwordData);
  return response.data;
};

// Forgot Password
const forgotPasswordApi = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

// Reset Password
const resetPasswordApi = async (token, password) => {
  const response = await api.post(`/auth/reset-password/${token}`, {
    password,
  });
  return response.data;
};

export {
  signUpApi,
  verifyOtpApi,
  logInApi,
  logOutApi,
  getCurrentUserApi,
  updateProfileApi,
  changePasswordApi,
  forgotPasswordApi,
  resetPasswordApi,
};
