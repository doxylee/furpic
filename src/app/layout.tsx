import "./globals.css";

import ClientLayout from "./clientLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FurPic",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
