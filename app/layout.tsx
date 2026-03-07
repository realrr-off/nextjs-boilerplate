import "./globals.css"
import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata: Metadata = {
  title: "Realrr | Professional Roblox Developer & Project Leader",
  description: "Portfolio of Realrr, specializing in Map Building, Modeling, Scripting, and Project Management.",
}

import Sidebar from "@/components/Sidebar"
import CustomCursor from "@/components/CustomCursor"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="bg-background text-white antialiased selection:bg-primary/30 cursor-none">
        {/* SVG Filter for Liquid Effect */}
        <svg className="hidden">
          <defs>
            <filter id="liquid-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -15" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
        <CustomCursor />
        <div className="flex min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
