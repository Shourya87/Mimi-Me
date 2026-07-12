import api from "./api";


// SignUp
export const signUpApi = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};


// Verify OTP
export const verifyOtpApi = async (otpData) => {
  const response = await api.post("/auth/verify-otp", otpData);
  return response.data;
};


// Login
export const logInApi = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};


// Logout
export const logOutApi = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// Get Current User
export const getCurrentUserApi = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};