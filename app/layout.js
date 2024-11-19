import localFont from "next/font/local";

import NavBar from "@/components/NavBar";

import "./globals.css";

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

export const metadata = {
  title: 'Car Management App',
  description: 'Manage your car inventory',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
              <NavBar />
       <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}
