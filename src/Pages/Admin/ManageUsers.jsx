import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";

function ManageUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/admin/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => setUsers(Array.isArray(data) ? data : []))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));

  }, []);

  // UI toggle only (frontend)
  const toggleStatus = (userId) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Blocked" ? "Active" : "Blocked"
            }
          : user
      )
    );
  };

  return (
    <AdminLayout>

      <div className="animate-fade-in space-y-8">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-blue-900">
          Manage Users 👥
        </h1>

        {/* TABLE */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">

          <div className="p-4 border-b font-semibold">
            All Registered Users
          </div>

          {loading ? (
            <p className="p-6 animate-pulse">Loading users...</p>
          ) : (
            <table className="w-full text-left">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4">Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50 transition duration-200"
                    >

                      <td className="p-4 font-medium">{user.name}</td>

                      <td className="text-gray-600">{user.email}</td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            user.status === "Blocked"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {user.status || "Active"}
                        </span>
                      </td>

                      <td>
                        <button
                          onClick={() => toggleStatus(user.id)}
                          className={`px-4 py-1 rounded-lg text-white transition transform hover:scale-105 ${
                            user.status === "Blocked"
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-red-600 hover:bg-red-700"
                          }`}
                        >
                          {user.status === "Blocked" ? "Unblock" : "Block"}
                        </button>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>
          )}

        </div>

      </div>

    </AdminLayout>
  );
}

export default ManageUsers;