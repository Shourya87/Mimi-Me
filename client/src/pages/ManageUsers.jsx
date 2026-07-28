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
  }, []);

  const handleDelete = async (user) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.name}?`
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
      <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
        Loading Users...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1">
        <AdminNavbar />

        <main className="p-6">
          <h2 className="text-3xl font-bold mb-6">
            Manage Users
          </h2>

          <UserTable
            users={users}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  );
};

export default ManageUsers;