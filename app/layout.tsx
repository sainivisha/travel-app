import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import PaypalProvider from "@/components/PaypalProvider";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["500", "600", "700"],
//   variable: "--font-heading",
// });
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans", // 🔥 connects to your global.css
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body className="min-h-screen font-sans">
        <PaypalProvider>{children}</PaypalProvider>
      </body>
    </html>
  );
}
