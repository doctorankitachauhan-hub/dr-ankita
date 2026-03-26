import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/utils/SmoothScroll";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Providers from "@/lib/providers";
import AuthBoundary from "@/context/auth_boundry";
import Script from "next/script";

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
        <link rel="shortcut icon" href="/images/logo/new-logo-1.png" type="image/x-icon" />
      </head>
      <body className="overflow-x-hidden">
        <Providers>
          <AuthBoundary>
            <SmoothScrollProvider>
              {/* <NavBar /> */}
              {children}
              {/* <Contact /> */}
              {/* <Footer /> */}
            </SmoothScrollProvider>
          </AuthBoundary>
        </Providers>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      </body>
    </html>
  );
}
