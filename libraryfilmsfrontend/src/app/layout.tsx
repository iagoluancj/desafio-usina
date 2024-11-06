import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SupaProvider from "@/Context/context";
import ToastProvider from "@/lib/ToastProvider";
import StyledComponentsRegistry from "@/components/StyledRegistry";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Library Films - Usina do seguro",
  description: "Teste Usina do seguro.",
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
        <StyledComponentsRegistry>
          <SupaProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </SupaProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
