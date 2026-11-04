import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "SAMANVAYA 2027 | Event Management Platform",
  description: "Official event management platform for SAMANVAYA 2027",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
