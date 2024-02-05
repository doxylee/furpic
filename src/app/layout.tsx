import "./globals.css";

import ClientLayout from "./clientLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FurPic",
  metadataBase: new URL("https://furpic.net"),
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
