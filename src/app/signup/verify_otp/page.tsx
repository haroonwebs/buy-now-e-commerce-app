"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for validation
const otpSchema = z.object({
  otp: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

// Type for form data
type otpFormType = z.infer<typeof otpSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<otpFormType>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = (data: otpFormType) => {};

  return (
    <div className="h-screen w-full bg-white flex items-center justify-center">
      <div className="w-1/3 bg-blue-200 rounded-md shadow-xl border-2 border-blue-400 p-6">
        <h2 className="text-center text-2xl font-bold text-blue-600 mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="flex items-center text-lg gap-1 font-semibold text-blue-500">
              Enter Your OTP to Verify Your Account
            </label>
            <input
              {...register("otp")}
              className="bg-gray-50 border-2 p-2 outline-none w-full rounded-md"
              type="text"
              inputMode="numeric"
              placeholder="Enter OTP"
            />
            {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
          </div>

          <div className="w-full flex justify-center items-center p-2">
            <button
              type="submit"
              className="bg-blue-500 w-full text-white py-2 rounded-md text-xl font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
