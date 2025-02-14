import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import useUserContext from "@/contexts/userContext/userContext";

const Logout = () => {
  const router = useRouter();
  const { setUserAuthContext } = useContext(useUserContext);

  const handleLougout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/user/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      if (result.success === true) {
        toast.success(result.message);
        if (typeof window !== "undefined") {
          setUserAuthContext(null);
          localStorage.removeItem("user");
        }
        router.push("/login");
      } else {
        toast.error("something went wrong while Logout Successfuly");
      }
    } catch (error: any) {
      console.log("logout error", error.message);
    }
  };
  return (
    <button
      onClick={handleLougout}
      className="px-2 rounded-md hover:text-[#4FC9F3] hover:font-[500px] hover:bg-[#f5f6f8]"
    >
      Logout
    </button>
  );
};

export default Logout;
