import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Home, Users, Settings, IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  {
    title: "Referrals",
    href: "/dashboard/admin/allrefferals",
    icon: Users,
  },
  {
    title: "Transactions",
    href: "/dashboard/admin/transactions",
    icon: IndianRupee,
  },
  {
    title: "Users",
    href: "/dashboard/admin/users",
    icon: IndianRupee,
  },
  {
    title: "Analytics",
    href: "/dashboard/admin/analytics",
    icon: Users,
  },
  { title: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const pathName = usePathname();

  const isNonDashboardRouteActive = navItems.some(
    (item) =>
      item.href !== "/dashboard" &&
      (pathName === item.href || pathName.startsWith(item.href))
  );
  return (
    <Sidebar collapsible="icon" className="">
      <SidebarHeader className="p-4">
        {open ? (
          <Link href={"/dashboard"}>
            <Image
              src="/images/logo.png"
              alt="Qua Nutrition Full Logo"
              width={120}
              height={80}
              priority // Preload for above-the-fold content
              className="object-contain" // Preserve aspect ratio
            />
          </Link>
        ) : (
          <Link href={"/dashboard"}>
            <Image
              src="/images/logo.png"
              alt="Qua Nutrition Full Logo"
              width={80}
              height={60}
              priority // Preload for above-the-fold content
              placeholder="blur" // Blur-up effect
              className="object-contain" // Preserve aspect ratio
              blurDataURL="/images/log.png"
            />
          </Link>
        )}
      </SidebarHeader>
      <SidebarContent className="w-full">
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathName === item.href || !isNonDashboardRouteActive
                  : pathName === item.href || pathName.startsWith(item.href);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`${
                      isActive
                        ? " gradient  hover:bg-amber-400 text-white hover:text-white"
                        : ""
                    } py-5 px-3 rounded-sm`}
                  >
                    <Link href={item.href} className=" font-medium">
                      <item.icon className="h-5 w-5" />
                      <span className="text-[14px]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
