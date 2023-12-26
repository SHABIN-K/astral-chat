import Header from "@/components/Header";
import { ProtectedAdminLayout } from "@/modules/layouts/ProctectAdminlayout";

export const metadata = {
  title: "Dashboard| MenuClick",
  description: "Digital Food Menus for Restaurants",
};

export default function DashboardLayout({ children }) {
  return (
    <ProtectedAdminLayout>
      <Header />
      <main className="flex-center">{children}</main>
    </ProtectedAdminLayout>
  );
}
