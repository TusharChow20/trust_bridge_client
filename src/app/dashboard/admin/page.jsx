"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  PackageSearch,
  ShieldAlert,
  Star,
  BarChart2,
  Settings,
  LogOut,
  ChevronDown,
  User2,
  Tag,
  Truck,
  X,
  PanelLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import logo from "../../../../public/logo.png";

const navItems = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
      {
        title: "Analytics",
        url: "/dashboard/admin/analytics",
        icon: BarChart2,
      },
    ],
  },
  {
    label: "Users",
    items: [
      { title: "All Users", url: "/dashboard/admin/users", icon: Users },
      { title: "Sellers", url: "/dashboard/admin/sellers", icon: Tag },
      { title: "Buyers", url: "/dashboard/admin/buyers", icon: ShoppingBag },
    ],
  },
  {
    label: "Products",
    items: [
      {
        title: "All Products",
        url: "/dashboard/admin/products",
        icon: PackageSearch,
      },
      {
        title: "Pending Approval",
        url: "/dashboard/admin/products/pending",
        icon: ShieldAlert,
      },
      { title: "Reviews", url: "/dashboard/admin/reviews", icon: Star },
    ],
  },
  {
    label: "Orders",
    items: [
      { title: "All Orders", url: "/dashboard/admin/orders", icon: Truck },
    ],
  },
];

export default function AppSidebarAdmin() {
  const pathname = usePathname();
  const { open, toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {open ? (
              <div className="flex items-center justify-between px-2 py-1">
                <span className="font-bold text-base">TrustBridge Admin</span>
                <button
                  onClick={toggleSidebar}
                  className="hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <SidebarMenuButton>
                <Image
                  src={"/logo.png"}
                  className="rounded-xl"
                  width={400}
                  height={400}
                ></Image>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Nav Groups */}
      <SidebarContent>
        {navItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer - Admin user + settings + logout */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/admin/settings">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/api/auth/logout">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User2 className="w-4 h-4" />
              <span>Admin</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
