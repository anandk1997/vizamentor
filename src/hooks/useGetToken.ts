import { useGetSession } from "./useGetSession";

export const useGetToken = () => {
  const session = useGetSession();

  const token = session?.session;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
