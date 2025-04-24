"use client";

import queryClient from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function ReactQueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
