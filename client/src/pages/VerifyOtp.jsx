import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Mail,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import logo from "../assets/logo.png";
import useAuthStore from "../store/authStore";

export default function VerifyOtp() {
  const navigate = useNavigate();

  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const loading = useAuthStore((state) => state.loading);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (formData) => {
    if (!formData.email || !formData.otp) {
      toast.error("Please fill all fields.");
      return false;
    }

    if (formData.otp.length !== 6) {
      toast.error("OTP must be 6 digits.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(formData)) return;

    try {
      const data = await verifyOtp(formData);

      toast.success(data.message, {
        duration: 5000,
      });

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
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
            Verify OTP
          </h1>

          <p className="mt-2 text-center text-sm leading-6 text-stone-500">
            Enter the verification code we sent to your email to activate your account.
          </p>

          {/* Form */}
          <form
            noValidate
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
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

            {/* OTP */}
            <div>
              <label
                htmlFor="otp"
                className="block mb-2 text-sm font-medium text-stone-700"
              >
                OTP
              </label>

              <div className="relative">
                <ShieldCheck
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  className="w-full rounded-xl border border-stone-300 bg-white py-3 pl-11 pr-4 outline-none transition-all focus:border-stone-600 focus:ring-4 focus:ring-stone-100"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3 font-medium text-white transition-all hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-stone-500">
              Already verified?{" "}
              <Link
                to="/login"
                className="font-medium text-stone-900 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
}
