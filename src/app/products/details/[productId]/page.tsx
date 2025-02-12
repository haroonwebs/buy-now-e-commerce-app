import React from "react";
import usefetchProductbyId from "@/hooks/useFetchProductbyId";

const details = async ({ params }: { params: { productId: string } }) => {
  const { error, product } = await usefetchProductbyId(
    `http://localhost:5000/api/v1/product/${params.productId}`
  );
  console.log("error", error);

  console.log("product", product);
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Container Card */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Product Image */}
        {product.image_url && (
          <img
            src={"public/images/html.png"}
            alt="page not found "
            className="w-full h-64 object-cover"
          />
        )}

        {/* Product Information */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">product.name</h1>
          <p className="mt-4 text-gray-600">product.description</p>
          <div className="mt-6 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center">
            <span className="text-xl font-bold text-green-600">
              Price: ₹ product.price
            </span>
            <span className="text-gray-500 text-sm mt-2 sm:mt-0">
              {/* Released on: {new Date(product.created_at).toLocaleDateString()} */}
              Released on:
            </span>
          </div>
        </div>

        {/* Company Information */}
        <div className="border-t bg-gray-50 px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Company Details
          </h2>
          <p className="text-gray-600">
            <span className="font-bold">Name:</span> product.company.name
          </p>
          <p className="mt-2 text-gray-600">
            <span className="font-bold">About:</span>{" "}
            product.company.description
          </p>
          <div className="mt-2 text-gray-400 text-xs">
            <span>
              {/* Registered on: {new Date(product.company.created_at).toLocaleDateString()} */}
              Registered on
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default details;
