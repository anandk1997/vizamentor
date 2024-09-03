"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  },
});

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster />

      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};
