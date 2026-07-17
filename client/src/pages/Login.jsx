import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import logo from "../assets/logo.png";
import useAuthStore from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.logIn);
  const loading = useAuthStore((state) => state.loading);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (formData) => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields.", {
        id: "login-validation",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email.", {
        id: "email-validation",
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.", {
        id: "login-password-length",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(formData)) return;

    try {
      const data = await login(formData);

      showSuccessToast(data.title, data.message, "login-success");

      navigate("/");
    } catch (error) {
      showErrorToast(
        "Login Failed",
        error.response?.data?.message || "Something went wrong.",
        "login-error",
      );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F8F5F1] via-[#FCFAF7] to-[#F2ECE5] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <img
              src={logo}
              alt="Mimi & Me"
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* Heading */}
          <h1 className="logo-font text-5xl font-semibold tracking-tight text-center text-stone-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-center text-sm leading-6 text-stone-500">
            Log in to continue your journey with Mimi & Me.
          </p>

          {/* Login Form */}
          <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-stone-700"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-11 pr-4 outline-none transition-all focus:border-stone-600 focus:ring-4 focus:ring-stone-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-stone-700"
              >
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-11 pr-12 outline-none transition-all focus:border-stone-600 focus:ring-4 focus:ring-stone-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-stone-700 hover:text-stone-900 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3 font-medium text-white transition-all hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Logging In...
                </>
              ) : (
                "Log In"
              )}
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-stone-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-stone-900 hover:underline"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
