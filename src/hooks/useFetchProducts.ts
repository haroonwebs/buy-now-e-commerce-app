import { ProdcutType } from "@/types/productTypes";

const usefetchProducts = async (url: string) => {
  try {
    const data = await fetch(url, { cache: "no-store" });
    if (!data) {
      throw new Error("error while fetching orders");
    }

    const response: any = await data.json();
    const products: ProdcutType[] = response.products;
    return { products, error: null };
  } catch (error: any) {
    return { products: null, error: error.message };
  }
};

export default usefetchProducts;
