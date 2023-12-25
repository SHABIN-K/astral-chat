import { ProtectedAdminLayout } from "@/modules/layouts/ProctectAdminlayout";

export const metadata = {
  title: "Dashboard| MenuClick",
  description: "Digital Food Menus for Restaurants",
};

export default function DashboardLayout({ children }) {
  return <ProtectedAdminLayout>{children}</ProtectedAdminLayout>;
}
