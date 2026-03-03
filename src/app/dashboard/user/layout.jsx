import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebarUser from "./page";
export default function LayoutSidebarUser({ children }) {
  return (
    <SidebarProvider>
      <AppSidebarUser />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
