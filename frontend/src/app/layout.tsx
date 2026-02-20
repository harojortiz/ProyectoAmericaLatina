import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Breadcrumbs from "@/components/Breadcrumbs";

import { AccessibilityProvider } from "@/context/AccessibilityContext";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I.E. America Latina",
  description: "Web oficial de la institución para noticias, eventos y gestión administrativa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <AccessibilityProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <Breadcrumbs />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
              <ScrollToTop />
              <AccessibilityWidget />
            </div>
          </AuthProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
