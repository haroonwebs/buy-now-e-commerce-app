import React from "react";
import { userTypes } from "@/types/userTypes";

interface userCardProp {
  users: userTypes;
}

const UserCard: React.FC<userCardProp> = ({ users }) => {
  return (
    <>
      <tr>
        <td className="border-r-2  px-4 py-2">{users?.user_name}</td>
        <td className="border-r-2   px-4 py-2">{users?.email}</td>
        <td className="border-r-2   px-4 py-2">{users?.user_role}</td>
        <td className=" place-items-center">
          {users?.isVerified === true ? (
            <div className="w-5 h-5  rounded-full bg-green-600"></div>
          ) : (
            <div className="w-5 h-5 rounded-full   bg-slate-500"></div>
          )}
        </td>
      </tr>
    </>
  );
};

export default UserCard;
