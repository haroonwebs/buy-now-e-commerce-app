import { ProdcutType } from "@/types/productTypes";

const usefetchProductbyId = async (url: string) => {
  try {
    const data = await fetch(url, { cache: "no-store" });
    if (!data) {
      throw new Error("error while fetching orders");
    }

    const response: any = await data.json();
    const product: ProdcutType[] = response.product;
    return { product, error: null };
  } catch (error: any) {
    return { product: null, error: error.message };
  }
};

export default usefetchProductbyId;
