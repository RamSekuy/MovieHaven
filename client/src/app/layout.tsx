import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarToggler } from "./_components/navbarComponent/navbar";
import Footer from "./_components/footerComponent/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieHaven",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarToggler/>
        {children}
        <Footer/>
        </body>

    </html>
  );
}
