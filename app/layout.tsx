import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Для madsoft",
  description: "Тестовое задание для madsoft",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
