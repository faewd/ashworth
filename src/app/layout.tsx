import type { Metadata } from "next"
import { Onest } from "next/font/google"
import "./globals.css"
import Navbar from "@/lib/components/Navbar"
import { ModalProvider } from "@/lib/context/modalContext"

const font = Onest({
  variable: "--font-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Ashworth's Sheet Manager",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={`${font.className} ${font.variable} antialiased bg-zinc-900 text-zinc-200`}>
          <ModalProvider>
            <Navbar />
            <div>
              {children}
            </div>
          </ModalProvider>
        </body>
      </html>
  )
}
