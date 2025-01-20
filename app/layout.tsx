import { Inter } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Stema - The largest engineering community",
  description: "Build your engineering career with Stema",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-gradient-to-b from-purple-50/50 to-purple-100/50`}>
        {children}
      </body>
    </html>
  )
}
