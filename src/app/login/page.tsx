"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiLock } from "react-icons/ci";
import { AiOutlineMail } from "react-icons/ai";

// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Type for form data
type LoginFormType = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormType) => {};

  return (
    <div className="h-screen w-full bg-white flex items-center justify-center">
      <div className="w-1/3 bg-blue-200 rounded-md shadow-xl border-2 border-blue-400 p-6">
        <h2 className="text-center text-2xl font-bold text-blue-600 mb-4">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="flex items-center text-lg gap-1 font-semibold text-blue-500">
              Email <AiOutlineMail />
            </label>
            <input
              {...register("email")}
              className="bg-gray-50 border-2 p-2 outline-none w-full rounded-md"
              type="email"
              placeholder="Enter Your Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="flex items-center text-lg gap-1 font-semibold text-blue-500">
              Password <CiLock />
            </label>
            <input
              {...register("password")}
              className="bg-gray-50 border-2 p-2 outline-none w-full rounded-md"
              type="password"
              placeholder="Enter Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <p className="text-center">
            {"Not Have an account?"}{" "}
            <Link
              href="/signup"
              className="hover:underline hover:text-blue-400"
            >
              Sign Up
            </Link>
          </p>

          <div className="w-full flex justify-center items-center p-2">
            <button
              type="submit"
              className="bg-blue-500 w-full text-white py-2 rounded-md text-xl font-semibold"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
