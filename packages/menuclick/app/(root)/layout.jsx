import { Toaster } from "sonner";
import { Inter } from "next/font/google";

import "../globals.css";
import ColorProvider from "@/modules/providers/ColorProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MenuClick",
  description: "Digital Food Menus for Restaurants",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ColorProvider>{children} </ColorProvider>
      </body>
    </html>
  );
}
