import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        error?.response?.data?.message || "Failed to update profile.",
      );
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("Please fill all password fields.");
    }

    if (newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters.");
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
        error?.response?.data?.message || "Failed to change password.",
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to logout.",
      );
    }
  };

  if (!user) {
    return (
      <section className="container mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Loading profile...</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto max-w-6xl px-4 py-8 md:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          My Account
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your profile, password, addresses and account.
        </p>
      </div>

      {/* Account Navigation */}
      <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-2 divide-x divide-gray-200 md:grid-cols-5">
          <Link
            to="/profile"
            className="bg-orange-50 px-4 py-4 text-center text-sm font-medium text-orange-500"
          >
            Profile
          </Link>

          <Link
            to="/orders"
            className="px-4 py-4 text-center text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-orange-500"
          >
            My Orders
          </Link>

          <Link
            to="/wishlist"
            className="px-4 py-4 text-center text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-orange-500"
          >
            Wishlist
          </Link>

          <Link
            to="/cart"
            className="px-4 py-4 text-center text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-orange-500"
          >
            Cart
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-4 text-center text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Profile + Password */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Profile Information
          </h2>

          <form
            onSubmit={handleProfileSubmit}
            className="space-y-5"
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={user.email || ""}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
              />

              <p className="mt-1 text-xs text-gray-400">
                Email cannot be changed.
              </p>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-gray-700"
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Change Password
          </h2>

          <form
            onSubmit={handlePasswordSubmit}
            className="space-y-5"
          >
            {/* Current Password */}
            <div>
              <label
                htmlFor="currentPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
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
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gray-800 py-3 font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>

      {/* Account Summary */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Account Summary
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Account Type
            </p>

            <p className="mt-1 font-medium capitalize text-gray-800">
              {user.role || "User"}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Email Status
            </p>

            <p className="mt-1 font-medium text-green-600">
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
  );
};

export default Profile;