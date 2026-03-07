import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/auth";
import AppSidebarUser from "@/components/layout/AppSideBarUser";

export default async function LayoutSidebarUser({ children }) {
  const session = await auth();

  return (
    <SidebarProvider>
      <AppSidebarUser user={session?.user} />
      <main className="flex-1 p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
