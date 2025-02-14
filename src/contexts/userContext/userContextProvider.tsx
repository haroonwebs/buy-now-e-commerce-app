"use client";
import { useState, ReactNode, useEffect } from "react";
import useUserContext from "./userContext";
import { userTypes } from "@/types/userTypes";

type Props = {
  children: ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [userAuthContext, setUserAuthContext] = useState<userTypes>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("user") || "null");
    }
    return null;
  });

  useEffect(() => {
    if (userAuthContext) {
      localStorage.setItem("user", JSON.stringify(userAuthContext));
    }
  }, [userAuthContext]);

  return (
    <useUserContext.Provider value={{ userAuthContext, setUserAuthContext }}>
      {children}
    </useUserContext.Provider>
  );
};

export default UserContextProvider;
