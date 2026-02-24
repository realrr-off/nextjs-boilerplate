import "./globals.css"
import type { Metadata } from "next"
import AuthProvider from "@/components/auth/AuthProvider"
import UsernamePrompt from "@/components/auth/UsernamePrompt"

export const metadata: Metadata = {
  title: "Creative Developer | Personal Portfolio",
  description: "Crafting premium digital experiences and high-performance digital solutions.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <AuthProvider>
          <UsernamePrompt />
          <main className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
