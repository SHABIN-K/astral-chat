import Header from "@/components/Header";
import { ProtectedAdminLayout } from "@/modules/layouts/ProctectAdminlayout";

export const metadata = {
  title: "Dashboard | MenuClick",
  description: "Digital Food Menus for Restaurants",
};

export default function DashboardLayout({ children }) {
  return (
    <ProtectedAdminLayout>
      <div className="flex flex-col">
        <Header />
        <main className="grow p-4 md:p-4">{children}</main>
      </div>
    </ProtectedAdminLayout>
  );
}
