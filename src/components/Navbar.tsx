"use client";
import { FaBagShopping } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import Logout from "./Logout";
import Link from "next/link";
import { MdBorderColor } from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import useUserContext from "@/contexts/userContext/userContext";
import { useContext } from "react";

const Navbar = () => {
  const { userAuthContext } = useContext(useUserContext);
  const role = userAuthContext?.user_role;
  console.log("role", role);
  return (
    <nav className="bg-slate-100 w-full flex justify-between items-center px-4 lg:px-10  min-h-16 shadow-lg rounded-b-full">
      <div className="w-[50%]  flex gap-2">
        <div className=" flex w-[80px] h-[28px] gap-2 relative">
          <FaBagShopping className="text-[30px]" />
        </div>

        <ul className="md:flex hidden gap-6 font-[400px]  ">
          <li className=" flex justify-center items-center hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            <Link
              className="flex justify-center items-center gap-1 "
              href={"/dashboard"}
            >
              Dashboard <RxDashboard />
            </Link>
          </li>

          <li className=" flex justify-center items-center  hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            <Link
              className="flex justify-center items-center gap-1 "
              href={"/users"}
            >
              Users <CiUser />
            </Link>
          </li>

          <li className=" flex justify-center items-center  hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            <Link
              className="flex justify-center items-center gap-1 "
              href={"/products"}
            >
              Products <FaShopify />
            </Link>
          </li>

          <li className=" flex justify-center items-center  hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            <Link
              className="flex justify-center items-center gap-1 "
              href={"/products/orders"}
            >
              Orders <MdBorderColor />
            </Link>
          </li>
          <li className=" flex justify-center items-center  hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            <Link
              className="flex justify-center items-center gap-1 "
              href={"/products/createproduct"}
            >
              Product <IoIosAddCircleOutline />
            </Link>
          </li>
        </ul>
      </div>
      <div className=" flex justify-center items-center gap-3 text-[16px]  font-semibold ">
        {!userAuthContext ? (
          <span className="px-2 rounded-md hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8]">
            <Link href="/login">Login</Link>
          </span>
        ) : (
          <Logout />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
