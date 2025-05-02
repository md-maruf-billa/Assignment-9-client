import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: " ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Toaster
            position="bottom-right"
            richColors
            closeButton={false}
            toastOptions={{
              className: "bg-white dark:bg-black text-black dark:text-white",
              style: {
                fontFamily: "var(--font-geist-sans)",
                fontSize: "14px",
                padding: "10px 15px",
                borderRadius: "8px",
              },
            }}
            expand={false}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
