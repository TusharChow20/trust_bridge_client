import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebarAdmin from "./page";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebarAdmin />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
