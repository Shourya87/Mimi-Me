import { Trash2, ShieldCheck } from "lucide-react";

const UserTable = ({ users = [], onDelete }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#eadfd5] bg-[#fffaf7] shadow-[0_8px_30px_rgba(109,91,77,0.05)]">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="border-b border-[#eadfd5] bg-[#f5eee9]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#806e60]">
                Name
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#806e60]">
                Email
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#806e60]">
                Role
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#806e60]">
                Joined
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-[#806e60]">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#eadfd5]">
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="transition-colors hover:bg-[#fcf6f2]"
                >
                  {/* Name */}
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#6d5b4d]">
                      {user.name}
                    </p>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#8f7d70]">{user.email}</p>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-[#f3e1dc] text-[#9a6259]"
                          : "bg-[#eee7e1] text-[#806e60]"
                      }`}
                    >
                      {user.role === "admin" && <ShieldCheck size={13} />}
                      {user.role}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="px-6 py-4 text-sm text-[#8f7d70]">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Delete */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        disabled={user.role === "admin"}
                        onClick={() => onDelete(user)}
                        title={
                          user.role === "admin"
                            ? "Admin users cannot be deleted"
                            : "Delete user"
                        }
                        className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
                          user.role === "admin"
                            ? "cursor-not-allowed border-[#eadfd5] bg-[#f5eee9] text-[#c8b9ae]"
                            : "border-[#ecd5d0] bg-[#fff4f2] text-[#b56f67] hover:border-[#dfb9b2] hover:bg-[#fce9e6]"
                        }`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-sm text-[#9a8879]"
                >
                  No Users Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;