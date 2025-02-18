import React from "react";
import usefetchProducts from "@/hooks/useFetchProducts";
import ProductCard from "@/components/ProductCard";

const products = async () => {
  const { products, error } = await usefetchProducts(
    "http://localhost:5000/api/v1/product/getall"
  );
  console.log("products", products);
  console.log("error", error);
  return (
    <div className="grid justify-center sm:grid-cols-2 md:col-span-3 lg:grid-cols-3 xl:grid-cols-4  w-full h-auto">
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div> Products Not Available</div>
      )}
    </div>
  );
};

export default products;
