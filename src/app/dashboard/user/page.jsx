import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export default function AppSidebarUser() {
  return (
    <Sidebar>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <Button>
            <h1>Home</h1>
          </Button>
          <Button>
            <h1>ABout us</h1>
          </Button>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
          <Button>Logout</Button>
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  );
}
