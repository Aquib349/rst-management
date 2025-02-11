import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

export function NavMain({
  items,
}: {
  items: { title: string; url: string; icon?: LucideIcon }[];
}) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <Link to={item.url}>
              <SidebarMenuButton
                tooltip={item.title}
                className={`hover:bg-purple-50 hover:text-purple-600 ${
                  (location.pathname === "/" &&
                    item.title?.toLowerCase() === "dashboard") ||
                  location.pathname.replace(/^\//, "") ===
                    item.title?.toLowerCase()
                    ? "text-purple-600"
                    : ""
                }`}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
