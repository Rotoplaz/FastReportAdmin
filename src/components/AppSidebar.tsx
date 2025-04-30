import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { GalleryVerticalEnd } from "lucide-react";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { LuBlocks } from "react-icons/lu";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {


  const menuItems = [
    { href: "/dashboard/resumen", icon: RxDashboard, label: "Resumen" },
    { href: "/dashboard/orders", icon: IoFileTrayFullOutline, label: "Órdenes" },
    { href: "/dashboard/products", icon: LuBlocks, label: "Productos" },
    { href: "/dashboard/categories", icon: MdOutlineCategory, label: "Categorías" },
  ];

  return (
    <Sidebar variant="inset" {...props} collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-500 text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>

              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Admin</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    className={cn("hover:bg-gray-100")}
                  >
                    <a href={item.href}>
                      <item.icon />
                      {item.label}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton> 
              <TbLogout2 />
              <span>Salir</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}