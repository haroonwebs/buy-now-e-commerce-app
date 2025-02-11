import Link from "next/link";
import React from "react";

const CompanyCard = () => {
  return (
    <div className="w-[350px] h-[400px] m-8 bg-slate-50 shadow-lg rounded-xl p-2 flex flex-col hover:shadow-2xl transition duration-300">
      <img
        src="/images/html.png"
        alt="Company Logo"
        className="w-full h-44 object-cover mb-3"
      />

      {/* Company Name */}
      <h2 className="text-lg font-semibold text-gray-800">Company Name</h2>

      {/* Description */}
      <p className="min-h-28 text-sm text-gray-600  mt-2">
        Providing quality services with innovation and trust.
      </p>

      {/* Button */}
      <Link href={"/products/details"}>
        <span className="mt-4 text-gray-800 text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Learn More
        </span>
      </Link>
    </div>
  );
};

export default CompanyCard;
