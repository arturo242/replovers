import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./footer";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RepLovers",
  description: "Comunidad Española enfocada al Mercado Chino.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={inter.className}>
        
        <div id="app">
          {children}
        </div>
          <Footer />
          <GoogleAnalytics gaId="G-PC54G4MBSK" />
      </body>

      
    </html>
  );
}
