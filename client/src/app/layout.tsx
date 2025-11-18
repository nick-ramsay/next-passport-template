import type { Metadata } from "next";
import ThemeWatcher from "../components/ThemeWatcher";
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeWatcher />
          {children}
        <BootstrapClient />
      </body>
    </html>
  );
}
