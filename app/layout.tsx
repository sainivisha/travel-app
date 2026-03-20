import Navbar from "@/components/layout/Navbar"
import "./globals.css"
import Footer from "@/components/layout/Footer"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
              <Navbar />

        
        {children}
              <Footer />
        
      </body>
    </html>
  )
}