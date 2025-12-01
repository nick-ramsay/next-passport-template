import type { Metadata } from "next";
 import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapClient from '@/components/BootstrapClient.js';


export const metadata: Metadata = {
  title: "Next.js Passport Template",
  description: "A generic login portal using Passport.js local strategy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
