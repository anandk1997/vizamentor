"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await axios.post("/api/reset", {
        token,
        newPassword: password,
      });

      toast.success("Password reset successful! Redirecting to login...");

      setTimeout(() => router.push("/sign-in"), 500);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {isLoading ? "loading" : "Reset Password"}
        </button>

        <Link
          href={"/sign-in"}
          className="mt-7 text-center flex m-auto justify-center"
        >
          Back to Login
        </Link>

        <Link
          href={"/"}
          className="mt-7 text-center flex m-auto justify-center"
        >
          Home
        </Link>
      </form>
    </div>
  );
}
