import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

export default function AppSidebarAdmin() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <Button className=" bg-transparent text-black border-1 border-gray-500 hover:bg-gray-400 ">
          <h1>Home</h1>
        </Button>
        <Button className=" bg-transparent text-black border-1 border-gray-500 hover:bg-gray-400 ">
          <h1>ABout us</h1>
        </Button>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <Button className=" bg-transparent text-black border-1 border-gray-500 hover:bg-gray-400 ">
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
