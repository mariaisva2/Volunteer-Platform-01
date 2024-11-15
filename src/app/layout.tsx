import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/auth-provider";


export const metadata: Metadata = {
  title: "Isa communityprojects",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-gradient-to-b from-blue-200 to-white w-full"
      >
        <AuthProvider >{children} </AuthProvider>
      </body>
    </html>
  );
}
