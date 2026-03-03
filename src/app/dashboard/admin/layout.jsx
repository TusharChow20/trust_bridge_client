import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebarAdmin from "./page";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebarAdmin />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
