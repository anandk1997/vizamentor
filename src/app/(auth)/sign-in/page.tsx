"use client";

import { routes } from "@/lib/utils/constants/routes";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await axios.post("/api/signin", formData);

      toast.success("Login successful! Redirecting...");
      setTimeout(() => router.push("/"), 500);
    } catch (error: any) {
      console.error("signup error", error);

      toast.error(
        error?.response?.data?.message ??
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Package className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {false ? "Create your account" : "Sign in to VizaMentor"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {/* {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {success && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{success}</span>
            </div>
          )} */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                // autoComplete={isSignUp ? "new-password" : "current-password"}
                required
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${
                  // isSignUp ? "" : "rounded-b-md"
                  ""
                } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
            </div>
            {/* {isSignUp && (
              <div>
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            )} */}
          </div>

          <div>
            <button
              type="submit"
              // disabled={authMutation.isPending}
              className="group relative w-full h-10 flex justify-center items-center gap-2 py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-white hover:!text-indigo-600 hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
              {isLoading ? (
                <CircularProgress
                  className="!text-white group-hover:!text-indigo-600"
                  sx={{ scale: ".5" }}
                />
              ) : (
                <>
                  {false ? "Sign Up" : "Sign In"}

                  <Package size={15} />
                </>
              )}
            </button>
          </div>

          {/* <button
            type="button"
            onClick={loginWithGoogle}
            className="group relative w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-600 text-sm font-medium rounded-full text-black bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            {isSignUp ? "Sign Up" : "Sign In"} With Google <FcGoogle />
          </button> */}

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                router.push(routes.SIGNUP);
                // setIsSignUp(!isSignUp);
                // setError("");
                // setSuccess("");
              }}
              className="text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              {false
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>

          <Link
            href={routes.FORGOT_PASSWORD}
            className="group relative w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-black hover:bg-white hover:border-black hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Forgot Password
            <Package size={15} />
          </Link>
        </form>
      </div>
    </div>
  );
}
