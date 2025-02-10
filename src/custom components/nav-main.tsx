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
            <SidebarMenuButton
              tooltip={item.title}
              className={`hover:bg-purple-50 hover:text-purple-600 ${
                location.pathname.replace(/^\//, "") ===
                item.title?.toLowerCase()
                  ? "text-purple-600"
                  : ""
              }`}
            >
              {item.icon && <item.icon />}
              <Link to={item.url}>{item.title}</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
