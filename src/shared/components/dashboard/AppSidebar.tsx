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
} from "@/shared/components/ui/sidebar";
import { FaRegCircle } from "react-icons/fa";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { cn } from "@/shared/lib/utils";
import { useLocation } from "react-router";
import { useAuthStore } from "@/shared/store/auth/useAuthStore";
import { FaPerson } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { pathname } = useLocation();
  const { logout, user } = useAuthStore();
  const menuItems = [
    { href: "/", icon: RxDashboard, label: "Resumen" },
    { href: "/reportes", icon: IoFileTrayFullOutline, label: "Reportes" },
    { href: "/trabajadores", icon: FaPerson, label: "Trabajadores" },
    { href: "/chat-bot", icon: RiRobot2Line, label: "Chat Bot" },
  ];
  const adminRoutes = [
    { href: "/departamentos", icon: MdOutlineCategory, label: "Departamentos" }
  ];



  return (
    <Sidebar variant="sidebar" {...props} collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent hover:bg-transparent data-[state=open]:text-sidebar-accent-foreground "
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#799aab] text-sidebar-primary-foreground">
                <FaRegCircle className="size-4" />
              </div>

              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Reporte Rapido</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => (<SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    className={cn(
                      "transition-colors duration-200",
                      {
                        "bg-sidebar-primary text-white ": pathname === item.href,
                      }
                    )}
                  >
                    <a href={item.href}>
                      <item.icon />
                      {item.label}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>)
              )}
              {
                user?.role === "admin" && (adminRoutes.map(item => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      className={cn(
                        "transition-colors duration-200",
                        {
                          "bg-sidebar-primary text-white": pathname === item.href,
                        }
                      )}
                    >
                      <a href={item.href}>
                        <item.icon />
                        {item.label}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )))
              }
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