import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetSession = () => {
  const getSession = async () => {
    try {
      const { data } = await axios.get("/api/sessions");

      return data?.data;
    } catch (error) {
      console.error("error getting session", error);
    }
  };

  return useQuery({
    queryKey: ["session"],
    queryFn: getSession,
  });
};
