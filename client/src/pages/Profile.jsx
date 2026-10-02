import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import useAuthStore from "../store/authStore";
import AddressManager from "../components/AddressManager";

const Profile = () => {
  const {
    user,
    checkAuth,
    updateProfile,
    changePassword,
    loading,
    logOut,
  } = useAuthStore();

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!user) {
      checkAuth();
    }
  }, [user, checkAuth]);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const name = profileData.name.trim();
    const phone = profileData.phone.trim();

    if (!name) {
      return toast.error("Name is required.");
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      return toast.error("Phone number must be 10 digits.");
    }

    try {
      await updateProfile({
        name,
        phone,
      });

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile."
      );
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("Please fill all password fields.");
    }

    if (newPassword.length < 6) {
      return toast.error(
        "New password must be at least 6 characters."
      );
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match.");
    }

    try {
      await changePassword({
        currentPassword,
        newPassword,
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast.success("Password changed successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to change password."
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully.");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to logout."
      );
    }
  };

  if (!user) {
    return (
      <section className="min-h-[60vh] bg-[#F8F5F1] px-4 py-20 text-center">
        <p className="text-sm text-[#9A8879]">
          Loading profile...
        </p>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5F1]">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-[#D8BBA6]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9A7660] sm:text-xs">
              Your Space
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#4F3C30] sm:text-4xl">
            My Account
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-[#8D7968] sm:text-base">
            Manage your profile, password, addresses and account.
          </p>
        </div>

        {/* Account Navigation */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-[#E6D9CC] bg-[#FFFCF9] shadow-[0_8px_30px_rgba(109,91,77,0.05)]">
          <div className="grid grid-cols-2 divide-x divide-y divide-[#E6D9CC] md:grid-cols-5 md:divide-y-0">
            <Link
              to="/profile"
              className="bg-[#F5EBE3] px-4 py-4 text-center text-sm font-semibold text-[#74533F] transition hover:bg-[#F1E4DA]"
            >
              Profile
            </Link>

            <Link
              to="/orders"
              className="px-4 py-4 text-center text-sm font-medium text-[#7D6A59] transition hover:bg-[#FAF3EE] hover:text-[#C98F84]"
            >
              My Orders
            </Link>

            <Link
              to="/wishlist"
              className="px-4 py-4 text-center text-sm font-medium text-[#7D6A59] transition hover:bg-[#FAF3EE] hover:text-[#C98F84]"
            >
              Wishlist
            </Link>

            <Link
              to="/cart"
              className="px-4 py-4 text-center text-sm font-medium text-[#7D6A59] transition hover:bg-[#FAF3EE] hover:text-[#C98F84]"
            >
              Cart
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-4 text-center text-sm font-medium text-[#B56F6B] transition hover:bg-[#FDF0EE]"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile + Password */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile Information */}
          <div className="rounded-2xl border border-[#E6D9CC] bg-[#FFFCF9] p-6 shadow-[0_8px_30px_rgba(109,91,77,0.05)] sm:p-7">
            <div className="mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9A7660]">
                Personal Details
              </p>

              <h2 className="mt-1 text-xl font-semibold text-[#4F3C30]">
                Profile Information
              </h2>
            </div>

            <form
              onSubmit={handleProfileSubmit}
              className="space-y-5"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-[#6D5B4D]"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-[#DFD1C5] bg-[#FAF5F0] px-4 py-3 text-sm text-[#5F4D40] outline-none transition placeholder:text-[#B4A397] focus:border-[#C98F84] focus:bg-[#FFFCF9] focus:ring-4 focus:ring-[#C98F84]/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#6D5B4D]"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-[#E6D9CC] bg-[#F1ECE7] px-4 py-3 text-sm text-[#9A8879]"
                />

                <p className="mt-1.5 text-xs text-[#B0A196]">
                  Email cannot be changed.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-[#6D5B4D]"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={10}
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  placeholder="Enter 10-digit phone number"
                  className="w-full rounded-xl border border-[#DFD1C5] bg-[#FAF5F0] px-4 py-3 text-sm text-[#5F4D40] outline-none transition placeholder:text-[#B4A397] focus:border-[#C98F84] focus:bg-[#FFFCF9] focus:ring-4 focus:ring-[#C98F84]/10"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#74533F] py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#604330] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="rounded-2xl border border-[#E6D9CC] bg-[#FFFCF9] p-6 shadow-[0_8px_30px_rgba(109,91,77,0.05)] sm:p-7">
            <div className="mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9A7660]">
                Account Security
              </p>

              <h2 className="mt-1 text-xl font-semibold text-[#4F3C30]">
                Change Password
              </h2>
            </div>

            <form
              onSubmit={handlePasswordSubmit}
              className="space-y-5"
            >
              {/* Current Password */}
              <div>
                <label
                  htmlFor="currentPassword"
                  className="mb-2 block text-sm font-medium text-[#6D5B4D]"
                >
                  Current Password
                </label>

                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="w-full rounded-xl border border-[#DFD1C5] bg-[#FAF5F0] px-4 py-3 text-sm text-[#5F4D40] outline-none transition placeholder:text-[#B4A397] focus:border-[#C98F84] focus:bg-[#FFFCF9] focus:ring-4 focus:ring-[#C98F84]/10"
                />
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-2 block text-sm font-medium text-[#6D5B4D]"
                >
                  New Password
                </label>

                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-full rounded-xl border border-[#DFD1C5] bg-[#FAF5F0] px-4 py-3 text-sm text-[#5F4D40] outline-none transition placeholder:text-[#B4A397] focus:border-[#C98F84] focus:bg-[#FFFCF9] focus:ring-4 focus:ring-[#C98F84]/10"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-[#6D5B4D]"
                >
                  Confirm New Password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="w-full rounded-xl border border-[#DFD1C5] bg-[#FAF5F0] px-4 py-3 text-sm text-[#5F4D40] outline-none transition placeholder:text-[#B4A397] focus:border-[#C98F84] focus:bg-[#FFFCF9] focus:ring-4 focus:ring-[#C98F84]/10"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl border border-[#74533F] bg-[#F5EBE3] py-3 text-sm font-semibold text-[#74533F] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EEDFD4] hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>

        {/* Account Summary */}
        <div className="mt-6 rounded-2xl border border-[#E6D9CC] bg-[#FFFCF9] p-6 shadow-[0_8px_30px_rgba(109,91,77,0.05)] sm:p-7">
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9A7660]">
              Account Overview
            </p>

            <h2 className="mt-1 text-xl font-semibold text-[#4F3C30]">
              Account Summary
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#E9DDD3] bg-[#FAF5F0] p-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#9A8879]">
                Account Type
              </p>

              <p className="mt-1.5 font-semibold capitalize text-[#5F4D40]">
                {user.role || "User"}
              </p>
            </div>

            <div className="rounded-xl border border-[#E9DDD3] bg-[#FAF5F0] p-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#9A8879]">
                Email Status
              </p>

              <p
                className={`mt-1.5 font-semibold ${
                  user.verified
                    ? "text-[#6F8B72]"
                    : "text-[#B07870]"
                }`}
              >
                {user.verified ? "Verified" : "Not Verified"}
              </p>
            </div>
          </div>
        </div>

        {/* Address Management */}
        <div className="mt-6">
          <AddressManager />
        </div>
      </section>
    </main>
  );
};

export default Profile;