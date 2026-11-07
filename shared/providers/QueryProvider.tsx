"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { showApiErrorToast } from "@/shared/utils/errorHandler";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            showApiErrorToast(error);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            showApiErrorToast(error);
          },
        }),
        defaultOptions: {
          queries: {
            retry: 0,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
