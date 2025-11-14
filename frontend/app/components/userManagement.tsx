import { useState, useEffect } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // This hits your new GET /api/users endpoint
        const res = await fetchWithAuth(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch users. Are you an admin?");
        }

        const allUsers = (await res.json()) as User[];

        // 3. Create the user array (your original code)
        const userData = allUsers.filter((u: User) => u.role !== "admin");
        setUsers(userData);

        // 4. Create the admin array (what you asked for)
        const adminData = allUsers.filter((u: User) => u.role === "admin");
        setAdmins(adminData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDelete = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      // This hits your new DELETE /api/users/:id endpoint
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete user.");
      }

      // Remove the deleted user from the state
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    // 1. Get the name of the user for a better prompt
    const user =
      users.find((u) => u._id === userId) ||
      admins.find((a) => a._id === userId);
    const userName = user ? user.name : "this user";

    // 2. Add the confirmation dialog
    if (
      !window.confirm(
        `Are you sure you want to change ${userName}'s role to ${newRole}?`
      )
    ) {
      setUsers([...users]);
      setAdmins([...admins]);
      return; // Stop the function
    }

    try {
      // This hits your new PUT /api/users/:id endpoint
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
        {
          method: "PUT",
          body: JSON.stringify({ role: newRole }), // Only updating role here
        }
      );
      if (!res.ok) throw new Error("Failed to update role");

      const updatedUser = (await res.json()) as User;

      const otherUsers = users.filter((u) => u._id !== userId);
      const otherAdmins = admins.filter((a) => a._id !== userId);

      // Add the updated user to the correct list
      if (updatedUser.role === "admin") {
        setAdmins([...otherAdmins, updatedUser]);
        setUsers(otherUsers);
      } else {
        setUsers([...otherUsers, updatedUser]);
        setAdmins(otherAdmins);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {admins.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">Admin</td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <span className="text-gray-500">No action</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
