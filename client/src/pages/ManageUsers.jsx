import { useEffect } from "react";

import useAdminStore from "../store/adminStore";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import UserTable from "../components/UserTable";

const ManageUsers = () => {
  const {
    users,
    loading,
    getAllUsers,
    deleteUser,
  } = useAdminStore();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleDelete = async (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.name}?`,
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(user._id);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F5F1]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-[#eadfd5] border-t-[#c98f84]" />

          <p className="text-sm font-medium text-[#6d5b4d]">
            Loading Users...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8F5F1]">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="min-w-0 flex-1">
        <AdminNavbar title="Users" />

        <main className="p-5 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-7">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-px w-6 bg-[#dfc2b3]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9a8879]">
                Store Management
              </span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-[#6d5b4d] sm:text-3xl">
              Manage Users
            </h1>

            <p className="mt-1.5 text-sm text-[#9a8879]">
              View and manage customers registered in your store.
            </p>
          </div>

          {/* Users Table */}
          <div className="overflow-hidden rounded-2xl border border-[#eadfd5] bg-[#fffaf7] shadow-[0_8px_30px_rgba(109,91,77,0.05)]">
            <UserTable
              users={users}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageUsers;