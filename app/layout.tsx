import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "5TopCasinosUK - Best Online Casino Sites UK 2026",
  description: "Compare the best online casino sites in the UK. Find trusted, licensed casinos with great bonuses, fast withdrawals, and secure gaming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
