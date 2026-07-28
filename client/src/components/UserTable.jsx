import { Trash2 } from "lucide-react";

const UserTable = ({ users, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-4">Name</th>
            <th className="text-left px-6 py-4">Email</th>
            <th className="text-left px-6 py-4">Role</th>
            <th className="text-left px-6 py-4">Joined</th>
            <th className="text-center px-6 py-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                {/* Name */}
                <td className="px-6 py-4 font-medium">{user.name}</td>

                {/* Email */}
                <td className="px-6 py-4">{user.email}</td>

                {/* Role */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Joined Date */}
                <td className="px-6 py-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                {/* Delete */}
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <button
                      disabled={user.role === "admin"}
                      onClick={() => onDelete(user)}
                      className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-500">
                No Users Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
