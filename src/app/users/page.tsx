import React from "react";
import UserCard from "@/components/UserCard";
import usefetchUsers from "@/hooks/useFetchUsers";

const Users = async () => {
  const { users, error } = await usefetchUsers(
    "http://localhost:5000/api/v1/user//allusers"
  );
  return (
    <div className="flex mt-2 w-full h-10">
      <table className="w-full bg-slate-50 mx-10 rounded-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="border  px-4 py-2">Name</th>
            <th className="border  px-4 py-2">Email</th>
            <th className="border  px-4 py-2">Role</th>
            <th className="border  px-4 py-2">Active</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users?.map((user) => <UserCard key={user.id} users={user} />)
          ) : (
            <div>No users found</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
