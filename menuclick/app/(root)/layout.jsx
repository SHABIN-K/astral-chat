import { Toaster } from "sonner";
import { Inter } from "next/font/google";

import "../globals.css";
import { AuthProvider, ColorProvider } from "@/modules/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MenuClick",
  description: "Digital Food Menus for Restaurants",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-color`}>
        <AuthProvider>
          <Toaster position="bottom-right" closeButton richColors />
          <ColorProvider>{children}</ColorProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
