"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useGetSession } from "@/hooks/useGetSession";
import { redirect } from "next/navigation";
import { UpdatePassword } from "./updatePassword";
import { useGetToken } from "@/hooks/useGetToken";

export function UpdateProfile() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const session = useGetSession();
  const bToken = useGetToken();

  useEffect(() => {
    if (!session?.session) return;

    setFormData((prev) => ({
      ...prev,
      email: session?.user?.email,
      phone: session?.user?.phone,
      address: session?.user?.address,
    }));
  }, [session?.session]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { data } = await axios.patch(
        "/api/users/update",
        {
          ...formData,
          id: session?.user?._id,
        },

        bToken,
      );

      toast.success(data?.message);
    } catch (error: any) {
      console.error("Update User error", error);

      toast.error(
        error?.response?.data?.message ??
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!session.isPending && !session?.session) redirect("/");
  return (
    <div className="flex flex-col md:flex-row justify-center align-middle h-[100vh] w-100">
      <div className="md:w-[48%] h-full mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Update Profile</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={session?.user?.name ?? ""}
              onChange={handleChange}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-slate-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>

            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mb-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isLoading ? "loading" : "Update"}
          </button>

          <Link
            href={"/"}
            className="mt-7 text-center flex m-auto justify-center"
          >
            Home
          </Link>
        </form>
      </div>

      <div className="md:w-[48%] h-full mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Update Password</h1>

        <UpdatePassword />
      </div>
    </div>
  );
}
