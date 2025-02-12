import Link from "next/link";
import React from "react";
import { ProdcutType } from "@/types/productTypes";

interface ProductCardProps {
  product: ProdcutType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-[350px] h-auto m-4 shadow-lg rounded-xl  flex flex-col hover:shadow-2xl transition duration-300">
      <img
        src={product.photo.photo_url}
        alt="Company Logo"
        className="w-full h-44 object-cover mb-3"
      />

      <h2 className="text-lg font-semibold px-4 text-gray-800">
        {product.name}
      </h2>

      <p className="min-h-28 text-sm text-gray-600 px-4 mt-2">
        {product.description}
      </p>

      <Link href={`/products/details/${product.id}`}>
        <span className="mt-4 text-gray-800 text-sm px-4 py-2 rounded-lg hover:bg-blue-300 transition">
          Learn More
        </span>
      </Link>
    </div>
  );
};

export default ProductCard;
