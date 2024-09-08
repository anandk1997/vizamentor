import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useGetSession } from "@/hooks/useGetSession";

export const UpdatePassword = () => {
  const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialState);

  const [isLoading, setIsLoading] = useState(false);

  const session = useGetSession();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("New and confirm passwords are not equal");
    }

    setIsLoading(true);

    try {
      await axios.patch(
        "/api/users/update",
        {
          ...formData,
          id: session?.user?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.session}`,
          },
        },
      );

      toast.success("Password updated successfully");

      setFormData(initialState);
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

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <div>
        <label
          htmlFor="oldPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Current Password
        </label>

        <input
          type="password"
          id="oldPassword"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700"
        >
          New Password
        </label>

        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
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

      <Link href={"/"} className="mt-7 text-center flex m-auto justify-center">
        Home
      </Link>
    </form>
  );
};
