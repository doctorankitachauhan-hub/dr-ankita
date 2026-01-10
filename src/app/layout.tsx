import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/utils/SmoothScroll";
import TopBar from "@/components/TopBar";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Dr. Ankita Chauhan",
  description: "Dr. Ankita Chauhan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet"></link>
      </head>
      <body className="overflow-x-hidden">
        <SmoothScrollProvider>
          {/* <TopBar /> */}
          <NavBar />
          {children}
          <Contact />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
