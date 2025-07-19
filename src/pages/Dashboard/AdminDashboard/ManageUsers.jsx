import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseaxiosSecure from "../../../hooks/UseaxiosSecure";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = UseaxiosSecure();
  const [search, setSearch] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
    enabled: true,
  });

  const handleMakeAdmin = async (user) => {
    const res = await axiosSecure.patch(`/users/admin/${user.email}`, {
      userID: user._id,
    });
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success!", `${user.name} is now an admin!`, "success");
      refetch();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">👥 All Users</h2>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="input input-bordered w-full max-w-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Make Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role || "student"}</td>
                  <td>
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      disabled={user.role === "admin"}
                      className={`btn btn-sm ${
                        user.role === "admin"
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                    >
                      Make Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
