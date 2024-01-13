"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { UserContextProvider } from "@/utils/useUser";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <AppRouterCacheProvider>
              <SnackbarProvider
                anchorOrigin={{ horizontal: "center", vertical: "top" }}
              />
              {children}
              <SpeedInsights />
              <Analytics />
            </AppRouterCacheProvider>
          </UserContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
