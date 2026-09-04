import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/utils/SmoothScroll";
import Providers from "@/lib/providers";
import AuthBoundary from "@/context/auth_boundry";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google"
import { Toaster } from "react-hot-toast";

const SITE_URL = "https://www.drankitachauhan.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Best Gynecologist & Obstetrician in Hyderabad | Dr. Ankita Chauhan",
  description: "Consult Dr. Ankita Chauhan, an experienced gynecologist and obstetrician in Hyderabad for pregnancy care, infertility treatment, PCOS, and women's health.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Dr. Ankita Chauhan | Gynecologist & Obstetrician, Hyderabad",
    title: "Best Gynecologist & Obstetrician in Hyderabad | Dr. Ankita Chauhan",
    description: "Consult Dr. Ankita Chauhan, an experienced gynecologist and obstetrician in Hyderabad for pregnancy care, infertility treatment, PCOS, and women's health.",
    images: [
      {
        url: "/images/hero/dr-ankita.png",
        width: 1858,
        height: 2948,
        alt: "Dr. Ankita Chauhan, Consultant Gynecologist & Obstetrician, Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Gynecologist & Obstetrician in Hyderabad | Dr. Ankita Chauhan",
    description: "Consult Dr. Ankita Chauhan, an experienced gynecologist and obstetrician in Hyderabad for pregnancy care, infertility treatment, PCOS, and women's health.",
    images: ["/images/hero/dr-ankita.png"],
  },
};

// Sitewide structured data — helps Google understand this as a real local medical
// practice (eligible for richer local-search / map-pack treatment). Address, phone
// and email are the same ones already shown in the site footer. The geo coordinates
// are an approximate pin for the Botanical Garden Rd / Sri Ram Nagar block in
// Kondapur, Hyderabad — replace with the exact clinic pin from Google Business
// Profile if you have one for more precision.
const physicianJsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Ankita Chauhan",
  "image": `${SITE_URL}/images/hero/dr-ankita.png`,
  "url": SITE_URL,
  "telephone": "+91-9881279493",
  "email": "doctorankitachauhan@gmail.com",
  "medicalSpecialty": ["Gynecology", "Obstetrics"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "206 B, Botanical Garden Rd, Sri Ram Nagar",
    "addressLocality": "Gachibowli, Kondapur",
    "addressRegion": "Telangana",
    "postalCode": "500084",
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 17.460089,
    "longitude": 78.353494,
  },
  "hasMap": "https://maps.app.goo.gl/NiVQhbtNcaHpQBjUA",
  "sameAs": [
    "https://www.instagram.com/dr.ankitachauhan_",
    "https://www.youtube.com/@DrAnkitaChauhan",
  ],
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
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
        />
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
        <GoogleAnalytics gaId="G-G963FVQ89C" />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: '#111827',
              color: '#f8fafc',
              fontSize: '13px',
            },
            success: {
              iconTheme: { primary: '#827fc6', secondary: '#f2f1fa' },
            },
          }}
        />
        <Script src="https://elfsightcdn.com/platform.js" async></Script>
      </body>
    </html>
  );
}
