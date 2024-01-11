import type { Metadata } from 'next'
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import './globals.css'

export const metadata: Metadata = {
  title: undefined, // TODO
  description: undefined,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <AppRouterCacheProvider>
          {children}
          <SpeedInsights />
          <Analytics />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
