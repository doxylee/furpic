"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { UserContextProvider } from "@/utils/useUser";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const queryClient = new QueryClient();

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ThemeProvider theme={theme}>
          <AppRouterCacheProvider>
            <SnackbarProvider
              anchorOrigin={{ horizontal: "center", vertical: "top" }}
            />
            {children}
            <SpeedInsights />
            <Analytics />
          </AppRouterCacheProvider>
        </ThemeProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}
