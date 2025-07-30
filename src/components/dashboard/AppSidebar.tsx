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
import { RxDashboard } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { FaPerson } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const {pathname} = useLocation();
  const { logout } = useAuthStore();

  const menuItems = [
    { href: "/", icon: RxDashboard, label: "Resumen" },
    { href: "/reportes", icon: IoFileTrayFullOutline, label: "Reportes" },
    { href: "/trabajadores", icon: FaPerson , label: "Trabajadores" },
    { href: "/departamentos", icon: MdOutlineCategory , label: "Departamentos" }
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
                    className={  cn(
                      "transition-colors duration-200", 
                      {
                        "bg-blue-500 text-white hover:bg-blue-500 hover:text-white": pathname === item.href,
                      }
                    )}
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
            <SidebarMenuButton onClick={logout} className="cursor-pointer"> 
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