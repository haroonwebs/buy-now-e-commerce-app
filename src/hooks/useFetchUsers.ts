import { userTypes } from "@/types/userTypes";
const usefetchUsers = async (url: string) => {
  try {
    const data = await fetch(url, { cache: "no-store" });
    if (!data) {
      throw new Error("error while fetching orders");
    }
    console.log("data", data);

    const response: any = await data.json();
    const users: userTypes[] = response.users;
    return { users, error: null };
  } catch (error: any) {
    return { users: null, error: error.message };
  }
};

export default usefetchUsers;
