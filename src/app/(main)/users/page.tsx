"use client";

import { useGetSession } from "@/hooks/useGetSession";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";

const Users = () => {
  const session = useGetSession();

  const token = session?.session;

  const getUsers = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data?.data;
    } catch (error) {
      return [];
    }
  };

  const { data: userList } = useQuery({
    queryKey: ["users", token],
    queryFn: getUsers,
  });

  if (session?.user?.role !== "ADMIN") redirect("/");

  return JSON.stringify(userList);
};

export default Users;
