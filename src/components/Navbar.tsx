"use client";
import { FaBagShopping } from "react-icons/fa6";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-slate-300 w-full flex justify-between items-center px-4 lg:px-10  min-h-16 shadow-sm">
      <div className="w-[50%]  flex gap-2">
        <div className=" flex w-[80px] h-[28px] gap-2 relative">
          <FaBagShopping className="text-[30px]" />
        </div>

        <ul className="md:flex hidden gap-6 font-[400px]  ">
          <li className=" flex justify-center items-center hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>

          <li className=" flex justify-center items-center  hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            <Link href={"/users"}>Users</Link>
          </li>

          <li className=" flex justify-center items-center  hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            <Link href={"/products"}>Products</Link>
          </li>

          <li className=" flex justify-center items-center  hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8] px-2 rounded-md">
            <Link href={"/products/orders"}>Orders</Link>
          </li>
        </ul>
      </div>
      <div className=" flex justify-center items-center  text-[16px]  font-semibold px-2 rounded-md hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8]">
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
