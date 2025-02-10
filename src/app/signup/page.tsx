"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineMail } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// Define Zod Schema for validation
const signUpSchema = z.object({
  user_name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// Define type from schema
type SignUpFormType = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormType>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormType) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (result.success === true) {
        toast.success("OTP sent to your emaill. Please verify Email !");
        router.push("/signup/verify_otp");
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      console.error("Sign Up Error:", error);
    }
  };

  return (
    <div className="h-screen w-full bg-white flex items-center justify-center">
      <div className="w-1/3 bg-blue-200 rounded-md shadow-xl border-2 border-blue-400 p-6">
        <h2 className="text-center text-2xl font-bold text-blue-600 mb-4">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="flex items-center text-lg gap-1 font-semibold text-blue-500">
              Username <FaRegUser />
            </label>
            <input
              {...register("user_name")}
              className="bg-gray-50 border-2 p-2 outline-none w-full rounded-md"
              type="text"
              placeholder="Username"
            />
            {errors.user_name && (
              <p className="text-red-500">{errors.user_name.message}</p>
            )}
          </div>

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
            {"You Have an account?"}{" "}
            <Link href="/login" className="hover:underline hover:text-blue-400">
              Login
            </Link>
          </p>

          <div className="w-full flex justify-center items-center p-2">
            <button
              type="submit"
              className="bg-blue-500 w-full text-white py-2 rounded-md text-xl font-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
