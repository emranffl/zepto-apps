import { cn } from "@/lib/utils"
import TanStackQueryProvider from "@/utils/providers/TanStackQuery.Provider"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Zepto Apps",
  description: "Zepto Apps",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", geistSans.variable)}>
        <TanStackQueryProvider>{children}</TanStackQueryProvider>
      </body>
    </html>
  )
}
