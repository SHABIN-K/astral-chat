import Header from "@/components/Header";
import { ProtectedAdminLayout } from "@/modules/layouts/ProctectAdminlayout";

export const metadata = {
  title: "Dashboard| MenuClick",
  description: "Digital Food Menus for Restaurants",
};

export default function DashboardLayout({ children }) {
  return (
    <>
      <Header />
      <main className="flex-center grow p-5 md:p-4">{children}</main>
    </>
  );
}
