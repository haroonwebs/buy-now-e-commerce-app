"use client";
import { useState, ReactNode } from "react";
import useUserContext from "./userContext";
import { userTypes } from "@/types/userTypes";

type Props = {
  children: ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [userAuthContext, setUserAuthContext] = useState<userTypes | null>(
    null
  );

  return (
    <useUserContext.Provider value={{ userAuthContext, setUserAuthContext }}>
      {children}
    </useUserContext.Provider>
  );
};

export default UserContextProvider;
